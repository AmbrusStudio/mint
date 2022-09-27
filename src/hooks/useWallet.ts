import type { BaseProvider as InjectedConnectorProvider } from '@metamask/providers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BigNumber, ethers } from 'ethers'
import type { ToRefs } from 'vue'
import { getCurrentInstance, reactive, toRefs } from 'vue'
import Web3Modal from 'web3modal'

import { web3ModalOptions } from '@/configs'
import { getDefaultChainInfo } from '@/utils'

type WalletState = {
  account: string | undefined
  balance: BigNumber
  chainId: number | undefined
  network: ethers.providers.Network | undefined
  provider: InjectedConnectorProvider | WalletConnectProvider | undefined
  ethereum: ethers.providers.Web3Provider
}

const defaultProvider = ethers.getDefaultProvider() as ethers.providers.Web3Provider

const INITIAL_STATE: WalletState = {
  account: undefined,
  balance: BigNumber.from(0),
  chainId: undefined,
  network: undefined,
  provider: undefined,
  ethereum: defaultProvider
}

const walletState = reactive({ ...INITIAL_STATE })
const configuredNetwork = getDefaultChainInfo()
const web3Modal = new Web3Modal(web3ModalOptions)

export type AccountType = 'contract' | 'normal'

export type Status = 'connected' | 'disconnected' | 'connecting' | 'error'

export type UseWallet = ToRefs<
  Pick<WalletState, 'account' | 'balance' | 'chainId' | 'ethereum'>
> & {
  // connector: string | null
  // connectors: object
  // error: Error | null
  // networkName: string | null
  // status: Status
  // type: AccountType | null
  connect: () => Promise<void>
  reset: () => void
  getBlockNumber: () => Promise<number>
  isConnected: () => boolean
}

export function useWallet(): UseWallet {
  const instance = getCurrentInstance()

  const clearWalletState = () => {
    walletState.account = INITIAL_STATE.account
    walletState.balance = INITIAL_STATE.balance
    walletState.chainId = undefined
    walletState.ethereum = INITIAL_STATE.ethereum
  }

  const getAccountAssets = async () => {
    const signer = walletState.ethereum.getSigner()
    const address = await signer.getAddress()
    const balance = await signer.getBalance()
    const chainId = await signer.getChainId()
    const network = await walletState.ethereum.getNetwork()
    console.debug('getAccountAssets::address', address)
    console.debug('getAccountAssets::balance', balance)
    console.debug('getAccountAssets::chainId', chainId)
    console.debug('getAccountAssets::network', network)
    walletState.account = address
    walletState.balance = balance
    walletState.chainId = chainId
    walletState.network = network
  }

  const subscribeProvider = async (provider: InjectedConnectorProvider | WalletConnectProvider) => {
    if (!provider || !provider.on) return

    const ethereum = new ethers.providers.Web3Provider(provider, 'any')
    walletState.ethereum = ethereum

    // Event name from https://docs.metamask.io/guide/ethereum-provider.html#events
    provider.on('disconnect', () => {
      console.debug('Event disconnect')
      reset()
    })
    provider.on('accountsChanged', async (accounts: string[]) => {
      console.debug('Event accountsChanged:', accounts)
      await getAccountAssets()
    })
    provider.on('chainChanged', async (chainId: string) => {
      console.debug('Event chainChanged:', chainId)
      // Metamask strongly recommend reloading the page on chain changes
      // if (window) window.location.reload()
      // But with switch network feature, reload page will disconnect wallet
      await getAccountAssets()
    })
  }

  const switchNetwork = async (): Promise<boolean> => {
    try {
      await walletState?.provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${configuredNetwork.chainId.toString(16)}` }]
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const checkConnectedNetwork = async () => {
    if (walletState?.network?.chainId !== configuredNetwork.chainId) {
      const switched = await switchNetwork()
      if (!switched) reset()
    }
  }

  const connect = async () => {
    const provider = await web3Modal.connect()
    walletState.provider = provider

    await subscribeProvider(provider)
    await getAccountAssets()
    await checkConnectedNetwork()
  }

  const reset = () => {
    web3Modal.clearCachedProvider()
    clearWalletState()
    instance?.proxy?.$forceUpdate()
  }

  const getBlockNumber = async () => {
    return await walletState.ethereum.getBlockNumber()
  }

  const isConnected = () => {
    // MataMask
    if (typeof walletState.provider?.isConnected === 'function') {
      return !!(walletState.provider?.isConnected() && walletState.account)
    }
    //  WalletConnect
    if (walletState.provider instanceof WalletConnectProvider) {
      return !!(walletState.provider?.connected && walletState.account)
    }
    return false
  }

  return { ...toRefs(walletState), connect, reset, getBlockNumber, isConnected }
}

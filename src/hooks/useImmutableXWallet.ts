import type { LinkResults } from '@imtbl/imx-sdk'
import { EthAddress, ETHTokenType, ImmutableXClient, Link } from '@imtbl/imx-sdk'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { isRight } from 'fp-ts/lib/Either'
import { type ToRefs, reactive, toRefs, watchEffect } from 'vue'

import { LSK_IMX_WALLET_INFO } from '@/constants'
import { getViteEnv } from '@/utils'

type WalletState = {
  imxLink: Link | undefined
  imxClient: ImmutableXClient | undefined
  walletInfo: LinkResults.Setup | undefined
}

type UseImmutableXWallet = ToRefs<WalletState> & {
  connect: () => Promise<void>
  reset: () => Promise<void>
  isConnected: () => boolean
}

const INITIAL_STATE: WalletState = {
  imxLink: undefined,
  imxClient: undefined,
  walletInfo: undefined
}

const walletState = reactive({ ...INITIAL_STATE })

const linkUrl = getViteEnv('VITE_IMX_LINK_URL')
const publicApiUrl = getViteEnv('VITE_IMX_API_URL')

export function useImmutableXWallet(): UseImmutableXWallet {
  const _walletInfo = useLocalStorage<LinkResults.Setup>(LSK_IMX_WALLET_INFO, null, {
    serializer: StorageSerializers.object
  })

  async function buildIMXWallet() {
    const imxLink = new Link(linkUrl)
    const imxClient = await ImmutableXClient.build({ publicApiUrl })
    walletState.imxLink = imxLink
    walletState.imxClient = imxClient
    walletState.walletInfo = _walletInfo.value
  }

  async function connect() {
    if (!walletState.imxLink) return
    const walletInfo = await walletState.imxLink.setup({})
    _walletInfo.value = walletInfo
    walletState.walletInfo = walletInfo
  }

  async function reset() {
    _walletInfo.value = null
    walletState.walletInfo = undefined
  }

  function isConnected() {
    if (walletState.walletInfo) return true
    return false
  }

  watchEffect(buildIMXWallet)

  // @ts-expect-error class private fields
  return { ...toRefs(walletState), connect, reset, isConnected }
}

export function useImmutableXWalletInfo() {
  const { imxClient, imxLink, walletInfo } = useImmutableXWallet()

  async function fetchWalletBalances() {
    if (!imxClient.value || !walletInfo.value) return
    const userDecode = EthAddress.decode(walletInfo.value.address)
    if (!isRight(userDecode)) return
    const { result: balances } = await imxClient.value.listBalances({
      user: userDecode.right,
      symbols: [ETHTokenType.ETH]
    })
    console.debug('Fetch wallet balances', balances)
    const [ethBalance] = balances
    return { ethBalance }
  }

  async function depositETH() {
    if (!imxLink.value) return
    await imxLink.value.deposit({ type: ETHTokenType.ETH })
  }

  async function prepareWithdrawalETH(amount: string) {
    if (!imxLink.value) return
    await imxLink.value.prepareWithdrawal({ type: ETHTokenType.ETH, amount })
  }

  return { fetchWalletBalances, depositETH, prepareWithdrawalETH }
}

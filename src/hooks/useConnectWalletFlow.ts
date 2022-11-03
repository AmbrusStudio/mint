import { type Ref, ref } from 'vue'

import { useImmutableXWallet } from './useImmutableXWallet'
import { useWeb3Wallet } from './useWeb3Wallet'

type UseConnectWalletFlow = {
  readonly modalOpen: Ref<boolean>
  connectWeb3WalletAndCheckImxAccount(): Promise<void>
  connectImxWalletAndCheckImxAccount(): Promise<void>
  resetWeb3WalletAndImxWallet(): Promise<void>
}

const open = ref(false)

export function useConnectWalletFlow(): UseConnectWalletFlow {
  const { account, connect: connectWeb3Wallet, reset: resetWeb3Wallet } = useWeb3Wallet()
  const { imxClient, connect: connectImxWallet, reset: resetImxWallet } = useImmutableXWallet()

  async function checkImxUserAccount(): Promise<boolean> {
    if (!imxClient.value || !account.value) return false
    try {
      const checkImx = await imxClient.value.getUser({ user: account.value })
      if (checkImx.accounts && Array.isArray(checkImx.accounts) && checkImx.accounts.length > 0) {
        console.debug('Check IMX user account', checkImx.accounts)
        return true
      } else return false
    } catch (error) {
      console.error('Check IMX user account', error)
      return false
    }
  }

  async function connectWeb3WalletAndCheckImxAccount() {
    await connectWeb3Wallet()
    const checkImx = await checkImxUserAccount()
    if (!checkImx) open.value = true
    else open.value = false
  }

  async function connectImxWalletAndCheckImxAccount() {
    await connectImxWallet()
    const checkImx = await checkImxUserAccount()
    if (checkImx) open.value = false
    else open.value = true
  }

  async function resetWeb3WalletAndImxWallet() {
    await resetImxWallet()
    resetWeb3Wallet()
    open.value = false
  }

  return {
    get modalOpen() {
      return open
    },
    connectWeb3WalletAndCheckImxAccount,
    connectImxWalletAndCheckImxAccount,
    resetWeb3WalletAndImxWallet
  }
}

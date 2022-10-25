import type { LinkResults } from '@imtbl/imx-sdk'
import { ImmutableXClient, Link } from '@imtbl/imx-sdk'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
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

import type {
  ICoreOptions as Web3ModalOptions,
  IProviderOptions as ProviderOptions
} from 'web3modal'
import WalletConnect from '@walletconnect/web3-provider'
import { getChainInfo, getInfuraId } from '@/utils'

const network = getChainInfo().name
const infuraId = getInfuraId()

const providerOptions: ProviderOptions = {
  walletconnect: {
    package: WalletConnect,
    options: { infuraId }
  }
}

export const web3ModalOptions: Partial<Web3ModalOptions> = {
  network,
  cacheProvider: true,
  providerOptions
}
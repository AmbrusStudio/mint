import { ethers } from 'ethers'

import { getAlchemyKey, getDefaultChainInfo, getEtherscanKey, getInfuraKey } from '@/utils'

const alchemyKey = getAlchemyKey()
const infuraKey = getInfuraKey()
const etherscanKey = getEtherscanKey()
const defaultChain = getDefaultChainInfo()
const network = ethers.providers.getNetwork(defaultChain.chainId)
const ethereum = ethers.getDefaultProvider(network, {
  alchemy: alchemyKey,
  etherscan: etherscanKey,
  infura: infuraKey
})

export function useReadonlyEthereum(): ethers.providers.BaseProvider {
  return ethereum
}

import { ethers } from 'ethers'
import { type Ref, isRef, ref, watch } from 'vue'

import type { AmbrusStudioSaler, ERC721 } from '@/contracts'
import { AmbrusStudioSaler__factory, ERC721__factory } from '@/contracts'

import { useReadonlyEthereum } from './useEthereum'

export function useERC721Contract(
  ethereum: Ref<ethers.providers.Web3Provider>,
  address: Ref<string> | string
): Ref<ERC721 | undefined> {
  const _contract = ref<ERC721>()

  function getERC721Contract(address: string) {
    if (!address) return
    if (!ethereum.value || typeof ethereum.value.getSigner !== 'function') return
    const _address = ethers.utils.getAddress(address)
    const signer = ethereum.value.getSigner()
    const contract = ERC721__factory.connect(_address, signer)
    _contract.value = contract
  }

  if (isRef(address)) {
    watch([address, ethereum], ([address]) => getERC721Contract(address), { immediate: true })
  } else {
    watch([() => address, ethereum], ([address]) => getERC721Contract(address), { immediate: true })
  }

  return _contract
}

export function useReadonlyERC721Contract(address: Ref<string> | string): Ref<ERC721 | undefined> {
  const contract = ref<ERC721>()

  function getERC721Contract(address: string) {
    if (!address) return
    const ethereum = useReadonlyEthereum()
    const _address = ethers.utils.getAddress(address)
    const _contract = ERC721__factory.connect(_address, ethereum)
    contract.value = _contract
  }

  if (isRef(address)) {
    watch(address, (address) => getERC721Contract(address), { immediate: true })
  } else {
    watch(
      () => address,
      (address) => getERC721Contract(address),
      { immediate: true }
    )
  }

  return contract
}

export function useSalerContract(
  ethereum: Ref<ethers.providers.Web3Provider>,
  address: Ref<string> | string
): Ref<AmbrusStudioSaler | undefined> {
  const _contract = ref<AmbrusStudioSaler>()

  function getSalerContract(address: string) {
    if (!address) return
    if (!ethereum.value || typeof ethereum.value.getSigner !== 'function') return
    const _address = ethers.utils.getAddress(address)
    const signer = ethereum.value.getSigner()
    const contract = AmbrusStudioSaler__factory.connect(_address, signer)
    _contract.value = contract
  }

  if (isRef(address)) {
    watch([address, ethereum], ([address]) => getSalerContract(address), { immediate: true })
  } else {
    watch([() => address, ethereum], ([address]) => getSalerContract(address), { immediate: true })
  }

  return _contract
}

export function useReadonlySalerContract(
  address: Ref<string> | string
): Ref<AmbrusStudioSaler | undefined> {
  const contract = ref<AmbrusStudioSaler>()

  function getSalerContract(address: string) {
    if (!address) return
    const ethereum = useReadonlyEthereum()
    const _address = ethers.utils.getAddress(address)
    const _contract = AmbrusStudioSaler__factory.connect(_address, ethereum)
    contract.value = _contract
  }

  if (isRef(address)) {
    watch(address, (address) => getSalerContract(address), { immediate: true })
  } else {
    watch(
      () => address,
      (address) => getSalerContract(address),
      { immediate: true }
    )
  }

  return contract
}

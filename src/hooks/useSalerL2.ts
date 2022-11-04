import { ethers } from 'ethers'
import type { ComputedRef, Ref, ToRefs } from 'vue'
import { computed, isRef, reactive, toRefs, unref, watch } from 'vue'

import { type AmbrusStudioSalerL2, AmbrusStudioSalerL2__factory } from '@/contracts'
import { isFuture, isHistorical } from '@/utils'

import { useReadonlyEthereum } from './useEthereum'

type SaleType = 'permit' | 'whitelist'

type SaleData = {
  start: number
  end: number
  discount: number
  price: string
}

type AllSaleTime = Record<SaleType, SaleData>

type SalerData = AllSaleTime & {
  basePrice: string
  sold: number
  amount: number
  total: number
}

const INITIAL_SALER_DATA: SalerData = {
  basePrice: '0',
  sold: 0,
  amount: 0,
  total: 0,
  permit: { start: 0, end: 0, discount: 100, price: '0' },
  whitelist: { start: 0, end: 0, discount: 100, price: '0' }
}

async function getSalerContractData(contract: AmbrusStudioSalerL2): Promise<SalerData> {
  const _basePrice = await contract.basePrice()
  const total = await contract.count()
  const sold = await contract.soldCount()

  const permitSaleConfig = await contract.permitSaleConfig()
  const whitelistSaleConfig = await contract.whitelistSaleConfig()

  const permitSalePrice = await contract.permitSalePrice()
  const whitelistSalePrice = await contract.whitelistSalePrice()

  const basePrice = ethers.utils.formatEther(_basePrice)
  const amount = total - sold

  const permit: SaleData = {
    start: permitSaleConfig.start,
    end: permitSaleConfig.end,
    discount: permitSaleConfig.discount,
    price: ethers.utils.formatEther(permitSalePrice)
  }
  const whitelist: SaleData = {
    start: whitelistSaleConfig.start,
    end: whitelistSaleConfig.end,
    discount: whitelistSaleConfig.discount,
    price: ethers.utils.formatEther(whitelistSalePrice)
  }

  return {
    basePrice,
    sold,
    amount,
    total,
    permit,
    whitelist
  }
}

type SalerHelpers = {
  isSaleStart: (type: SaleType) => ComputedRef<boolean>
  isSaleEnd: (type: SaleType) => ComputedRef<boolean>
  getSaleData: (type: SaleType) => ComputedRef<SaleData>
}

function getSalerHelpers(salerData: SalerData): SalerHelpers {
  function isSaleStart(type: SaleType) {
    return computed(() => {
      const time = salerData[type]
      if (!time || !time?.start) return false
      return isHistorical(time.start)
    })
  }

  function isSaleEnd(type: SaleType) {
    return computed(() => {
      const time = salerData[type]
      if (!time || !time?.end) return true
      return !isFuture(time.end)
    })
  }

  function getSaleData(type: SaleType) {
    return computed(() => salerData[type])
  }

  return { isSaleStart, isSaleEnd, getSaleData }
}

type SalerDataWithHelpers = ToRefs<SalerData> & SalerHelpers

export function useSalerL2Data(
  contract: Ref<AmbrusStudioSalerL2 | undefined> | (AmbrusStudioSalerL2 | undefined)
): SalerDataWithHelpers {
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(contract: AmbrusStudioSalerL2 | undefined) {
    if (!contract) return
    const data = await getSalerContractData(contract)
    Object.assign(salerData, data)
  }

  if (isRef(contract)) {
    watch(
      contract,
      (contract) => {
        const _contract = unref(contract)
        getSalerData(_contract)
      },
      { immediate: true }
    )
  } else {
    watch(
      () => contract,
      (contract) => getSalerData(contract),
      { immediate: true }
    )
  }

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers }
}

export function useReadonlySalerL2Data(address: Ref<string> | string): SalerDataWithHelpers {
  const ethereum = useReadonlyEthereum()
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(address: string) {
    if (!address) return
    const _address = ethers.utils.getAddress(address)
    const contract = AmbrusStudioSalerL2__factory.connect(_address, ethereum)
    const data = await getSalerContractData(contract)
    Object.assign(salerData, data)
  }

  if (isRef(address)) {
    watch(address, (address) => getSalerData(address), { immediate: true })
  } else {
    watch(
      () => address,
      (address) => getSalerData(address),
      { immediate: true }
    )
  }

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers }
}

type ComputedSaleData = {
  coming: ComputedRef<boolean>
  closed: ComputedRef<boolean>
}

export function useComputedSalerL2Data(address: Ref<string> | string): ComputedSaleData {
  const { isSaleStart, isSaleEnd } = useReadonlySalerL2Data(address)

  const permitStart = isSaleStart('permit')
  const whitelistStart = isSaleStart('whitelist')

  const permitEnd = isSaleEnd('permit')
  const whitelistEnd = isSaleEnd('whitelist')

  const coming = computed(() => !permitStart.value && !whitelistStart.value)
  const closed = computed(() => permitEnd.value && whitelistEnd.value)

  return { coming, closed }
}

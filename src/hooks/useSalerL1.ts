import { ethers } from 'ethers'
import type { ComputedRef, Ref, ToRefs } from 'vue'
import { computed, isRef, reactive, toRefs, unref, watch } from 'vue'

import { type AmbrusStudioSaler, AmbrusStudioSaler__factory } from '@/contracts'
import { isFuture, isHistorical } from '@/utils'

import { useReadonlyEthereum } from './useEthereum'

type SaleType = 'permit' | 'whitelist' | 'flash' | 'public'

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
  whitelist: { start: 0, end: 0, discount: 100, price: '0' },
  flash: { start: 0, end: 0, discount: 100, price: '0' },
  public: { start: 0, end: 0, discount: 100, price: '0' }
}

async function getSalerContractData(contract: AmbrusStudioSaler): Promise<SalerData> {
  const _basePrice = await contract.basePrice()
  const total = await contract.count()
  const sold = await contract.soldCount()

  const permitSaleConfig = await contract.permitSaleConfig()
  const whitelistSaleConfig = await contract.whitelistSaleConfig()
  const flashSaleConfig = await contract.flashSaleConfig()

  const permitSalePrice = await contract.permitSalePrice()
  const whitelistSalePrice = await contract.whitelistSalePrice()
  const flashSalePrice = await contract.flashSalePrice()

  const publicSaleStart = await contract.publicSaleStart()
  const publicSaleEnd = await contract.publicSaleEnd()

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
  const flash: SaleData = {
    start: flashSaleConfig.start,
    end: flashSaleConfig.end,
    discount: flashSaleConfig.discount,
    price: ethers.utils.formatEther(flashSalePrice)
  }
  const _public: SaleData = {
    start: publicSaleStart,
    end: publicSaleEnd,
    discount: 100,
    price: basePrice
  }

  return {
    basePrice,
    sold,
    amount,
    total,
    permit,
    whitelist,
    flash,
    public: _public
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

export function useSalerL1Data(
  contract: Ref<AmbrusStudioSaler | undefined> | AmbrusStudioSaler | undefined
): SalerDataWithHelpers {
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(contract: AmbrusStudioSaler | undefined) {
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

export function useReadonlySalerL1Data(address: Ref<string> | string): SalerDataWithHelpers {
  const ethereum = useReadonlyEthereum()
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(address: string) {
    if (!address) return
    const _address = ethers.utils.getAddress(address)
    const contract = AmbrusStudioSaler__factory.connect(_address, ethereum)
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

export function useComputedSalerL1Data(address: Ref<string> | string): ComputedSaleData {
  const { isSaleStart, isSaleEnd } = useReadonlySalerL1Data(address)

  const permitStart = isSaleStart('permit')
  const whitelistStart = isSaleStart('whitelist')
  const flashStart = isSaleStart('flash')

  const permitEnd = isSaleEnd('permit')
  const whitelistEnd = isSaleEnd('whitelist')
  const flashEnd = isSaleEnd('flash')

  const coming = computed(() => !permitStart.value && !whitelistStart.value && !flashStart.value)
  const closed = computed(() => permitEnd.value && whitelistEnd.value && flashEnd.value)

  return { coming, closed }
}

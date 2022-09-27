import { ethers } from 'ethers'
import type { ComputedRef, Ref, ToRefs } from 'vue'
import { computed, isRef, reactive, toRefs, unref, watch } from 'vue'

import { type AmbrusStudioSaler, AmbrusStudioSaler__factory } from '@/contracts'
import { isFuture, isHistorical } from '@/utils'

import { useReadonlyEthereum } from './useEthereum'

type SaleType = 'permit' | 'whitelist' | 'flash' | 'public'

type SaleTime = {
  start: number
  end: number
}

type AllSaleTime = Record<SaleType, SaleTime>

type SalerData = AllSaleTime & {
  price: string
  sold: number
  amount: number
  total: number
}

const INITIAL_SALER_DATA: SalerData = {
  price: '0',
  sold: 0,
  amount: 0,
  total: 0,
  permit: { start: 0, end: 0 },
  whitelist: { start: 0, end: 0 },
  flash: { start: 0, end: 0 },
  public: { start: 0, end: 0 }
}

async function getContractData(contract: AmbrusStudioSaler): Promise<SalerData> {
  const _price = await contract.price()
  const _total = await contract.count()
  const _soldCount = await contract.soldCount()

  const price = ethers.utils.formatEther(_price)
  const sold = _soldCount.toNumber()
  const amount = _total.sub(_soldCount).toNumber()
  const total = _total.toNumber()

  const permitSaleStart = 1664281800
  const permitSaleEnd = 1664292600
  const whitelistSaleStart = 1664281800
  const whitelistSaleEnd = 1664292600
  const flashSaleStart = 1664281800
  const flashSaleEnd = 1664292600
  const publicSaleStart = 1664292600 // 19:30

  const permit: SaleTime = { start: permitSaleStart, end: permitSaleEnd }
  const whitelist: SaleTime = { start: whitelistSaleStart, end: whitelistSaleEnd }
  const flash: SaleTime = { start: flashSaleStart, end: flashSaleEnd }
  const _public: SaleTime = { start: publicSaleStart, end: 0 }

  return {
    price,
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
      if (!time || !time?.end) return false
      return !isFuture(time.end)
    })
  }

  return { isSaleStart, isSaleEnd }
}

type SalerDataWithHelpers = ToRefs<SalerData> & SalerHelpers

export function useSalerData(
  contract: Ref<AmbrusStudioSaler | undefined> | AmbrusStudioSaler | undefined
): SalerDataWithHelpers {
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(contract: AmbrusStudioSaler | undefined) {
    if (!contract) return
    const data = await getContractData(contract)
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

export function useReadonlySalerData(address: Ref<string> | string): SalerDataWithHelpers {
  const ethereum = useReadonlyEthereum()
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData(address: string) {
    console.log('useReadonlySalerData::getSalerData', address)
    if (!address) return
    const _address = ethers.utils.getAddress(address)
    const contract = AmbrusStudioSaler__factory.connect(_address, ethereum)
    const data = await getContractData(contract)
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

export function useComputedSalerData(address: string): ComputedSaleData {
  const { isSaleStart, isSaleEnd } = useReadonlySalerData(address)

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

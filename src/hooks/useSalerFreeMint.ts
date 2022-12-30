import type { ComputedRef, ToRefs } from 'vue'
import { computed, reactive, toRefs, watchEffect } from 'vue'

import { isFuture, isHistorical } from '@/utils'

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

async function getSalerFreeMintData(): Promise<SalerData> {
  const total = 9999
  const sold = 0 // TODO: backend api /saleStatus
  const basePrice = '0'
  const amount = total - sold

  const permit: SaleData = {
    start: 1673229600,
    end: 1673402400,
    discount: 0,
    price: basePrice
  }
  const whitelist: SaleData = {
    start: 1673316000,
    end: 1673402400,
    discount: 0,
    price: basePrice
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

export function useReadonlySalerFreeMintData(): SalerDataWithHelpers {
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData() {
    const data = await getSalerFreeMintData()
    Object.assign(salerData, data)
  }

  watchEffect(getSalerData)

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers }
}

type ComputedSaleData = {
  coming: ComputedRef<boolean>
  closed: ComputedRef<boolean>
}

export function useComputedSalerFreeMintData(): ComputedSaleData {
  const { isSaleStart, isSaleEnd } = useReadonlySalerFreeMintData()

  const permitStart = isSaleStart('permit')
  const whitelistStart = isSaleStart('whitelist')

  const permitEnd = isSaleEnd('permit')
  const whitelistEnd = isSaleEnd('whitelist')

  const coming = computed(() => !permitStart.value && !whitelistStart.value)
  const closed = computed(() => permitEnd.value && whitelistEnd.value)

  return { coming, closed }
}

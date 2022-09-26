import { ethers } from 'ethers'
import { type Ref, isRef, reactive, toRefs, unref, watch } from 'vue'

import { type AmbrusStudioSaler, AmbrusStudioSaler__factory } from '@/contracts'
import { isFuture, isHistorical } from '@/utils'

import { useReadonlyEthereum } from './useEthereum'

type SalerData = {
  price: string
  amount: number
  total: number
  startTime: number
  whitelistSaleDuration: number
}

const INITIAL_SALER_DATA: SalerData = {
  price: '0',
  amount: 0,
  total: 0,
  startTime: 0,
  whitelistSaleDuration: 0
}

async function getContractData(contract: AmbrusStudioSaler): Promise<SalerData> {
  const _price = await contract.price()
  const _total = await contract.count()
  const _soldCount = await contract.soldCount()
  const _startTime = await contract.saleStart()
  const _whitelistSaleDuration = await contract.whitelistSaleDuration()

  const price = ethers.utils.formatEther(_price)
  const amount = _total.sub(_soldCount).toNumber()
  const total = _total.toNumber()
  const startTime = _startTime.toNumber()
  const whitelistSaleDuration = _whitelistSaleDuration.toNumber()

  return { price, amount, total, startTime, whitelistSaleDuration }
}

type SalerHelpers = {
  isSaleStart: () => boolean
  isWhitelistSaleStart: () => boolean
  isPublicSaleStart: () => boolean
}

function getSalerHelpers(salerData: SalerData): SalerHelpers {
  const isSaleStart = (): boolean => {
    if (!(salerData.startTime > 0)) return false
    return isHistorical(salerData.startTime)
  }

  const isWhitelistSaleStart = (): boolean => {
    const ending = salerData.startTime + salerData.whitelistSaleDuration
    return isSaleStart() && isFuture(ending)
  }

  const isPublicSaleStart = (): boolean => {
    const ending = salerData.startTime + salerData.whitelistSaleDuration
    return isSaleStart() && isHistorical(ending)
  }

  return { isSaleStart, isWhitelistSaleStart, isPublicSaleStart }
}

type SalerDataRef = {
  price: Ref<string>
  amount: Ref<number>
  total: Ref<number>
  startTime: Ref<number>
  whitelistSaleDuration: Ref<number>
}

type SalerDataWithHelpers = SalerDataRef & SalerHelpers

export function useSalerData(contract: Ref<AmbrusStudioSaler | undefined>): SalerDataWithHelpers {
  const salerData = reactive<SalerData>(INITIAL_SALER_DATA)

  async function getSalerData() {
    const _contract = unref(contract) as AmbrusStudioSaler | undefined
    if (!_contract) return
    const data = await getContractData(_contract)
    Object.assign(salerData, data)
  }

  if (isRef(contract)) {
    watch(contract, getSalerData, { immediate: true })
  } else {
    getSalerData()
  }

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers }
}

export function useReadonlySalerData(address: string): SalerDataRef {
  const ethereum = useReadonlyEthereum()
  const salerData = reactive<SalerData>(INITIAL_SALER_DATA)

  async function getSalerData() {
    const contract = AmbrusStudioSaler__factory.connect(address, ethereum)
    const data = await getContractData(contract)
    Object.assign(salerData, data)
  }

  watch(() => address, getSalerData, { immediate: true })

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers }
}

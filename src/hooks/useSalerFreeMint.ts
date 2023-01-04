import type { ethers } from 'ethers'
import type { ComputedRef, Ref, ToRefs } from 'vue'
import { computed, reactive, toRefs, watchEffect } from 'vue'

import { getHiveSaleStatus, getMintHiveSignatureCode, mintHiveNft } from '@/api'
import type { MintSaleKind } from '@/types'
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
  const { soldCount, permitTimeStart, permitTimeEnd, whitelistTimeStart, whitelistTimeEnd } =
    await getHiveSaleStatus()

  const total = 9999
  const sold = soldCount
  const basePrice = '0'
  const amount = total - sold

  const permit: SaleData = {
    // start: 1673229600,
    start: permitTimeStart,
    end: permitTimeEnd,
    discount: 0,
    price: basePrice
  }
  const whitelist: SaleData = {
    // start: 1673316000,
    // end: 1673402400,
    start: whitelistTimeStart,
    end: whitelistTimeEnd,
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

type SalerDataWithHelpers = ToRefs<SalerData> &
  SalerHelpers & {
    refreshData: () => Promise<void>
  }

export function useReadonlySalerFreeMintData(): SalerDataWithHelpers {
  const salerData = reactive<SalerData>({ ...INITIAL_SALER_DATA })

  async function getSalerData() {
    const data = await getSalerFreeMintData()
    Object.assign(salerData, data)
  }

  watchEffect(getSalerData)

  const helpers = getSalerHelpers(salerData)

  return { ...toRefs(salerData), ...helpers, refreshData: getSalerData }
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

type GetProviderInfo = {
  signer: ethers.providers.JsonRpcSigner | undefined
  account: string | undefined
}

export function useSalerFreeMint(ethereum: Ref<ethers.providers.Web3Provider>) {
  async function getProviderInfo(): Promise<GetProviderInfo> {
    if (!ethereum.value) return { signer: undefined, account: undefined }
    const signer = ethereum.value.getSigner()
    const account = await signer.getAddress()
    return { signer, account }
  }

  async function getMintSignature(): Promise<string | undefined> {
    const { signer, account } = await getProviderInfo()
    if (!signer || !account) return

    const { code } = await getMintHiveSignatureCode(account)
    const signatureText = `\x19Ethereum Signed Message:\n Code Length: ${code.length}; Code: ${code}`
    const signature = await signer.signMessage(signatureText)

    return signature
  }

  async function freeSale(saleKind: MintSaleKind, hexProof: string[]) {
    const { account } = await getProviderInfo()
    const signature = await getMintSignature()
    if (!account || !signature) return

    return mintHiveNft(account, signature, saleKind, hexProof)
  }

  return { freeSale }
}

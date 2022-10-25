import { type Ref, type ToRefs, isRef, reactive, toRefs, watch } from 'vue'

import { getSignature } from '@/api'
import type { MintEditionValue, MintSaleKind } from '@/types'

type SignatureData = Record<MintSaleKind, string[]>

type MintSignature = Record<MintEditionValue, SignatureData>

const INITIAL_DATA: MintSignature = {
  gold: { permit: [], whitelist: [] },
  rangers: { permit: [], whitelist: [] }
}

const mintSignature = reactive<MintSignature>(INITIAL_DATA)

type UseMintSignature = ToRefs<MintSignature> & {
  hasMintSignature(edition: MintEditionValue): Record<MintSaleKind, boolean>
}

type AccountAddress = string | undefined

export function useMintSignature(address: Ref<AccountAddress> | AccountAddress): UseMintSignature {
  async function fetchMintSignature(address: string | undefined) {
    if (!address) return
    const goldPermit = await getSignature(address, 'permit', 'gold')
    const goldWhitelist = await getSignature(address, 'whitelist', 'gold')
    const rangersPermit = await getSignature(address, 'permit', 'rangers')
    const rangersWhitelist = await getSignature(address, 'whitelist', 'rangers')
    mintSignature.gold = { permit: goldPermit, whitelist: goldWhitelist }
    mintSignature.rangers = { permit: rangersPermit, whitelist: rangersWhitelist }
  }

  if (isRef(address)) {
    watch(address, (address) => fetchMintSignature(address), { immediate: true })
  } else {
    watch(
      () => address,
      (address) => fetchMintSignature(address),
      { immediate: true }
    )
  }

  function hasAccess(signature: string[]): boolean {
    return Array.isArray(signature) && signature.length > 0
  }

  function hasMintSignature(edition: MintEditionValue): Record<MintSaleKind, boolean> {
    const { permit, whitelist } = mintSignature[edition]
    return { permit: hasAccess(permit), whitelist: hasAccess(whitelist) }
  }

  return { ...toRefs(mintSignature), hasMintSignature }
}

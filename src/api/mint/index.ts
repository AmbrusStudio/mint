import { flashMint, mint, mintAccessModal } from '@/data'
import type { FlashMint, Mint, MintAccessModal, MintEditionValue, MintSaleKind } from '@/types'

import { mintRequest } from '../axios'

export async function getMintInfo(): Promise<Mint> {
  return Promise.resolve(mint)
}

export async function getMintAccessModalInfo(): Promise<MintAccessModal> {
  return Promise.resolve(mintAccessModal)
}

export async function getFlashMintInfo(): Promise<FlashMint> {
  return Promise.resolve(flashMint)
}

type GetSignature = {
  data: string[]
}
export async function getSignature(
  address: string,
  saleKind: MintSaleKind,
  edition: MintEditionValue
): Promise<string[]> {
  console.debug('getSignature', address, saleKind, edition)
  const { data: proof } = await mintRequest.get<GetSignature>('/nft-minting/hasRole', {
    params: { address, saleKind, edition }
  })
  return proof.data
}

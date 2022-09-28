import { flashMint, mint } from '@/data'
import type { FlashMint, Mint } from '@/types'

import { mintRequest } from '../axios'

export async function getMintInfo(): Promise<Mint> {
  return Promise.resolve(mint)
}

export async function getFlashMintInfo(): Promise<FlashMint> {
  return Promise.resolve(flashMint)
}

export async function getSignature(
  address: string,
  saleKind: 'permit' | 'whitelist',
  edition: string //'gold' | 'rangers'
): Promise<string[]> {
  console.debug('getSignature', address, saleKind, edition)
  const { data: proof } = await mintRequest.get<string[]>('/nft-minting/hasRole', {
    params: { address, saleKind, edition }
  })
  return proof
}

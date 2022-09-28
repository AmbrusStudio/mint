import { flashMint, mint } from '@/data'
import type { FlashMint, Mint } from '@/types'

// import { serveRequest } from '../axios'

export async function getMintInfo(): Promise<Mint> {
  return Promise.resolve(mint)
}

export async function getFlashMintInfo(): Promise<FlashMint> {
  return Promise.resolve(flashMint)
}

// export async function getWhitelistSignature(address: string): Promise<string[]> {
//   const { data: proof } = await serveRequest.get<string[]>(`/api/v1/proof/${address}`)
//   return proof
// }

export async function getSignature(
  address: string,
  saleKind: 'permit' | 'whitelist',
  edition: string //'gold' | 'rangers'
): Promise<string[]> {
  console.debug('getSignature', address, saleKind, edition)
  // if (!address || !saleKind || edition) return []
  if (saleKind === 'whitelist') return ['a', 'b']
  return []
}

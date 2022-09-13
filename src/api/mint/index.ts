import { mint } from '@/data'
import type { NFTItem } from '@/types'

import { serveRequest } from '../axios'

export async function getNFTItemInfo(): Promise<NFTItem> {
  return mint
}

export async function getWhitelistSignature(address: string): Promise<string[]> {
  const { data: proof } = await serveRequest.get<string[]>(`/api/v1/proof/${address}`)
  return proof
}

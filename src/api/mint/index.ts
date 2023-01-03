import { flashMint, mint, mintAccessModal } from '@/data'
import type { FlashMint, Mint, MintAccessModal, MintEditionValue, MintSaleKind } from '@/types'
import { getViteEnv } from '@/utils'

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

const mintApiPath = getViteEnv('VITE_MINT_ACCESS_BACKEND_API_PATH')
const hiveApiPath = getViteEnv('VITE_NFT_HIVE_BACKEND_API_PATH')

type GetMintSignature = { data: string[] }
export async function getMintSignature(
  address: string,
  saleKind: MintSaleKind,
  edition: MintEditionValue
): Promise<string[]> {
  console.debug('getMintSignature', address, saleKind, edition)
  const { data: proof } = await mintRequest.get<GetMintSignature>(`${mintApiPath}/hasRole`, {
    params: { address, saleKind, edition }
  })
  return proof.data
}

type GetHiveSaleStatus = { soldCount: number }
export async function getHiveSaleStatus(): Promise<GetHiveSaleStatus> {
  const { data } = await mintRequest.get<GetHiveSaleStatus>(`${hiveApiPath}/saleStatus`)
  return data
}

type GetMintSignatureCode = { code: string }
export async function getMintHiveSignatureCode(address: string): Promise<GetMintSignatureCode> {
  const { data } = await mintRequest.post<GetMintSignatureCode>(`${hiveApiPath}/mint-prepare`, {
    address
  })
  return data
}

type MintHiveNft = { tokenId: number; transferId: number }
export async function mintHiveNft(address: string, signature: string): Promise<MintHiveNft> {
  const { data } = await mintRequest.post<MintHiveNft>(`${hiveApiPath}/mint`, {
    address,
    signature
  })
  return data
}

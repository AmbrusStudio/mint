import { getViteEnv } from './env'

const marketBaseUrl = getViteEnv('VITE_IMX_MARKET_URL')

const buildIMXMarketUrl = (input: string): string => {
  return new URL(input, marketBaseUrl).toString().toLowerCase()
}

export function getIMXMarketInventoryLink(collection: string, tokenId: string | number): string {
  return buildIMXMarketUrl(`/inventory/assets/${collection}/${tokenId}`)
}

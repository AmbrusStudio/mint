import { getViteEnv } from './env'

export function getMainSiteLink(path: string): string {
  const baseUrl = getViteEnv('VITE_MAIN_SITE_URL')
  return new URL(path, baseUrl).href
}

export function getLauncherSiteLink(path: string): string {
  const baseUrl = getViteEnv('VITE_LAUNCHER_SITE_URL')
  return new URL(path, baseUrl).href
}

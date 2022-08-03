import { serveRequest } from '../axios'

export async function getBlockInfoApi<T = unknown>(key: string) {
  return await serveRequest.get<T>(`/api/v1/getBlockInfoApi?langId=14&key=${key}`)
}

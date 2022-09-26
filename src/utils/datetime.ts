import { DateTime } from 'luxon'

export function formatDatetime(seconds: number, format?: string): string {
  if (!format) format = 'ha, DDD'
  return DateTime.fromSeconds(seconds).toFormat(format)
}

export function isHistorical(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch > dateTime.toSeconds()
}

export function isBeforeEnding(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch < dateTime.toSeconds()
}

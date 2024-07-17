import { date } from 'quasar'

const remain = (timestamp: number): string => {
  const now = Math.ceil(new Date().getTime() / 1000)

  if (timestamp <= now) {
    return '00:00:00'
  }

  let remainSeconds = timestamp - now
  const remainHours = Math.floor(remainSeconds / 60 / 60)
  const remainMins = Math.floor(remainSeconds / 60) % 60
  remainSeconds = remainSeconds % 60

  return ('0' + remainHours.toString()) + ':' +
         (remainMins > 9 ? remainMins.toString() : '0' + remainMins.toString()) + ':' +
         (remainSeconds > 9 ? remainSeconds.toString() : '0' + remainSeconds.toString())
}

const formatTime = (timestamp: number, format?: string, utc?: boolean): string => {
  let offsetMinutes = 0
  if (utc !== undefined && utc) {
    offsetMinutes = new Date().getTimezoneOffset()
  }
  return date.formatDate(timestamp * 1000 + (offsetMinutes || 0) * 60 * 1000, format || 'YYYY/MM/DD HH:mm:ss')
}

const RemainZero = '00:00:00'

const SecondsPerHour = 60 * 60
const SecondsPerDay = 24 * SecondsPerHour
const SecondsPerMonth = 30 * SecondsPerDay
const SecondsPerYear = 12 * SecondsPerMonth

export {
  remain,
  formatTime,
  RemainZero,
  SecondsPerDay,
  SecondsPerHour,
  SecondsPerMonth,
  SecondsPerYear
}

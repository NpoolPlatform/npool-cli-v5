import { constant, notify, appcoin } from '..'
import { AppID } from './localapp'

const _appcoin = appcoin.useAppCoinStore()

const getPageAppCoins = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _appcoin.getAppCoins({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COINS',
        Message: 'MSG_GET_APP_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appcoin.AppCoin>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageAppCoins(offset, limit, ++pageIndex, done)
  })
}

export const getAppCoins = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageAppCoins(offset, limit, 0, done)
}

const getNPageAppCoins = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _appcoin.getNAppCoins({
    TargetAppID: AppID.value,
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COINS',
        Message: 'MSG_GET_APP_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appcoin.AppCoin>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getNPageAppCoins(offset, limit, ++pageIndex, done)
  })
}

export const getNAppCoins = (offset: number, limit: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageAppCoins(offset, limit, 0, done)
}

export const appCoins = (env?: string, payable?: boolean) => _appcoin.coins(undefined, env, payable)
export const appCoin = (coinTypeID: string) => _appcoin.coin(undefined, coinTypeID)
export const appCoinName = (coinTypeID: string, index: number) => _appcoin.displayName(undefined, coinTypeID, index)
export const appCoinUnit = (coinTypeID: string) => _appcoin.coin(undefined, coinTypeID)?.Unit

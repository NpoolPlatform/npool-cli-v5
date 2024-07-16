import { ledgerprofit, constant, notify } from '..'
import { IntervalKey } from '../utils'

const profit = ledgerprofit.useProfitStore()

const getPageGoodProfits = (key: IntervalKey, startAt: number, endAt: number, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  profit.getGoodProfits({
    StartAt: startAt,
    EndAt: endAt,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOD_PROFITS',
        Message: 'MSG_GET_GOOD_PROFITS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, key, (error: boolean, rows?: Array<ledgerprofit.GoodProfit>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageGoodProfits(key, startAt, endAt, ++pageIndex, pageEnd, done)
  })
}

export const getGoodProfits = (key: IntervalKey, startAt: number, endAt: number, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageGoodProfits(key, startAt, endAt, pageStart, pages ? pageStart + pages : pages, done)
}

const getPageCoinProfits = (key: IntervalKey, startAt: number, endAt: number, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  profit.getCoinProfits({
    StartAt: startAt,
    EndAt: endAt,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COIN_PROFITS',
        Message: 'MSG_GET_COIN_PROFITS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, key, (error: boolean, rows?: Array<ledgerprofit.CoinProfit>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoinProfits(key, startAt, endAt, ++pageIndex, pageEnd, done)
  })
}

export const getCoinProfits = (key: IntervalKey, startAt: number, endAt: number, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoinProfits(key, startAt, endAt, pageStart, pages ? pageStart + pages : pages, done)
}

export const goodProfits = (key: IntervalKey) => profit.goodProfits(undefined, undefined, key)
export const coinProfits = (key: IntervalKey) => profit.coinProfits(undefined, undefined, key)
export const intervalGoodProfits = (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined, key: IntervalKey) => profit.intervalGoodProfits(appID, userID, coinTypeID, appGoodID, key)

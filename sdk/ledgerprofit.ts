import { computed } from 'vue'
import { ledgerprofit, constant, notify } from '..'

const profit = ledgerprofit.useProfitStore()

const getPageGoodProfits = (startAt: number, endAt: number, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
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
  }, (error: boolean, rows?: Array<ledgerprofit.GoodProfit>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageGoodProfits(startAt, endAt, ++pageIndex, pageEnd, done)
  })
}

export const getGoodProfits = (startAt: number, endAt: number, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageGoodProfits(startAt, endAt, pageStart, pages ? pageStart + pages : pages, done)
}

const getPageCoinProfits = (startAt: number, endAt: number, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
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
  }, (error: boolean, rows?: Array<ledgerprofit.CoinProfit>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoinProfits(startAt, endAt, ++pageIndex, pageEnd, done)
  })
}

export const getCoinProfits = (startAt: number, endAt: number, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoinProfits(startAt, endAt, pageStart, pages ? pageStart + pages : pages, done)
}

export const goodProfits = computed(() => profit.goodProfits(undefined, undefined, undefined))
export const coinProfits = computed(() => profit.coinProfits(undefined, undefined, undefined))

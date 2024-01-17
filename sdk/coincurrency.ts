import { computed } from 'vue'
import { constant, notify, coincurrencybase, coincurrency } from '..'

const _coincurrency = coincurrency.useCurrencyStore()

const getPageCoinCurrencies = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _coincurrency.getCurrencies({
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
  }, (error: boolean, rows?: Array<coincurrencybase.CoinCurrency>, totalRows?: number) => {
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
    getPageCoinCurrencies(offset, limit, ++pageIndex, done)
  })
}

export const getCoinCurrencies = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageCoinCurrencies(offset, limit, 0, done)
}

export const coinCurrencies = computed(() => _coincurrency.currencies())
export const coinCurrency = (coinTypeID: string) => _coincurrency.currency(coinTypeID)

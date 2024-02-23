import { constant, notify, ledger, coincurrency } from '..'

const _ledger = ledger.useLedgerStore()
const _coincurrency = coincurrency.useCurrencyStore()

const getPageLedgers = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _ledger.getLedgers({
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
  }, (error: boolean, rows?: Array<ledger.Ledger>, totalRows?: number) => {
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
    getPageLedgers(offset, limit, ++pageIndex, done)
  })
}

export const getLedgers = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageLedgers(offset, limit, 0, done)
}

export const ledgers = () => _ledger.ledgers(undefined, undefined, undefined)
export const coinBalance = (coinTypeID: string) => _ledger.coinBalance(undefined, undefined, coinTypeID)

export const coinBalances2USDT = () => {
  let usdtAmount = 0
  ledgers().forEach((el) => {
    const currency = _coincurrency.currency(el.CoinTypeID)
    if (!currency) {
      return
    }
    usdtAmount += currency * Number(el.Spendable)
  })
  return usdtAmount
}

export const coinBalances2BTC = () => {
  const usdtAmount = coinBalances2USDT()
  const btcCurrency = _coincurrency.currencyByUnit('BTC')
  if (!btcCurrency) {
    return usdtAmount
  }
  return usdtAmount / btcCurrency
}

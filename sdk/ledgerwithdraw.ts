import { ledgerwithdraw, constant, notify } from '..'
import { AppID } from './localapp'

const _ledgerwithdraw = ledgerwithdraw.useWithdrawStore()

const getPageLedgerWithdrawes = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _ledgerwithdraw.getWithdraws({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_LEDGER_STATEMENTS',
        Message: 'MSG_GET_APP_LEDGER_STATEMENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<ledgerwithdraw.Withdraw>, totalRows?: number) => {
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
    getPageLedgerWithdrawes(offset, limit, ++pageIndex, done)
  })
}

export const getLedgerWithdrawes = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageLedgerWithdrawes(offset, limit, 0, done)
}

export const ledgerWithdrawes = (userID?: string, coinTypeID?: string) => _ledgerwithdraw.withdraws(AppID.value, userID, coinTypeID)
export const ledgerWithdraw = (withdrawID: string) => _ledgerwithdraw.withdraw(undefined, withdrawID)

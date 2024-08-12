import { ledgerwithdraw, constant, notify } from '..'
import { AppID } from './localapp'

const _ledgerWithdraw = ledgerwithdraw.useWithdrawStore()

const getPageLedgerWithdrawes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _ledgerWithdraw.getNAppWithdraws({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_LEDGER_WITHDRAWS',
        Message: 'MSG_GET_LEDGER_WITHDRAWS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<ledgerwithdraw.Withdraw>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageLedgerWithdrawes(++pageIndex, pageEnd, done)
  })
}

export const adminGetLedgerWithdrawes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageLedgerWithdrawes(pageStart, pages ? pageStart + pages : pages, done)
}

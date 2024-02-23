import { ledgerstatement, constant, notify } from '..'
import { AppID } from './localapp'

const _ledgerstatement = ledgerstatement.useStatementStore()

const getPageLedgerStatements = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _ledgerstatement.getStatements({
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
  }, (error: boolean, rows?: Array<ledgerstatement.Statement>, totalRows?: number) => {
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
    getPageLedgerStatements(offset, limit, ++pageIndex, done)
  })
}

export const getLedgerStatements = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageLedgerStatements(offset, limit, 0, done)
}

export const ledgerStatements = (userID?: string, coinTypeID?: string, ioType?: ledgerstatement.IOType, ioSubType?: ledgerstatement.IOSubType) => _ledgerstatement.statements(AppID.value, userID, coinTypeID, ioType, ioSubType)

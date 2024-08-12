import { computed } from 'vue'
import { constant, notify, tx } from '..'
import { AppID } from './localapp'

const _tx = tx.useTxStore()

const getPageTxs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _tx.getTxs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TXS',
        Message: 'MSG_GET_TXS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<tx.Tx>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTxs(++pageIndex, pageEnd, done)
  })
}

export const getTxs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTxs(pageStart, pages ? pageStart + pages : pages, done)
}

export const updateTx = (target: tx.Tx, done?: (error: boolean) => void) => {
  _tx.updateTx({
    ID: target.ID,
    EntID: target.EntID,
    State: target.State,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TX',
        Message: 'MSG_UPDATE_TX_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TX',
        Message: 'MSG_UPDATE_TX_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const txs = computed(() => _tx.txs(AppID.value))

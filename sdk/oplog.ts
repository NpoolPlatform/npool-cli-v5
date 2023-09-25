import { computed } from 'vue'
import { oplog, notify } from '..'

const pageSize = 10
const _oplog = oplog.useOpLogStore()
const getPageOpLogs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _oplog.getAppOpLogs({
    Offset: pageIndex * pageSize,
    Limit: pageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_LOGS',
        Message: 'MSG_GET_LOGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, logs?: Array<oplog.OpLog>, total?: number) => {
    if (error || !logs?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / pageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageOpLogs(++pageIndex, pageEnd, done)
  })
}

export const getOpLogs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageOpLogs(pageStart, pages ? pageStart + pages : pages, done)
}

export const opLogs = computed(() => _oplog.oplogs())
export const totalRows = computed(() => _oplog.Total)

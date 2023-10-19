import { computed } from 'vue'
import { chain, constant, notify } from '..'
import { AppID } from './localapp'

const _chain = chain.useChainStore()

const getPageChains = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _chain.getChains({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPONS',
        Message: 'MSG_GET_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<chain.Chain>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageChains(++pageIndex, pageEnd, done)
  })
}

export const getChains = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageChains(pageStart, pages ? pageStart + pages : pages, done)
}

import { computed } from 'vue'
import { topmostgood, constant, notify } from '..'
import { AppID } from './localapp'

const top = topmostgood.useTopMostGoodStore()

const getPageTopMostGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  top.getTopMostGoods({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOSTS',
        Message: 'MSG_GET_TOPMOSTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgood.TopMostGood>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMostGoods(++pageIndex, pageEnd, done)
  })
}

export const getTopMostGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMostGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const getNPageTopMostGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  top.getNTopMostGoods({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DEFAULT_TopMostS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgood.TopMostGood>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getNPageTopMostGoods(++pageIndex, pageEnd, done)
  })
}

export const getNTopMostGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageTopMostGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostGoods = computed(() => top.topmostgoods(AppID.value))

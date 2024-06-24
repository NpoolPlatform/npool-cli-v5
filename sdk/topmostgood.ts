import { computed } from 'vue'
import { topmostgood, constant, notify } from '..'
import { AppID } from './localapp'
import { TopMostGood } from '../good/app/good/topmost/good'

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

const adminGetPageTopMostGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  top.adminGetTopMostGoods({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DEFAULT_TOPMOSTS_FAIL',
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
    adminGetPageTopMostGoods(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMostGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMostGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostGoods = computed(() => top.topMostGoods(AppID.value))

export const createTopMostGood = (target: TopMostGood, done?: (error: boolean) => void) => {
  top.createTopMostGood({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD',
        Message: 'MSG_CREATE_TOPMOST_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD',
        Message: 'MSG_CREATE_TOPMOST_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateTopMostGood = (target: TopMostGood, done?: (error: boolean) => void) => {
  top.adminCreateTopMostGood({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD',
        Message: 'MSG_CREATE_TOPMOST_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD',
        Message: 'MSG_CREATE_TOPMOST_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateTopMostGood = (target: TopMostGood, done?: (error: boolean) => void) => {
  top.updateTopMostGood({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateTopMostGood = (target: TopMostGood, done?: (error: boolean) => void) => {
  top.adminUpdateTopMostGood({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

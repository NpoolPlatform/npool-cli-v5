import { computed } from 'vue'
import { topmost, constant, notify } from '..'
import { AppID } from './localapp'
import { TopMost } from '../good/app/good/topmost'

const topMost = topmost.useTopMostStore()

const getPageTopMosts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  topMost.getTopMosts({
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
  }, (error: boolean, rows?: Array<topmost.TopMost>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMosts(++pageIndex, pageEnd, done)
  })
}

export const getTopMosts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMosts(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageTopMosts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  topMost.adminGetTopMosts({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_TOPMOSTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmost.TopMost>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageTopMosts(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMosts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMosts(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMosts = computed(() => topMost.topmosts(AppID.value))

export const createTopMost = (target: TopMost, finish: (error: boolean) => void) => {
  topMost.createTopMost({
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST',
        Message: 'MSG_CREATE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST',
        Message: 'MSG_CREATE_TOPMOST_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const adminCreateTopMost = (target: TopMost, finish: (error: boolean) => void) => {
  topMost.adminCreateTopMost({
    ...target,
    TargetAppID: AppID.value,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST',
        Message: 'MSG_CREATE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST',
        Message: 'MSG_CREATE_TOPMOST_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateTopMost = (target: TopMost, finish: (error: boolean) => void) => {
  topMost.updateTopMost({
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST',
        Message: 'MSG_UPDATE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST',
        Message: 'MSG_UPDATE_TOPMOST_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const adminUpdateTopMost = (target: TopMost, finish: (error: boolean) => void) => {
  topMost.adminUpdateTopMost({
    ...target,
    TargetAppID: target.AppID,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST',
        Message: 'MSG_UPDATE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST',
        Message: 'MSG_UPDATE_TOPMOST_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const adminDeleteTopMost = (target: TopMost, finish: (error: boolean) => void) => {
  topMost.adminDeleteTopMost({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_TOPMOST',
        Message: 'MSG_DELETE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_TOPMOST',
        Message: 'MSG_DELETE_TOPMOST_FAIL',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

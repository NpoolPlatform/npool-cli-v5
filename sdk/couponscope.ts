import { computed } from 'vue'
import { couponscope, constant, notify } from '..'
import { AppID } from './localapp'

const scope = couponscope.useScopeStore()

const getPageScopes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  scope.getScopes({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPON_SCOPES',
        Message: 'MSG_GET_COUPON_SCOPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<couponscope.Scope>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageScopes(++pageIndex, pageEnd, done)
  })
}

export const getScopes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageScopes(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageAppScopes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  scope.getAppScopes({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_SCOPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<couponscope.Scope>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppScopes(++pageIndex, pageEnd, done)
  })
}

export const getAppScopes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppScopes(pageStart, pages ? pageStart + pages : pages, done)
}

const getNPageAppScopes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  scope.getNAppScopes({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_N_APP_SCOPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<couponscope.Scope>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getNPageAppScopes(++pageIndex, pageEnd, done)
  })
}

export const getNAppScopes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageAppScopes(pageStart, pages ? pageStart + pages : pages, done)
}

export const scopes = computed(() => scope.scopes(AppID.value))

export const createScope = (target: couponscope.Scope, finish: (error: boolean) => void) => {
  scope.createScope({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COUPON_SCOPE',
        Message: 'MSG_CREATE_COUPON_SCOPE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COUPON_SCOPE',
        Message: 'MSG_CREATE_COUPON_SCOPE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteScope = (target: couponscope.Scope, finish: (error: boolean) => void) => {
  scope.deleteScope({
    ID: target?.ID,
    TargetAppID: target?.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COUPON_SCOPE',
        Message: 'MSG_DELETE_COUPON_SCOPE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COUPON_SCOPE',
        Message: 'MSG_DELETE_COUPON_SCOPE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

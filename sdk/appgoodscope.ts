import { computed } from 'vue'
import { appgoodscope, constant, notify } from '..'
import { AppID } from './localapp'

const scope = appgoodscope.useAppGoodScopeStore()

const getPageAppGoodScopes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
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
  }, (error: boolean, rows?: Array<appgoodscope.AppGoodScope>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppGoodScopes(++pageIndex, pageEnd, done)
  })
}

export const getAppGoodScopes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppGoodScopes(pageStart, pages ? pageStart + pages : pages, done)
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
  }, (error: boolean, rows?: Array<appgoodscope.AppGoodScope>, total?: number) => {
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
export const appgoodscopes = computed(() => scope.scopes(AppID.value))

export const createAppGoodScope = (target: appgoodscope.AppGoodScope, finish: (error: boolean) => void) => {
  scope.createScope({
    ...target,
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

export const deleteAppGoodScope = (target: appgoodscope.AppGoodScope, finish: (error: boolean) => void) => {
  scope.deleteScope({
    ID: target?.ID,
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

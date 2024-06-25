import { computed } from 'vue'
import { app, constant, notify } from '..'

const _application = app.useApplicationStore()

const getPageApplications = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _application.getApps({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APPS',
        Message: 'MSG_GET_APPS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, apps?: Array<app.App>, total?: number) => {
    if (error || !apps?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageApplications(++pageIndex, pageEnd, done)
  })
}

export const getApplications = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageApplications(pageStart, pages ? pageStart + pages : pages, done)
}

export const getApplication = (done?: (error: boolean, app?: app.App) => void) => {
  _application.getApp({
    Message: {
      Error: {
        Title: 'MSG_GET_APP',
        Message: 'MSG_GET_APP_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, app?: app.App) => {
    if (error) return
    done?.(false, app)
  })
}

export const applications = computed(() => _application.apps)
export const application = (appId?: string) => _application.app(appId)

export const adminCreateApplication = (target: app.App, done?: (error: boolean, appFee?: app.App) => void) => {
  _application.createApp({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP',
        Message: 'MSG_CREATE_APP_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateApplication = (target: app.App, newEntID: string | undefined, done?: (error: boolean, appFee?: app.App) => void) => {
  _application.updateApp({
    ...target,
    NewEntID: newEntID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP',
        Message: 'MSG_UPDATE_APP_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

import { computed } from 'vue'
import { applang, constant, notify, g11nbase } from '..'
import { AppID } from './localapp'

const _appLang = applang.useAppLangStore()

const getPageAppLangs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appLang.getAppLangs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_LANGS',
        Message: 'MSG_GET_APP_LANGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<g11nbase.AppLang>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppLangs(++pageIndex, pageEnd, done)
  })
}

export const getAppLangs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppLangs(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppLangs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appLang.getNAppLangs({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_LANGS',
        Message: 'MSG_GET_APP_LANGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<g11nbase.AppLang>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppLangs(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppLangs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppLangs(pageStart, pages ? pageStart + pages : pages, done)
}

export const appLanguages = computed(() => _appLang.langs(AppID.value))

export const adminCreateAppLang = (appLang: g11nbase.AppLang, done?: (error: boolean, appLang?: g11nbase.AppLang) => void) => {
  _appLang.createAppLang({
    ...appLang,
    TargetAppID: AppID.value,
    TargetLangID: appLang.LangID,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_COUNTRY',
        Message: 'MSG_CREATE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateAppLang = (appLang: g11nbase.AppLang, done?: (error: boolean, appLang?: g11nbase.AppLang) => void) => {
  _appLang.updateAppLang({
    ...appLang,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_COUNTRY',
        Message: 'MSG_UPDATE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppLang = (appLang: g11nbase.AppLang, done?: (error: boolean, appLang?: g11nbase.AppLang) => void) => {
  _appLang.deleteAppLang({
    ...appLang,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_COUNTRY',
        Message: 'MSG_DELETE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

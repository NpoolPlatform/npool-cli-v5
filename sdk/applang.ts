import { applang, constant, g11nbase, notify } from '..'
import { AppID } from './localapp'

const _applang = applang.useAppLangStore()

const getPageLangs = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _applang.getAppLangs({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_LANGS',
        Message: 'MSG_GET_APP_LANGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<g11nbase.AppLang>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageLangs(offset, limit, ++pageIndex, done)
  })
}

export const getAppLangs = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageLangs(offset, limit, 0, done)
}

export const createAppLang = (target: g11nbase.AppLang, finish: (error: boolean) => void) => {
  _applang.createAppLang({
    TargetAppID: target.AppID,
    TargetLangID: target.LangID,
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_LANG',
        Message: 'MSG_CREATE_APP_LANG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_LANG',
        Message: 'MSG_CREATE_APP_LANG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const appLangs = () => _applang.langs(AppID.value)
export const appLang = (langID: string) => _applang.lang(undefined, langID)
export const appLangName = (langID: string) => appLang(langID)?.Lang
export const appLangLogo = (langID: string) => appLang(langID)?.Logo

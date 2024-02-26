import { message, constant, notify, g11nbase } from '..'
import { AppID } from './localapp'

const _message = message.useMessageStore()

const getPageAppMessages = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _message.getAppMessages({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_MESSAGES',
        Message: 'MSG_GET_APP_MESSAGES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<g11nbase.Message>, totalRows?: number) => {
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
    getPageAppMessages(offset, limit, ++pageIndex, done)
  })
}

export const getAppMessages = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageAppMessages(offset, limit, 0, done)
}

export const createAppMessage = (target: g11nbase.Message, finish: (error: boolean) => void) => {
  _message.createAppMessage({
    TargetAppID: target.AppID,
    TargetLangID: target.LangID,
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_APP_MESSAGE',
        Message: 'MSG_CREATE_APP_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_MESSAGE',
        Message: 'MSG_CREATE_APP_MESSAGE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const appMessages = (langID: string) => _message.messages(AppID.value, langID, undefined)

import { computed } from 'vue'
import { message, constant, notify, g11nbase } from '..'
import { AppID } from './localapp'

const _message = message.useMessageStore()

const getPageMessages = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _message.getMessages({
    Disabled: false,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_MESSAGES',
        Message: 'MSG_GET_MESSAGES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<g11nbase.Message>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageMessages(++pageIndex, pageEnd, done)
  })
}

export const getMessages = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageMessages(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageMessages = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _message.getAppMessages({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_MESSAGES',
        Message: 'MSG_GET_MESSAGES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<g11nbase.Message>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageMessages(++pageIndex, pageEnd, done)
  })
}

export const adminGetMessages = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageMessages(pageStart, pages ? pageStart + pages : pages, done)
}

export const messageuages = computed(() => _message.messages(AppID.value, undefined, undefined))

export const createMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.createMessage({
    ...message,
    TargetLangID: message.LangID,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_MESSAGE',
        Message: 'MSG_CREATE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminCreateMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.createAppMessage({
    ...message,
    TargetAppID: AppID.value,
    TargetLangID: message.LangID,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_MESSAGE',
        Message: 'MSG_CREATE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const updateMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.updateMessage({
    ...message,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_MESSAGE',
        Message: 'MSG_UPDATE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.updateAppMessage({
    ...message,
    TargetAppID: AppID.value,
    TargetLangID: message.LangID,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_MESSAGE',
        Message: 'MSG_UPDATE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const deleteMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.deleteMessage({
    ...message,
    Message: {
      Error: {
        Title: 'MSG_DELETE_MESSAGE',
        Message: 'MSG_DELETE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteMessage = (message: g11nbase.Message, done?: (error: boolean, message?: g11nbase.Message) => void) => {
  _message.deleteAppMessage({
    ...message,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_MESSAGE',
        Message: 'MSG_DELETE_MESSAGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetMessagesRequest,
  GetMessagesResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  DeleteMessageRequest,
  DeleteMessageResponse,
  UpdateMessageRequest,
  UpdateMessageResponse,
  CreateMessagesRequest,
  CreateMessagesResponse,
  GetAppMessagesRequest,
  GetAppMessagesResponse,
  CreateAppMessageRequest,
  CreateAppMessageResponse,
  DeleteAppMessageRequest,
  DeleteAppMessageResponse,
  UpdateAppMessageRequest,
  UpdateAppMessageResponse,
  CreateAppMessagesRequest,
  CreateAppMessagesResponse
} from './types'
import { doActionWithError } from '../../request'
import { useLocaleStore } from '../locale'
import { Message } from '../base'
import { formalizeAppID } from '../../appuser/app/local'

export const useMessageStore = defineStore('messages', {
  state: () => ({
    Messages: new Map<string, Map<string, Array<Message>>>()
  }),
  getters: {
    messages (): (appID: string | undefined, langID: string | undefined, langName: string | undefined) => Array<Message> {
      return (appID: string | undefined, langID: string | undefined, langName: string | undefined) => {
        appID = formalizeAppID(appID)
        return (this.Messages.get(appID)?.get(langID as string) || (langID && []) ||
              Array.from((this.Messages.get(appID)?.values() || [])).reduce((r, a) => r.concat(a), [])).filter((el) => !langName || el.Lang.includes(langName))
      }
    }
  },
  actions: {
    addMessages (appID: string | undefined, messages: Array<Message>) {
      if (!messages.length) {
        return
      }
      appID = formalizeAppID(appID)
      let _messages = this.Messages.get(appID) as Map<string, Array<Message>>
      if (!_messages) {
        _messages = new Map<string, Array<Message>>()
      }
      messages.forEach((message) => {
        let langMessages = _messages.get(message.LangID) as Array<Message>
        if (!langMessages) {
          langMessages = []
        }
        const index = langMessages.findIndex((el) => el.ID === message.ID)
        langMessages.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, message)
        _messages.set(message.LangID, langMessages)
      })
      const locale = useLocaleStore()
      if (locale.AppLang) {
        const langMessages = _messages.get(locale.AppLang.LangID) as Array<Message>
        if (langMessages) {
          locale.setLocaleMessages(langMessages)
        }
      }
      this.Messages.set(appID, _messages)
    },
    delMessage (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      const messages = this.Messages.get(appID) as Map<string, Array<Message>>
      if (!messages) {
        return
      }
      messages.forEach((langMessages, langID) => {
        const index = langMessages.findIndex((el) => el.ID === id)
        langMessages.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        messages.set(langID, langMessages)
      })
      this.Messages.set(appID, messages)
    },
    getMessages (req: GetMessagesRequest, done: (error: boolean, rows?: Array<Message>) => void) {
      doActionWithError<GetMessagesRequest, GetMessagesResponse>(
        API.GET_MESSAGES,
        req,
        req.Message,
        (resp: GetMessagesResponse): void => {
          this.addMessages(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },

    deleteMessage (req: DeleteMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<DeleteMessageRequest, DeleteMessageResponse>(
        API.DELETE_MESSAGE,
        req,
        req.Message,
        (resp: DeleteMessageResponse): void => {
          this.delMessage(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createMessage (req: CreateMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<CreateMessageRequest, CreateMessageResponse>(
        API.CREATE_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: CreateMessageResponse): void => {
          this.addMessages(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createMessages (req: CreateMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<CreateMessagesRequest, CreateMessagesResponse>(
        API.CREATE_MESSAGES,
        req,
        req.Message,
        (resp: CreateMessagesResponse): void => {
          this.addMessages(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Message>)
        }
      )
    },
    updateMessage (req: UpdateMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<UpdateMessageRequest, UpdateMessageResponse>(
        API.UPDATE_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: UpdateMessageResponse): void => {
          this.addMessages(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },

    getAppMessages (req: GetAppMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<GetAppMessagesRequest, GetAppMessagesResponse>(
        API.GET_APP_MESSAGES,
        req,
        req.Message,
        (resp: GetAppMessagesResponse): void => {
          this.addMessages(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppMessage (req: DeleteAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<DeleteAppMessageRequest, DeleteAppMessageResponse>(
        API.DELETE_APP_MESSAGE,
        req,
        req.Message,
        (resp: DeleteAppMessageResponse): void => {
          this.delMessage(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createAppMessage (req: CreateAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<CreateAppMessageRequest, CreateAppMessageResponse>(
        API.CREATE_APP_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: CreateAppMessageResponse): void => {
          this.addMessages(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createAppMessages (req: CreateAppMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<CreateAppMessagesRequest, CreateAppMessagesResponse>(
        API.CREATE_APP_MESSAGES,
        req,
        req.Message,
        (resp: CreateAppMessagesResponse): void => {
          this.addMessages(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Message>)
        }
      )
    },
    updateAppMessage (req: UpdateAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<UpdateAppMessageRequest, UpdateAppMessageResponse>(
        API.UPDATE_APP_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: UpdateAppMessageResponse): void => {
          this.addMessages(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

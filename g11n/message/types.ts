import { NotifyRequest, BaseRequest } from '../../request'
import { Message } from '../base'

export interface GetMessagesRequest extends BaseRequest {
  Disabled: boolean
  Offset: number
  Limit: number
}

export interface GetMessagesResponse {
  Infos: Message[]
  Total: number
}

export interface CreateMessageRequest extends NotifyRequest {
  TargetLangID: string
  MessageID: string
  Message: string
  GetIndex: number
}

export interface CreateMessageResponse {
  Info: Message
}

export interface CreateMessagesRequest extends BaseRequest {
  Infos: Message[]
}

export interface CreateMessagesResponse {
  Infos: Message[]
}

export interface DeleteMessageRequest extends BaseRequest {
  ID: number
}

export interface DeleteMessageResponse {
  Info: Message
}

export interface UpdateMessageRequest extends NotifyRequest {
  ID: number
  MessageID: string
  Message: string
  GetIndex: number
  Disabled: boolean
}

export interface UpdateMessageResponse {
  Info: Message
}

export interface MessageReq {
  EntID: string
  AppID: string
  LangID: string
  MessageID: string
  Message: string
  GetIndex: number
  Disabled: boolean
}

export interface CreateAppMessageRequest extends NotifyRequest {
  TargetAppID: string
  TargetLangID: string
  MessageID: string
  Message: string
  GetIndex: number
}

export interface CreateAppMessageResponse {
  Info: Message
}

export interface CreateAppMessagesRequest extends BaseRequest {
  TargetAppID: string
  TargetLangID: string
  Infos: MessageReq[]
}

export interface CreateAppMessagesResponse {
  TargetAppID: string
  TargetLangID: string
  Infos: Message[]
}

export interface DeleteAppMessageRequest extends BaseRequest {
  ID: number
  TargetAppID: string
}

export interface DeleteAppMessageResponse {
  Info: Message
}

export interface GetAppMessagesRequest extends BaseRequest {
  TargetAppID?: string
  Disabled?: boolean
  Offset: number
  Limit: number
}

export interface GetAppMessagesResponse {
  Infos: Message[]
  Total: number
}

export interface UpdateAppMessageRequest extends NotifyRequest {
  TargetAppID: string
  TargetLangID: string
  ID: number
  MessageID: string
  Message: string
  GetIndex: number
  Disabled: boolean
}

export interface UpdateAppMessageResponse {
  Info: Message
}

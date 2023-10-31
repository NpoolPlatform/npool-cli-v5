import { BaseRequest } from '../../../request'
import { EventType } from '../../../base'

export interface Template {
  ID: number
  EntID: string
  AppID: string
  LangID: string
  UsedFor: EventType
  Sender: string
  ReplyTos: string[]
  CCTos: string[]
  Subject: string
  Body: string
  DefaultToUsername: string
}

export interface CreateAppEmailTemplateRequest extends BaseRequest {
  TargetAppID: string
  TargetLangID: string
  UsedFor: EventType
  Sender: string
  ReplyTos: string[]
  CCTos: string[]
  Subject: string
  Body: string
  DefaultToUsername: string
}

export interface CreateAppEmailTemplateResponse {
  Info: Template
}

export interface GetAppEmailTemplatesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppEmailTemplatesResponse {
  Infos: Template[]
  Total: number
}

export interface UpdateAppEmailTemplateRequest extends BaseRequest {
  TargetAppID: string
  TargetLangID: string
  ID: number
  Sender: string
  ReplyTos: string[]
  CCTos: string[]
  Subject: string
  Body: string
  DefaultToUsername: string
}

export interface UpdateAppEmailTemplateResponse {
  Info: Template
}

export interface CreateEmailTemplateRequest extends BaseRequest {
  TargetLangID: string
  UsedFor: EventType
  Sender: string
  ReplyTos: string[]
  CCTos: string[]
  Subject: string
  Body: string
  DefaultToUsername: string
}

export interface CreateEmailTemplateResponse {
  Info: Template
}

export interface GetEmailTemplateRequest extends BaseRequest {
  EntID: string
}

export interface GetEmailTemplateResponse {
  Info: Template
}

export interface GetEmailTemplatesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetEmailTemplatesResponse {
  Infos: Template[]
  Total: number
}

export interface UpdateEmailTemplateRequest extends BaseRequest {
  ID: number
  Sender: string
  ReplyTos: string[]
  CCTos: string[]
  Subject: string
  Body: string
  DefaultToUsername: string
  TargetLangID: string
}

export interface UpdateEmailTemplateResponse {
  Info: Template
}

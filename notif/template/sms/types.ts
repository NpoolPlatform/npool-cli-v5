import { BaseRequest, NotifyRequest } from '../../../request'
import { EventType } from '../../../base'

export interface Template {
  ID: number
  EntID: string
  AppID: string
  LangID: string
  UsedFor: EventType
  Subject: string
  Message: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateSMSTemplateRequest extends NotifyRequest {
  TargetLangID: string
  UsedFor: EventType
  Subject: string
  Message: string
}

export interface CreateSMSTemplateResponse {
  Info: Template
}

export interface GetSMSTemplateRequest {
  ID: number
}

export interface GetSMSTemplateResponse {
  Info: Template
}

export interface GetSMSTemplatesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetSMSTemplatesResponse {
  Infos: Template[]
  Total: number
}

export interface UpdateSMSTemplateRequest extends NotifyRequest {
  ID: number
  TargetLangID: string
  Subject: string
  Message: string
}

export interface UpdateSMSTemplateResponse {
  Info: Template
}

export interface CreateAppSMSTemplateRequest extends NotifyRequest {
  TargetAppID: string
  TargetLangID: string
  UsedFor: EventType
  Subject: string
  Message: string
}

export interface CreateAppSMSTemplateResponse {
  Info: Template
}

export interface GetAppSMSTemplatesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppSMSTemplatesResponse {
  Infos: Template[]
  Total: number
}

export interface UpdateAppSMSTemplateRequest extends NotifyRequest {
  TargetAppID: string
  TargetLangID: string
  ID: number
  AppID: string
  LangID: string
  UsedFor: EventType
  Subject: string
  Message: string
}

export interface UpdateAppSMSTemplateResponse {
  Info: Template
}

export interface DeleteAppSMSTemplatesRequest extends BaseRequest {
  TargetAppID: string
  ID: number
}

export interface DeleteAppSMSTemplateResponse {
  Info: Template
}

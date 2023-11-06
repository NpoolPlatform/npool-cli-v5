import { BaseRequest } from '../../../request'
import { EventType } from '../../../base'

export interface Template {
  ID: number
  EntID: string
  AppID: string
  LangID: string
  UsedFor: EventType
  Title: string
  Content: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateFrontendTemplateRequest extends BaseRequest {
  TargetLangID: string
  UsedFor: EventType
  Title: string
  Content: string
}

export interface CreateFrontendTemplateResponse {
  Info: Template
}

export interface GetFrontendTemplateRequest extends BaseRequest {
  EntID: string
}

export interface GetFrontendTemplateResponse {
  Info: Template
}

export interface GetFrontendTemplatesRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetFrontendTemplatesResponse {
  Infos: Template[]
  /** @format int64 */
  Total: number
}

export interface UpdateFrontendTemplateRequest extends BaseRequest {
  ID: number
  Title: string
  Content: string
  TargetLangID: string
  UsedFor: EventType
}

export interface DeleteFrontendTemplateResponse {
  Info: Template
}

export interface DeleteFrontendTemplateRequest extends BaseRequest {
  ID: number
  UsedFor: EventType
}

export interface UpdateFrontendTemplateResponse {
  Info: Template
}

export interface CreateAppFrontendTemplateRequest extends BaseRequest {
  TargetAppID: string
  TargetLangID: string
  UsedFor: EventType
  Title: string
  Content: string
}

export interface CreateAppFrontendTemplateResponse {
  Info: Template
}

export interface GetAppFrontendTemplatesRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppFrontendTemplatesResponse {
  Infos: Template[]
  /** @format int64 */
  Total: number
}

export interface UpdateAppFrontendTemplateRequest extends BaseRequest {
  ID: number
  TargetAppID: string
  TargetLangID: string
  Title: string
  Content: string
  UsedFor: EventType
}

export interface UpdateAppFrontendTemplateResponse {
  Info: Template
}

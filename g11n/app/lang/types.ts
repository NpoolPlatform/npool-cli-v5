import { BaseRequest } from '../../../request'
import { AppLang } from '../../base'

export interface UpdateAppLangRequest extends BaseRequest {
  ID: number
  Main: boolean
}

export interface UpdateAppLangResponse {
  Info: AppLang
}

export interface GetAppLangsRequest extends BaseRequest {
  LangID?: string
  Offset: number
  Limit: number
}

export interface GetAppLangsResponse {
  Infos: AppLang[]
  Total: number
}

export interface CreateAppLangRequest extends BaseRequest {
  TargetAppID: string
  TargetLangID: string
  Main: boolean
}

export interface CreateAppLangResponse {
  Info: AppLang
}

export interface DeleteAppLangRequest extends BaseRequest {
  ID: number
  TargetAppID: string
}

export interface DeleteAppLangResponse {
  Info: AppLang
}

export interface GetNAppLangsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppLangsResponse {
  Infos: AppLang[]
  Total: number
}

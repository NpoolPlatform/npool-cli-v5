import { BaseRequest } from '../../../request'
import { AppOAuthThirdParty } from '../base'

export interface CreateAppOAuthThirdPartyRequest extends BaseRequest {
  TargetAppID: string
  ThirdPartyID: string
  ClientID: string
  ClientSecret: string
  CallbackURL: string
}

export interface CreateAppOAuthThirdPartyResponse {
  Info: AppOAuthThirdParty
}

export interface UpdateAppOAuthThirdPartyRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  ThirdPartyID?: string
  ClientID?: string
  ClientSecret?: string
  CallbackURL?: string
}

export interface UpdateAppOAuthThirdPartyResponse {
  Info: AppOAuthThirdParty
}

export interface GetAppOAuthThirdPartiesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppOAuthThirdPartiesResponse {
  Infos: Array<AppOAuthThirdParty>
}

export interface GetOAuthThirdPartiesRequest extends BaseRequest {
  AppID?: string
  Offset: number
  Limit: number
}

export interface GetOAuthThirdPartiesResponse {
  Infos: Array<AppOAuthThirdParty>
}

export interface DeleteAppOAuthThirdPartyRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface DeleteAppOAuthThirdPartyResponse {
  Info: AppOAuthThirdParty
}

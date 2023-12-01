import { BaseRequest } from '../../../request'

export interface AppOAuthThirdParty {
  ID: number
  EntID: string
  AppID: string
  ThirdPartyID: string
  ClientID: string
  ClientSecret: string
  CallbackURL: string
  ClientName: string
  ClientLogoURL: string
  ClientOAuthURL: string
  ResponseTypes: string
  Scope: string
  Salt: string
  CreatedAt: number
  UpdatedAt: number
}

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

export interface DeleteAppOAuthThirdPartyRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface DeleteAppOAuthThirdPartyResponse {
  Info: AppOAuthThirdParty
}

import { BaseRequest } from '../../request'

export interface Auth {
  ID: number
  EntID: string
  AppID: string
  RoleID: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Resource: string
  Method: string
}

export interface GetAppAuthsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppAuthsResponse {
  Infos: Array<Auth>
}

export interface CreateAppAuthRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID?: string
  RoleID?: string
  Resource: string
  Method: string
}

export interface CreateAppAuthResponse {
  Info: Auth
}

export interface DeleteAppAuthRequest extends BaseRequest {
  TargetAppID: string
  ID: number
  EntID: string
}

export interface DeleteAppAuthResponse {
  Info: Auth
}

export interface GetAppAuthHistoriesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

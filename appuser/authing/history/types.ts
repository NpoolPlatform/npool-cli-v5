import { BaseRequest } from '../../../request'

export interface AuthHistory {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  AppLogo: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Resource: string
  Method: string
  Allowed: boolean
  CreatedAt: number
}

export interface GetAppAuthHistoriesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppAuthHistoriesResponse {
  Infos: Array<AuthHistory>
}

import { BaseRequest } from '../../../request'

export interface RecoveryCode {
  ID: number
  EntID: string
  AppID: string
  Code: string
  Used: boolean
  UserID: string
  EmailAddress: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetRecoveryCodesRequest extends BaseRequest {
  AppID?: string
  UserID?: string
  Offset: number
  Limit: number
}

export interface GetRecoveryCodesResponse {
  Infos: Array<RecoveryCode>
  Total: number
}

export interface GenerateRecoveryCodesRequest extends BaseRequest {
  AppID?: string
  UserID?: string
}

export interface GenerateRecoveryCodesResponse {
  Infos: Array<RecoveryCode>
}

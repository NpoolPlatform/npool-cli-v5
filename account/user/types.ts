import { BaseRequest } from '../../request'
import { Account } from './base'

export interface GetAppUserAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppUserAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface GetNAppUserAccountsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppUserAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface UpdateAppUserAccountRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TargetUserID: string
  Active: boolean
  Blocked: boolean
  Labels?: string[]
}

export interface UpdateAppUserAccountResponse {
  Info: Account
}

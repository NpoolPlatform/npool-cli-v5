import { BaseRequest } from '../../../request'
import { SignMethodType } from '../../../appuser/base'
import { Account } from '../base'
import { AccountUsedFor } from '../../base'

export interface CreateUserAccountRequest extends BaseRequest {
  /**
   * Only could be withdraw or direct benefit address
   * Deposit address will be created by platform
   * Direct benefit address will be set with order
   */
  CoinTypeID: string
  Address: string
  UsedFor: AccountUsedFor
  Memo?: string
  Labels?: string[]
  Account: string
  AccountType: SignMethodType
  VerificationCode: string
}

export interface CreateUserAccountResponse {
  Info: Account
}

export interface DeleteUserAccountRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteUserAccountResponse {
  Info: Account
}

export interface UpdateUserAccountRequest extends BaseRequest {
  ID: number
  EntID: string
  Labels: string[]
}

export interface UpdateUserAccountResponse {
  Info: Account
}

export interface GetUserAccountsRequest extends BaseRequest {
  UsedFor?: AccountUsedFor
  Offset: number
  Limit: number
}

export interface GetUserAccountsResponse {
  Infos: Account[]
  Total: number
}

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

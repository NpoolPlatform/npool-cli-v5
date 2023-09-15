import { BaseRequest } from '../../request'
import { AccountLockedBy, AccountUsedFor } from '../base'

export interface Account {
  ID: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string
  UsedFor: AccountUsedFor
  AccountID: string
  Address: string
  Backup: true
  Active: boolean
  Locked: boolean
  LockedBy: AccountLockedBy
  Blocked: boolean
  CreatedAt: number
}

export interface CreatePlatformAccountRequest extends BaseRequest {
  CoinTypeID: string
  Address: string
  UsedFor: AccountUsedFor
}

export interface CreatePlatformAccountResponse {
  Info: Account
}

export interface GetPlatformAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetPlatformAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface UpdatePlatformAccountRequest extends BaseRequest {
  ID: string
  Backup: boolean
  Active: boolean
  Blocked: boolean
  Locked: boolean
}

export interface UpdatePlatformAccountResponse {
  Info: Account
}

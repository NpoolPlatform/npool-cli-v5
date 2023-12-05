import { BaseRequest } from '../../request'
import { AccountLockedBy } from '../base'

export interface Account {
  ID: number
  EntID: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string
  AccountID: string
  Address: string
  CollectingTID: string
  Active: boolean
  Locked: boolean
  LockedBy: AccountLockedBy
  Blocked: boolean
  CreatedAt: number
  AvailableAt: number
  UpdatedAt: number
}

export interface GetPaymentAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetPaymentAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface UpdatePaymentAccountRequest extends BaseRequest {
  ID: number
  EntID: string
  Active: boolean
  Blocked: boolean
  Locked: boolean
}

export interface UpdatePaymentAccountResponse {
  Info: Account
}

import { BaseRequest } from '../../request'
import { AccountLockedBy } from '../base'

export interface Account {
  ID: number
  EntID: string
  GoodID: string
  GoodName: string
  GoodUnit: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string
  AccountID: string
  Backup: true
  Address: string
  Active: boolean
  Locked: boolean
  LockedBy: AccountLockedBy
  Blocked: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateGoodBenefitAccountRequest extends BaseRequest {
  GoodID: string
}

export interface CreateGoodBenefitAccountResponse {
  Info: Account
}

export interface GetGoodBenefitAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetGoodBenefitAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface UpdateGoodBenefitAccountRequest extends BaseRequest {
  ID: number
  EntID: string
  Backup: boolean
  Active: boolean
  Blocked: boolean
  Locked: boolean
}

export interface UpdateGoodBenefitAccountResponse {
  Info: Account
}

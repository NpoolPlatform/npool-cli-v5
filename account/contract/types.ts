import { BaseRequest } from '../../request'
import { AccountLockedBy, ContractType } from '../base'

export interface Account {
  ID: number
  EntID: string
  GoodID: string
  DelegatedStakingID: string
  GoodName: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string
  ContractType: ContractType
  AccountID: string
  Address: string
  Backup: true
  Active: boolean
  Locked: boolean
  LockedBy: AccountLockedBy
  Blocked: boolean
  CreatedAt: number
}

export interface AdminGetContractAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface AdminGetContractAccountsResponse {
  Infos: Account[]
  Total: number
}

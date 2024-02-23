import { BaseRequest } from '../../request'
import { IOSubType, IOType } from './const'

export interface Statement {
  ID: number
  EntID: string
  AppID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  IOType: IOType
  IOSubType: IOSubType
  CreatedAt: number
  Amount: string
  IOExtra: string
  UserID: string
  PhoneNO: string
  EmailAddress: string
}

export interface MiningReward {
  ID: number
  EntID: string
  AppID: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  IOType: IOType
  IOSubType: IOSubType
  RewardAmount: string
  RewardAmountPerUnit: string
  Extra: string
  AppGoodID: string
  OrderID: string
  UserID: string
  Units: string
  CreatedAt: number
}

export interface UserTransferExtra {
  FromUserID?: string
  FromAccountName?: string
  TargetUserID?: string
  TargetAccountName?: string
}

export interface WithdrawExtra {
  AccountID?: string
  Address?: string
}

export interface GetStatementsRequest extends BaseRequest {
  StartAt?: number
  EndAt?: number
  Offset: number
  Limit: number
}
export interface GetStatementsResponse {
  Infos: Statement[]
  Total: number
}

export interface GetAppStatementsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppStatementsResponse {
  Infos: Array<Statement>
  Total: number
}

export interface GetMiningRewardsRequest extends BaseRequest {
  StartAt?: number
  EndAt?: number
  Offset: number
  Limit: number
}
export interface GetMiningRewardsResponse {
  Infos: MiningReward[]
  Total: number
}

export interface CreateAppUserDepositRequest extends BaseRequest {
  CoinTypeID: string
  Amount: string
  TargetAppID: string
  TargetUserID: string
}

export interface CreateAppUserDepositResponse {
  Info: Statement
}

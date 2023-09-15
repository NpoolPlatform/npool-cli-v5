import { BaseRequest } from '../../request'
import { IOSubType, IOType } from './const'

export interface Statement {
  ID: string
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
  ID: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  IOType: IOType
  IOSubType: IOSubType
  RewardAmount: string
  RewardAmountPerUnit: string
  Extra: string
  GoodID: string
  OrderID: string
  UserID: string
  Units: string
  CreatedAt: number
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

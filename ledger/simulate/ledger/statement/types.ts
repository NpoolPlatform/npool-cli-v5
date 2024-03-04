import { BaseRequest } from '../../../../request'
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
  Cashable: boolean
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

export interface GetSimulateStatementsRequest extends BaseRequest {
  StartAt?: number
  EndAt?: number
  Offset: number
  Limit: number
}
export interface GetSimulateStatementsResponse {
  Infos: Statement[]
  Total: number
}

export interface GetAppSimulateStatementsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppSimulateStatementsResponse {
  Infos: Array<Statement>
  Total: number
}

export interface GetSimulateMiningRewardsRequest extends BaseRequest {
  StartAt?: number
  EndAt?: number
  Offset: number
  Limit: number
}
export interface GetSimulateMiningRewardsResponse {
  Infos: MiningReward[]
  Total: number
}

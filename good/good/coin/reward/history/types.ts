import { BaseRequest } from '../../../../../request'

export interface RewardHistory {
  ID: number
  EntID: string
  GoodID: string
  GoodName: string
  CoinTypeID: string
  RewardDate: string
  TID: string
  Amount: string
  UnitAmount: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetHistoriesRequest extends BaseRequest {
  GoodID?: string
  CoinTypeID?: string
  StartAt?: string
  EndAt?: string
  Offset: number
  Limit: number
}

export interface GetHistoriesResponse {
  Infos: RewardHistory[]
  Total: number
}

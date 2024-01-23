import { GoodDurationType } from 'src/npoolstore/good/base'
import { BaseRequest } from '../../request'

export interface GoodProfit {
  AppID: string
  UserID: string
  AppGoodID: string
  GoodName: string
  GoodUnit: string
  MinOrderDuration: number
  MaxOrderDuration: number
  DurationType: GoodDurationType
  Units: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Incoming: string
}

export interface Profit {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Incoming: string
}

export interface GetGoodProfitsRequest extends BaseRequest {
  Offset: number
  Limit: number
  StartAt: number
  EndAt: number
}

export interface GetGoodProfitsResponse {
  Infos: Array<GoodProfit>
  Total: number
}

export interface GetIntervalGoodProfitsRequest extends BaseRequest {
  StartAt: number
  EndAt: number
  Offset: number
  Limit: number
}

export interface GetIntervalGoodProfitsResponse {
  Infos: Array<GoodProfit>
  Total: number
}
export interface GetProfitsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetProfitsResponse {
  Infos: Profit[]
  Total: number
}

export interface GetIntervalProfitsRequest extends BaseRequest {
  StartAt: number
  EndAt: number
  Offset: number
  Limit: number
}

export interface GetIntervalProfitsResponse {
  Infos: Array<Profit>
  Total: number
}

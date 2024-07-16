import { GoodDurationType, GoodType } from '../../good/base'
import { BaseRequest } from '../../request'

export interface GoodProfit {
  AppID: string
  UserID: string
  AppGoodID: string
  AppGoodName: string
  GoodType: GoodType
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Units: string
  Incoming: string
  GoodUnit: string

  MinOrderDuration: number
  MaxOrderDuration: number
  DurationType: GoodDurationType
}

export interface CoinProfit {
  AppID: string
  UserID: string
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

export interface GetCoinProfitsRequest extends BaseRequest {
  Offset: number
  Limit: number
  StartAt: number
  EndAt: number
}

export interface GetCoinProfitsResponse {
  Infos: Array<CoinProfit>
  Total: number
}

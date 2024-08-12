import { BaseRequest } from '../../../request'
import { GoodType } from '../../base'

export interface GoodCoinInfo {
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinENV: string
  CoinLogo: string
  Main: boolean
  Index: number
}

export interface GoodCoin extends GoodCoinInfo {
  ID: number
  EntID: string
  GoodID: string
  GoodName: string
  GoodType: GoodType
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateGoodCoinRequest extends BaseRequest {
  GoodID: string
  CoinTypeID: string
  Main?: boolean
  Index?: number
}

export interface AdminCreateGoodCoinResponse {
  Info: GoodCoin
}

export interface AdminUpdateGoodCoinRequest extends BaseRequest {
  ID: number
  EntID: string
  Main?: boolean
  Index?: number
}

export interface AdminUpdateGoodCoinResponse {
  Info: GoodCoin
}

export interface GetGoodCoinsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetGoodCoinsResponse {
  Infos: GoodCoin[]
  Total: number
}

export interface AdminDeleteGoodCoinRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteGoodCoinResponse {
  Info: GoodCoin
}

import { BaseRequest } from '../../../request'

export interface EventCoin {
  ID: number
  EntID: string
  AppID: string
  EventID: string
  CoinConfigID: string
  CoinTypeID: string
  CoinValue: string
  CoinPerUSD: string
  CoinName: string
  DisplayNames: string
  CoinLogo: string
  CoinUnit: string
}

export interface AdminCreateEventCoinRequest extends BaseRequest {
  TargetAppID: string
  EventID: string
  CoinConfigID: string
  CoinValue: string
  CoinPerUSD?: string
}

export interface AdminCreateEventCoinResponse {
  Info: EventCoin
}

export interface AdminGetEventCoinsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetEventCoinsResponse {
  Infos: EventCoin[]
  /** @format int64 */
  Total: number
}

export interface AdminUpdateEventCoinRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  CoinValue?: string
  CoinPerUSD?: string
}

export interface AdminUpdateEventCoinResponse {
  Info: EventCoin
}

export interface AdminDeleteEventCoinRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteEventCoinResponse {
  Info: EventCoin
}

import { EventType } from '../../base'
import { BaseRequest } from '../../request'
import { Coupon } from '../coupon/types'

export interface EventCoinReq {
  CoinConfigID: string
  CoinValue: string
  CoinPreUSD: string
}

export interface EventCoin {
  ID: number
  EntID: string
  AppID: string
  CoinConfigID: string
  CoinValue: string
  CoinPreUSD: string
  EventID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string
  CoinLogo: string
  CoinUnit: string
}

export interface Event {
  ID: number
  EntID: string
  AppName: string
  EventType: EventType
  Coupons: Coupon[]
  Credits: string
  CreditsPerUSD: string
  /** @format int64 */
  MaxConsecutive: number
  GoodID: string
  GoodName: string
  /** @format int64 */
  InviterLayers: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
  AppGoodID: string
  EventCoins: Array<EventCoinReq>
}

export interface CreateEventRequest extends BaseRequest {
  EventType: EventType
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  AppGoodID?: string
  /** @format int64 */
  InviterLayers?: number
  Coins: Array<EventCoinReq>
}

export interface CreateEventResponse {
  Info: Event
}

export interface GetEventsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetEventsResponse {
  Infos: Event[]
  /** @format int64 */
  Total: number
}

export interface UpdateEventRequest extends BaseRequest {
  ID: number
  EntID: string
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  /** @format int64 */
  InviterLayers?: number
  Coins: Array<EventCoinReq>
  RemoveCouponIDs?: boolean
  RemoveCoins?: boolean
}

export interface UpdateEventResponse {
  Info: Event
}

export interface AdminGetEventsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetEventsResponse {
  Infos: Event[]
  /** @format int64 */
  Total: number
}

export interface AdminCreateEventRequest extends BaseRequest {
  TargetAppID: string
  EventType: EventType
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  AppGoodID?: string
  /** @format int64 */
  InviterLayers?: number
  Coins: Array<EventCoinReq>
}

export interface AdminCreateEventResponse {
  Info: Event
}

export interface AdminUpdateEventRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  /** @format int64 */
  InviterLayers?: number
  Coins: Array<EventCoinReq>
  RemoveCouponIDs?: boolean
  RemoveCoins?: boolean
}

export interface AdminUpdateEventResponse {
  Info: Event
}

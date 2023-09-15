import { EventType } from '../../base'
import { BaseRequest } from '../../request'
import { Coupon } from '../coupon/types'

export interface Event {
  ID: string
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
}

export interface CreateEventRequest extends BaseRequest {
  EventType: EventType
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  GoodID?: string
  /** @format int64 */
  InviterLayers?: number
}

export interface CreateEventResponse {
  Info: Event;
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
  ID: string
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  /** @format int64 */
  InviterLayers?: number
}

export interface UpdateEventResponse {
  Info: Event
}

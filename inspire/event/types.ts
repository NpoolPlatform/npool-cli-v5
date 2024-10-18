import { EventType } from '../../base'
import { BaseRequest } from '../../request'

export interface Event {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  EventType: EventType
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
  AppGoodID?: string
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
}

export interface UpdateEventResponse {
  Info: Event
}

export interface AdminCreateEventRequest extends BaseRequest {
  TargetAppID: string
  EventType: EventType
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  AppGoodID?: string
  /** @format int64 */
  InviterLayers?: number
}

export interface AdminCreateEventResponse {
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

export interface AdminUpdateEventRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  AppGoodID?: string
  /** @format int64 */
  InviterLayers?: number
}

export interface AdminUpdateEventResponse {
  Info: Event
}

export interface AdminDeleteEventRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteEventResponse {
  Info: Event
}

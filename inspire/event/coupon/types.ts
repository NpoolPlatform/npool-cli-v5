import { BaseRequest } from '../../../request'
import { CouponType } from '../../coupon/const'

export interface EventCoupon {
  ID: number
  EntID: string
  AppID: string
  EventID: string
  CouponID: string
  CouponType: CouponType
  Denomination: string
  StartAt: number
  EndAt: number
  DurationDays: number
  Name: string
}

export interface AdminCreateEventCouponRequest extends BaseRequest {
  TargetAppID: string
  EventID: string
  CouponID: string
}

export interface AdminCreateEventCouponResponse {
  Info: EventCoupon
}

export interface AdminGetEventCouponsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetEventCouponsResponse {
  Infos: EventCoupon[]
  /** @format int64 */
  Total: number
}

export interface AdminDeleteEventCouponRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteEventCouponResponse {
  Info: EventCoupon
}

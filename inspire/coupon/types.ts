import { BaseRequest, NotifyRequest } from '../../request'
import { CouponType, CouponConstraint, CouponScope } from './const'

export interface Coupon {
  ID: number
  EntID: string
  CouponType: CouponType
  AppID: string
  Denomination: string
  Circulation: string
  IssuedBy: string
  StartAt: number
  EndAt: number
  DurationDays: number
  Message: string
  Name: string
  Threshold: string
  Allocated: string
  CouponConstraint: CouponConstraint
  CouponScope: CouponScope
  Random: boolean
  CashableProbability: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateCouponRequest extends NotifyRequest {
  TargetAppID?: string
  CouponType: string
  Denomination: string
  Circulation: string
  StartAt: number
  EndAt: number
  DurationDays: number
  Message: string
  Name: string
  Threshold?: string
  Random?: boolean
  CouponConstraint?: CouponConstraint
  CouponScope?: CouponScope
  CashableProbability?: string
}

export interface CreateCouponResponse {
  Info: Coupon
}

export interface GetCouponsRequest extends BaseRequest{
  CouponType?: CouponType
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCouponsResponse {
  Infos: Coupon[]
  /** @format int64 */
  Total: number
}

export interface UpdateCouponRequest extends NotifyRequest {
  ID: number
  EntID: string
  TargetAppID?: string
  Denomination: string
  Circulation: string
  StartAt: number
  EndAt: number
  DurationDays: number
  Message: string
  Name: string
  Threshold?: string
  Random: boolean
  CouponConstraint: CouponConstraint
  CashableProbability?: string
}

export interface UpdateCouponResponse {
  Info: Coupon
}

export interface GetAppCouponsRequest extends BaseRequest {
  TargetAppID: string
  CouponType?: CouponType
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppCouponsResponse {
  Infos: Coupon[]
  /** @format int64 */
  Total: number
}

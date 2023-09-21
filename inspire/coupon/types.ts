import { BaseRequest, NotifyRequest } from '../../request'
import { CouponType, CouponConstraint } from './const'

export interface Coupon {
  ID: string
  CouponType: CouponType
  AppID: string
  Denomination: string
  Circulation: string
  IssuedBy: string
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  DurationDays: number
  Message: string
  Name: string
  UserID?: string
  GoodID?: string
  AppGoodID?: string
  Threshold?: string
  Allocated: string
  CouponConstraint: CouponConstraint
  Random: boolean
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateCouponRequest extends NotifyRequest {
  TargetAppID: string
  CouponType: string
  Denomination: string
  Circulation: string
  StartAt: number
  DurationDays: number
  Message: string
  Name: string
  TargetUserID?: string
  AppGoodID?: string
  Threshold?: string
  Random: boolean
  CouponConstraint: CouponConstraint
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
  ID: string
  TargetAppID: string
  Denomination: string
  Circulation: string
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  DurationDays: number
  Message: string
  Name: string
  TargetUserID?: string
  AppGoodID?: string
  Threshold?: string
  Random: boolean
  CouponConstraint: CouponConstraint
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

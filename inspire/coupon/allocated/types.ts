import { BaseRequest } from '../../../request'
import { CouponConstraint, CouponScope, CouponType } from '../const'

export interface Coupon {
  ID: number
  EntID: string
  CouponType: CouponType
  AppID: string
  UserID: string
  Username: string
  EmailAddress: string
  PhoneNO: string
  Denomination: string
  Circulation: string
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  DurationDays: number
  /** @format int64 */
  EndAt: number
  CouponID: string
  CouponName: string
  Message: string
  Expired: boolean
  Valid: boolean
  Used: boolean
  /** @format int64 */
  UsedAt: number
  UsedByOrderID?: string
  GoodID?: string
  Threshold?: string
  CouponConstraint: CouponConstraint
  Random: boolean
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
  Allocated: string
  CouponScope: CouponScope
}

export interface CreateCouponRequest extends BaseRequest {
  UserID?: string
  TargetUserID: string
  CouponID: string
}

export interface CreateCouponResponse {
  Info: Coupon
}

export interface GetCouponsRequest extends BaseRequest {
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

export interface GetAppCouponsRequest extends BaseRequest {
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

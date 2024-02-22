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
  StartAt: number
  EndAt: number
  CouponID: string
  CouponName: string
  Message: string
  Expired: boolean
  Used: boolean
  UsedAt: number
  UsedByOrderID: string
  Threshold: string
  CouponConstraint: CouponConstraint
  CouponScope: CouponScope
  Cashable: boolean
  CreatedAt: number
  UpdatedAt: number
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

import { BaseRequest } from 'npool-cli-v4'

export enum CouponType {
  FixAmount = 'FixAmount',
  Discount = 'Discount',
  SpecialOffer = 'SpecialOffer'
}
export const CouponTypes = Object.values(CouponType)

export enum CouponConstraint {
  Normal = 'Normal',
  PaymentThreshold = 'PaymentThreshold',
  GoodOnly = 'GoodOnly',
  GoodThreshold = 'GoodThreshold'
}
export const CouponConstraints = Object.values(CouponConstraint)

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
  Threshold?: string
  Allocated: string
  CouponConstraint: CouponConstraint
  Random: boolean
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface GetCouponsRequest extends BaseRequest{
  CouponType?: CouponType;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetCouponsResponse {
  Infos: Coupon[];
  /** @format int64 */
  Total: number;
}

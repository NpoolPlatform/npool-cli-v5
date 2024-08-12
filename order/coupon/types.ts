import { BaseRequest } from '../../request'
import { GoodType } from '../../good/base'
import { CouponType } from '../../inspire/coupon'

export interface OrderCouponInfo {
  AllocatedCouponID: string
  CouponID: string
  CouponName: string
  CouponType: CouponType
  Denomination: string
}

export interface OrderCoupon extends OrderCouponInfo {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  GoodID: string
  GoodType: GoodType
  GoodName: string
  AppGoodID: string
  AppGoodName: string
  OrderID: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetOrderCouponsRequest extends BaseRequest {
  TargetUserID?: string
  Offset: number
  Limit: number
}

export interface GetOrderCouponsResponse {
  Infos: OrderCoupon[]
  Total: number
}

export interface GetMyOrderCouponsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetMyOrderCouponsResponse {
  Infos: OrderCoupon[]
  Total: number
}

export interface AdminGetOrderCouponsRequest extends BaseRequest {
  TargetAppID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetOrderCouponsResponse {
  Infos: OrderCoupon[]
  Total: number
}

import { BaseRequest } from 'src/npoolstore/request'
import { GoodDurationType, GoodType } from '../../good/base'
import { OrderCreateMethod, OrderState, OrderType, PaymentState, PaymentType } from '../const'
import { OrderCouponInfo } from '../coupon'
import { PaymentBalance, PaymentBalanceInfo, PaymentTransferInfo } from '../payment'

export interface FeeOrder {
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
  ParentOrderID: string
  ParentAppGoodID: string
  ParentAppGoodName: string
  ParentGoodType: GoodType
  OrderType: OrderType
  PaymentType: PaymentType
  CreateMethod: OrderCreateMethod
  OrderState: OrderState
  GoodValueUSD: string
  PaymentAmountUSD: string
  DiscountAmountUSD: string
  PromotionID: string
  TopMostTitle: string
  TopMostTargetUrl: string
  DurationDisplayType: GoodDurationType
  DurationUnit: string
  DurationSeconds: number
  Durations: number
  CancelState: OrderState
  CanceledAt: number
  PaidAt: number
  UserSetPaid: boolean
  UserSetCanceled: boolean
  AdminSetCanceled: boolean
  PaymentState: PaymentState
  Coupons: OrderCouponInfo[]
  PaymentBalances: PaymentBalanceInfo[]
  PaymentTransfers: PaymentTransferInfo[]
  CreatedAt: number
  UpdatedAt: number
}

export interface FeeDuration {
  AppGoodID: string
  AppGoodName: string
  TotalDurationSeconds: number
}

export interface CreateFeeOrderRequest extends BaseRequest {
  AppGoodID: string
  ParentOrderID: string
  DurationSeconds: number
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  CouponIDs: string[]
}

export interface CreateFeeOrderResponse {
  Info: FeeOrder
}

export interface CreateUserFeeOrderRequest extends BaseRequest {
  TargetUserID: string
  AppGoodID: string
  ParentOrderID: string
  DurationSeconds: number
  OrderType: OrderType
}

export interface CreateUserFeeOrderResponse {
  Info: FeeOrder
}

export interface CreateFeeOrdersRequest extends BaseRequest {
  ParentOrderID: string
  DurationSeconds: number
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  CouponIDs: string[]
  AppGoodIDs: string[]
}

export interface CreateFeeOrdersResponse {
  Infos: FeeOrder[]
}

export interface CreateUserFeeOrdersRequest extends BaseRequest {
  TargetUserID: string
  ParentOrderID: string
  DurationSeconds: number
  AppGoodIDs: string[]
  OrderType: OrderType
}

export interface CreateUserFeeOrdersResponse {
  Infos: FeeOrder[]
}

export interface UpdateFeeOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  OrderID: string
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  Paid?: boolean
  Canceled?: boolean
}

export interface UpdateFeeOrderResponse {
  Info: FeeOrder
}

export interface UpdateUserFeeOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetUserID: string
  OrderID: string
  Canceled?: boolean
}

export interface UpdateUserFeeOrderResponse {
  Info: FeeOrder
}

export interface GetFeeOrderRequest extends BaseRequest {
  OrderID: string
}

export interface GetFeeOrderResponse {
  Info: FeeOrder
}

export interface GetFeeOrdersRequest extends BaseRequest {
  TargetUserID?: string
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetFeeOrdersResponse {
  Infos: FeeOrder[]
  Total: number
}

export interface GetMyFeeOrdersRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetMyFeeOrdersResponse {
  Infos: FeeOrder[]
  Total: number
}

export interface AdminCreateFeeOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  AppGoodID: string
  ParentOrderID: string
  DurationSeconds: number
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  CouponIDs: string[]
}

export interface AdminCreateFeeOrderResponse {
  Info: FeeOrder
}

export interface AdminCreateFeeOrdersRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  ParentOrderID: string
  DurationSeconds: number
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  CouponIDs: string[]
  AppGoodIDs: string[]
}

export interface AdminCreateFeeOrdersResponse {
  Infos: FeeOrder[]
}

export interface AdminUpdateFeeOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TargetUserID: string
  OrderID: string
  Canceled?: boolean
}

export interface AdminUpdateFeeOrderResponse {
  Info: FeeOrder
}

export interface AdminGetFeeOrdersRequest extends BaseRequest {
  TargetAppID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetFeeOrdersResponse {
  Infos: FeeOrder[]
  Total: number
}

export interface AdminDeleteFeeOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TargetUserID: string
  OrderID: string
}

export interface AdminDeleteFeeOrderResponse {
  Info: FeeOrder
}

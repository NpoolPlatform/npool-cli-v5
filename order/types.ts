import { CouponType } from '../inspire/coupon'
import { BaseRequest } from '../request'
import { InvestmentType, OrderState, OrderType, PaymentState, PaymentType } from './const'

export interface Coupon {
  CouponID: string
  CouponType: CouponType
  CouponName: string
  CouponValue: string
}

export interface Order {
  ID: string
  AppID: string
  ParentOrderID: string
  ParentOrderGoodID: string
  ParentOrderGoodName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  CoinPresale: boolean
  GoodID: string
  AppGoodID: string
  GoodName: string
  GoodUnit: string
  GoodServicePeriodDays: number
  GoodUnitPrice: string
  GoodValue: string
  Units: string
  PaymentID: string
  PaymentCoinTypeID: string
  PaymentCoinName: string
  PaymentCoinLogo: string
  PaymentCoinUnit: string
  PaymentCoinUSDCurrency: string
  PaymentLiveUSDCurrency: string
  PaymentLocalUSDCurrency: string
  PaymentAddress: string
  PaymentAmount: string
  PaymentStartAmount: string
  PaymentFinishAmount: string
  PayWithBalanceAmount: string
  TransferAmount: string
  PayWithParent: boolean
  OrderState: OrderState
  CancelState: OrderState
  OrderType: string
  PaymentType: PaymentType
  PaymentState: PaymentState
  StartAt: number
  EndAt: number
  InvestmentType: InvestmentType
  Coupons: Array<Coupon>
  LastBenefitAt: number
  UserSetCanceled: boolean
  AdminSetCanceled: boolean
  CreatedAt: number
  PaidAt: number
}

export interface CreateOrderRequest extends BaseRequest {
  AppGoodID: string
  Units: string
  PaymentCoinID: string
  ParentOrderID?: string
  PayWithBalanceAmount?: string
  CouponIDs: Array<string>
  InvestmentType: InvestmentType
}

export interface CreateOrderResponse {
  Info: Order
}

export interface OrderReq {
  AppGoodID: string
  Units: string
  Parent?: boolean
}

export interface CreateOrdersRequest extends BaseRequest {
  PaymentCoinID: string
  PayWithBalanceAmount: string
  CouponIDs: Array<string>
  InvestmentType: InvestmentType
  Orders: Array<OrderReq>
}

export interface GetOrdersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface UpdateOrderRequest extends BaseRequest {
  ID: string
  Canceled: boolean
}

export interface UpdateOrderResponse {
  Info: Order
}

export interface UpdateUserOrderRequest extends BaseRequest {
  TargetUserID: string
  ID: string
  PaymentID: string
  Canceled: boolean
}

export interface UpdateUserOrderResponse {
  Info: Order
}

export interface UpdateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  ID: string
  Canceled: boolean
}

export interface UpdateAppUserOrderResponse {
  Info: Order
}

export interface GetOrderRequest extends BaseRequest {
  ID: string
}

export interface GetOrderResponse {
  Info: Order
}

export interface GetOrdersResponse {
  Infos: Array<Order>
  Total: number
}

export interface CreateUserOrderRequest extends BaseRequest {
  TargetUserID: string
  AppGoodID: string
  Units: string
  PaymentCoinID: string
  ParentOrderID?: string
  OrderType: OrderType.Offline | OrderType.Airdrop
  InvestmentType: InvestmentType
}

export interface CreateUserOrderResponse {
  Info: Order
}

export interface CreateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  AppGoodID: string
  Units: string
  PaymentCoinID?: string
  ParentOrderID?: string
  OrderType: OrderType.Offline | OrderType.Airdrop
  InvestmentType: InvestmentType
}

export interface CreateAppUserOrderResponse {
  Info: Order
}

export interface GetAppOrdersRequest extends BaseRequest {
  Offset?: number
  Limit?: number
}

export interface GetAppOrdersResponse {
  Infos: Array<Order>
  Total: number
}

export interface GetNAppOrdersRequest extends BaseRequest {
  TargetAppID: string
  Offset?: number
  Limit?: number
}

export interface GetNAppOrdersResponse {
  Infos: Array<Order>
  Total: number
}

import { BaseRequest } from '../request'
import { OrderState, OrderType, PaymentState } from './const'

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
  PayWithParent: boolean
  FixAmountID: string
  FixAmountName: string
  FixAmountAmount: string
  DiscountID: string
  DiscountName: string
  DiscountPercent: number
  SpecialOfferID: string
  SpecialOfferAmount: string
  CreatedAt: number
  PaidAt: number
  OrderState: OrderState
  PaymentState: PaymentState
  CancelState: OrderState
  OrderType: string
  StartAt: number
  EndAt: number
  TransferAmount: string
}

export interface GetOrdersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetOrdersResponse {
  Infos: Array<Order>
  Total: number
}

export interface CreateOrderRequest extends BaseRequest {
  GoodID: string
  Units: string
  PaymentCoinID: string
  ParentOrderID?: string
  PayWithBalanceAmount?: string
  FixAmountID?: string
  DiscountID?: string
  SpecialOfferID?: string
  OrderType?: string
}

export interface CreateOrderResponse {
  Info: Order
}

export interface UpdateOrderRequest extends BaseRequest {
  ID: string
  PaymentID: string
  Canceled: boolean
}

export interface UpdateOrderResponse {
  Info: Order
}

export interface GetOrderRequest extends BaseRequest {
  ID: string
}

export interface GetOrderResponse {
  Info: Order
}

export interface GetAppOrdersRequest extends BaseRequest {
  Offset?: number;
  Limit?: number;
}

export interface GetAppOrdersResponse {
  Infos: Array<Order>;
  Total: number;
}

export interface CreateUserOrderRequest extends BaseRequest {
  TargetUserID: string;
  GoodID: string;
  Units: string;
  PaymentCoinID: string;
  ParentOrderID?: string;
  PayWithBalanceAmount?: string;
  FixAmountID?: string;
  DiscountID?: string;
  SpecialOfferID?: string;
  OrderType?: OrderType;
}

export interface CreateUserOrderResponse {
  Info: Order;
}

export interface UpdateUserOrderRequest extends BaseRequest {
  TargetUserID: string
  ID: string
  PaymentID: string
  Canceled: boolean
}

export interface UpdateUserOrderResponse {
  Info: Order;
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

export interface CreateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  GoodID: string
  Units: string
  PaymentCoinID?: string
  ParentOrderID?: string
  PayWithBalanceAmount?: string
  FixAmountID?: string
  DiscountID?: string
  SpecialOfferID?: string
  OrderType?: OrderType
}

export interface CreateAppUserOrderResponse {
  Info: Order
}

export interface UpdateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  ID: string
  PaymentID: string
  Canceled: boolean
}

export interface UpdateAppUserOrderResponse {
  Info: Order
}

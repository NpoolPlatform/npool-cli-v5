import { BaseRequest } from 'src/npoolstore/request'
import { BenefitType, GoodDurationType, GoodType, StartMode } from '../../good/base'
import { InvestmentType, OrderBenefitState, OrderCreateMethod, OrderState, OrderType, PaymentState, PaymentType } from '../const'
import { OrderCouponInfo } from '../coupon'
import { PaymentBalance, PaymentBalanceInfo, PaymentTransferInfo } from '../payment'
import { FeeDuration } from '../fee'

export interface PowerRentalOrder {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  GoodID: string
  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  AppGoodID: string
  AppGoodName: string
  OrderID: string
  OrderType: OrderType
  PaymentType: PaymentType
  CreateMethod: OrderCreateMethod
  Simulate: boolean

  OrderState: OrderState
  StartMode: StartMode
  StartAt: number
  LastBenefitAt: number
  BenefitState: OrderBenefitState

  AppGoodStockID: string
  MiningPoolName?: string
  MiningPoolLogo?: string
  MiningPoolFeeRatio?: string
  MiningPoolLeastTransferAmount?: string
  MiningPoolBenefitIntervalSeconds?: number

  QuantityUnit: string
  Units: string
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
  InvestmentType: InvestmentType

  CancelState: OrderState
  CanceledAt: number
  EndAt: number
  PaidAt: number
  UserSetPaid: boolean
  UserSetCanceled: boolean
  AdminSetCanceled: boolean
  PaymentState: PaymentState
  OutOfGasSeconds: number
  CompensateSeconds: number

  Coupons: OrderCouponInfo[]
  PaymentBalances: PaymentBalanceInfo[]
  PaymentTransfers: PaymentTransferInfo[]
  FeeDurations: FeeDuration[]

  CreatedAt: number
  UpdatedAt: number
}

export interface CreatePowerRentalOrderRequest extends BaseRequest {
  AppGoodID: string
  DurationSeconds?: number
  Units?: string
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  CouponIDs?: string[]
  FeeAppGoodIDs: string[]
  FeeDurationSeconds?: number
  FeeAutoDeduction?: boolean
  Simulate?: boolean
  AppGoodStockID: string
  InvestmentType: InvestmentType
  AppSpotUnits?: string
}

export interface CreatePowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface CreateUserPowerRentalOrderRequest extends BaseRequest {
  TargetUserID: string
  AppGoodID: string
  ParentOrderID: string
  DurationSeconds?: number
  Units?: string
  OrderType: OrderType
  AppGoodStockID: string
  InvestmentType: InvestmentType
  AppSpotUnits?: string
}

export interface CreateUserPowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface UpdatePowerRentalOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  OrderID: string
  Balances: PaymentBalance[]
  PaymentTransferCoinTypeID?: string
  Paid?: boolean
  Canceled?: boolean
}

export interface UpdatePowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface UpdateUserPowerRentalOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetUserID: string
  OrderID: string
  Canceled?: boolean
}

export interface UpdateUserPowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface GetPowerRentalOrderRequest extends BaseRequest {
  OrderID: string
}

export interface GetPowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface GetPowerRentalOrdersRequest extends BaseRequest {
  TargetUserID?: string
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetPowerRentalOrdersResponse {
  Infos: PowerRentalOrder[]
  Total: number
}

export interface GetMyPowerRentalOrdersRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetMyPowerRentalOrdersResponse {
  Infos: PowerRentalOrder[]
  Total: number
}

export interface AdminCreatePowerRentalOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  AppGoodID: string
  DurationSeconds?: number
  Units?: string
  OrderType: OrderType
  AppGoodStockID: string
  InvestmentType: InvestmentType
  AppSpotUnits?: string
}

export interface AdminCreatePowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface AdminUpdatePowerRentalOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TargetUserID: string
  OrderID: string
  Canceled?: boolean
}

export interface AdminUpdatePowerRentalOrderResponse {
  Info: PowerRentalOrder
}

export interface AdminGetPowerRentalOrdersRequest extends BaseRequest {
  TargetAppID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetPowerRentalOrdersResponse {
  Infos: PowerRentalOrder[]
  Total: number
}

export interface AdminDeletePowerRentalOrderRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TargetUserID: string
  OrderID: string
}

export interface AdminDeletePowerRentalOrderResponse {
  Info: PowerRentalOrder
}

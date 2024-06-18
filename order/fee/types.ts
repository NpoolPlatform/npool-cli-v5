import { GoodDurationType, GoodType } from '../../good/base'
import { OrderCreateMethod, OrderState, OrderType, PaymentState, PaymentType } from '../const'

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
}

import { GoodType, StartMode } from '../good/base'
import { BaseRequest } from '../request'
import { OrderBenefitState, OrderCreateMethod, OrderState, OrderType, PaymentType } from './const'

export interface Order {
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
  ParentOrderID: string
  OrderType: OrderType
  PaymentType: PaymentType
  CreateMethod: OrderCreateMethod
  Simulate: boolean
  OrderState: OrderState
  StartMode: StartMode
  StartAt: number
  LastBenefitAt: number
  BenefitState: OrderBenefitState
  CreatedAt: number
  UpdatedAt: number
}

export interface GetOrdersRequest extends BaseRequest {
  TargetUserID?: string
  Offset: number
  Limit: number
}

export interface GetOrdersResponse {
  Infos: Array<Order>
  Total: number
}

export interface GetMyOrdersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetMyOrdersResponse {
  Infos: Array<Order>
  Total: number
}

export interface AdminGetOrdersRequest extends BaseRequest {
  TargetAppID?: string
  Offset: number
  Limit: number
}

export interface AdminGetOrdersResponse {
  Infos: Array<Order>
  Total: number
}

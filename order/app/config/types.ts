import { BaseRequest } from '../../../request'
import { SimulateOrderCouponMode } from './const'

export interface AppConfig {
  ID: number
  EntID: string
  AppID: string
  EnableSimulateOrder: boolean
  SimulateOrderCouponMode: SimulateOrderCouponMode
  SimulateOrderCouponProbability: string
  SimulateOrderCashableProfitProbability: string
  MaxUnpaidOrders: number
  MaxTypedCouponsPerOrder: number
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateAppConfigRequest extends BaseRequest {
  EnableSimulateOrder?: boolean
  SimulateOrderCouponMode?: SimulateOrderCouponMode
  SimulateOrderCouponProbability?: string
  SimulateOrderCashableProfitProbability?: string
  MaxUnpaidOrders?: number
  MaxTypedCouponsPerOrder?: number
}

export interface CreateAppConfigResponse {
  Info: AppConfig
}

export interface UpdateAppConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  EnableSimulateOrder?: boolean
  SimulateOrderCouponMode?: SimulateOrderCouponMode
  SimulateOrderCouponProbability?: string
  SimulateOrderCashableProfitProbability?: string
  MaxUnpaidOrders?: number
  MaxTypedCouponsPerOrder?: number
}

export interface UpdateAppConfigResponse {
  Info: AppConfig
}

export type GetAppConfigRequest = BaseRequest

export interface GetAppConfigResponse {
  Info: AppConfig
}

export interface AdminGetAppConfigsRequest extends BaseRequest {
  TargetAppID?: string
  Offset: number
  Limit: number
}

export interface AdminGetAppConfigsResponse {
  Infos: Array<AppConfig>
  Total: number
}

export interface AdminCreateAppConfigRequest extends BaseRequest {
  TargetAppID: string
  EnableSimulateOrder?: boolean
  SimulateOrderCouponMode?: SimulateOrderCouponMode
  SimulateOrderCouponProbability?: string
  SimulateOrderCashableProfitProbability?: string
  MaxUnpaidOrders?: number
  MaxTypedCouponsPerOrder?: number
}

export interface AdminCreateAppConfigResponse {
  Info: AppConfig
}

export interface AdminUpdateAppConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  EnableSimulateOrder?: boolean
  SimulateOrderCouponMode?: SimulateOrderCouponMode
  SimulateOrderCouponProbability?: string
  SimulateOrderCashableProfitProbability?: string
  MaxUnpaidOrders?: number
  MaxTypedCouponsPerOrder?: number
}

export interface AdminUpdateAppConfigResponse {
  Info: AppConfig
}

export interface AdminDeleteAppConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteAppConfigResponse {
  Info: AppConfig
}

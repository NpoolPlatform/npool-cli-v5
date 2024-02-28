import { BaseRequest } from '../../../request'
import { SendCouponMode } from './const'

export interface SimulateConfig {
  ID: number
  EntID: string
  AppID: string
  SendCouponMode: SendCouponMode
  SendCouponProbability: string
  EnabledCashableProfit: boolean
  CashableProfitProbability: string
  Enabled: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateSimulateConfigRequest extends BaseRequest {
  AppID: string
  SendCouponMode: SendCouponMode
  SendCouponProbability: string
  EnabledCashableProfit: boolean
  CashableProfitProbability: string
  Enabled?: boolean
}

export interface CreateSimulateConfigResponse {
  Info: SimulateConfig
}

export interface UpdateSimulateConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  AppID: string
  SendCouponMode?: SendCouponMode
  SendCouponProbability?: string
  EnabledCashableProfit?: boolean
  CashableProfitProbability?: string
  Enabled?: boolean
}

export interface UpdateSimulateConfigResponse {
  Info: SimulateConfig
}

export interface GetSimulateConfigRequest extends BaseRequest {
  AppID?: string
  EntID: string
}

export interface GetSimulateConfigResponse {
  Info: SimulateConfig
}

export interface GetSimulateConfigsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetSimulateConfigsResponse {
  Infos: Array<SimulateConfig>
  Total: number
}

export interface CreateAppSimulateConfigRequest extends BaseRequest {
  TargetAppID: string
  SendCouponMode: SendCouponMode
  SendCouponProbability: string
  EnabledCashableProfit: boolean
  CashableProfitProbability: string
  Enabled?: boolean
}

export interface CreateAppSimulateConfigResponse {
  Info: SimulateConfig
}

export interface UpdateAppSimulateConfigRequest extends BaseRequest {
  TargetAppID: string
  ID: number
  EntID: string
  SendCouponMode?: SendCouponMode
  SendCouponProbability?: string
  EnabledCashableProfit?: boolean
  CashableProfitProbability?: string
  Enabled?: boolean
}

export interface UpdateAppSimulateConfigResponse {
  Info: SimulateConfig
}

export interface GetAppSimulateConfigsRequest extends BaseRequest {
  TargetAppID: string
  Offset?: number
  Limit?: number
}

export interface GetAppSimulateConfigsResponse {
  Infos: Array<SimulateConfig>
  Total: number
}

export interface DeleteAppSimulateConfigRequest extends BaseRequest {
  TargetAppID: string
  ID: number
  EntID: string
}

export interface DeleteAppSimulateConfigResponse {
  Info: SimulateConfig
}

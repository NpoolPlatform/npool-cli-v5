import { BaseRequest } from '../../../../request'
import { SettleType } from './const'

export interface AppCommissionConfig {
  ID: number
  EntID: string
  AppID: string
  SettleType: SettleType
  AmountOrPercent: string
  ThresholdAmount: string
  /** @format int64 */
  Invites: number
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppCommissionConfigRequest extends BaseRequest {
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt: number
  Invites: number
  SettleType: SettleType
}

export interface CreateAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface CreateNAppCommissionConfigRequest extends BaseRequest {
  TargetAppID: string
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt: number
  Invites: number
  SettleType: SettleType
}

export interface CreateNAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface UpdateAppCommissionConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  /** @format int64 */
  StartAt?: number
  /** @format int64 */
  Invites?: number
  ThresholdAmount?: string
}

export interface UpdateAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface UpdateNAppCommissionConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  /** @format int64 */
  StartAt?: number
  /** @format int64 */
  Invites?: number
  ThresholdAmount?: string
}

export interface UpdateNAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface GetAppCommissionConfigsRequest extends BaseRequest {
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppCommissionConfigsResponse {
  Infos: AppCommissionConfig[]
  /** @format int64 */
  Total: number
}

export interface GetNAppCommissionConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetNAppCommissionConfigsResponse {
  Infos: AppCommissionConfig[]
  /** @format int64 */
  Total: number
}

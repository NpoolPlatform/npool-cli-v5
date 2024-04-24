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
  Disabled: boolean
  /** @format int64 */
  Level: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppCommissionConfigRequest extends BaseRequest {
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt?: number
  Invites: number
  SettleType: SettleType
  Disabled: boolean
  Level: number
}

export interface CreateAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface AdminCreateAppCommissionConfigRequest extends BaseRequest {
  TargetAppID: string
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt?: number
  Invites: number
  SettleType: SettleType
  Disabled: boolean
  Level: number
}

export interface AdminCreateAppCommissionConfigResponse {
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
  Disabled?: boolean
  /** @format int64 */
  Level?: number
}

export interface UpdateAppCommissionConfigResponse {
  Info: AppCommissionConfig
}

export interface AdminUpdateAppCommissionConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  /** @format int64 */
  StartAt?: number
  /** @format int64 */
  Invites?: number
  ThresholdAmount?: string
  Disabled?: boolean
  /** @format int64 */
  Level?: number
}

export interface AdminUpdateAppCommissionConfigResponse {
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

export interface AdminGetAppCommissionConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetAppCommissionConfigsResponse {
  Infos: AppCommissionConfig[]
  /** @format int64 */
  Total: number
}

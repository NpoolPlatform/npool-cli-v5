import { BaseRequest } from '../../../request'
import { SettleAmountType, SettleInterval, SettleMode, CommissionType } from './const'

export interface AppConfig {
  ID: number
  EntID: string
  AppID: string
  SettleMode: SettleMode
  SettleAmountType: SettleAmountType
  SettleInterval: SettleInterval
  CommissionType: CommissionType
  SettleBenefit: boolean
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int64 */
  MaxLevelCount: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppConfigRequest extends BaseRequest {
  SettleMode: SettleMode
  SettleAmountType: SettleAmountType
  SettleInterval: SettleInterval
  CommissionType: CommissionType
  SettleBenefit: boolean
  StartAt?: number
  MaxLevelCount: number
}

export interface CreateAppConfigResponse {
  Info: AppConfig
}

export interface AdminCreateAppConfigRequest extends BaseRequest {
  TargetAppID: string
  SettleMode: SettleMode
  SettleAmountType: SettleAmountType
  SettleInterval: SettleInterval
  CommissionType: CommissionType
  SettleBenefit: boolean
  StartAt?: number
  MaxLevelCount: number
}

export interface AdminCreateAppConfigResponse {
  Info: AppConfig
}

export interface UpdateAppConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  /** @format int64 */
  StartAt?: number
}

export interface UpdateAppConfigResponse {
  Info: AppConfig
}

export interface AdminUpdateAppConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  /** @format int64 */
  StartAt?: number
}

export interface AdminUpdateAppConfigResponse {
  Info: AppConfig
}

export interface GetAppConfigsRequest extends BaseRequest {
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppConfigsResponse {
  Infos: AppConfig[]
  /** @format int64 */
  Total: number
}

export interface AdminGetAppConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetAppConfigsResponse {
  Infos: AppConfig[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../../../../request'
import { SettleType } from './const'

export interface AppGoodCommissionConfig {
  ID: number
  EntID: string
  AppID: string
  SettleType: SettleType
  GoodID: string
  GoodName: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
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
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
  AppGoodID: string
}

export interface CreateAppGoodCommissionConfigRequest extends BaseRequest {
  AppGoodID: string
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt?: number
  Invites: number
  SettleType: SettleType
  Disabled?: boolean
}

export interface CreateAppGoodCommissionConfigResponse {
  Info: AppGoodCommissionConfig
}

export interface CreateNAppGoodCommissionConfigRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  ThresholdAmount: string
  AmountOrPercent: string
  StartAt?: number
  Invites: number
  SettleType: SettleType
  Disabled?: boolean
}

export interface CreateNAppGoodCommissionConfigResponse {
  Info: AppGoodCommissionConfig
}

export interface UpdateAppGoodCommissionConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  /** @format int64 */
  StartAt?: number
  /** @format int64 */
  Invites?: number
  ThresholdAmount?: string
  Disabled?: boolean
}

export interface UpdateAppGoodCommissionConfigResponse {
  Info: AppGoodCommissionConfig
}

export interface UpdateNAppGoodCommissionConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  /** @format int64 */
  StartAt?: number
  /** @format int64 */
  Invites?: number
  ThresholdAmount?: string
  Disabled?: boolean
}

export interface UpdateNAppGoodCommissionConfigResponse {
  Info: AppGoodCommissionConfig
}

export interface GetAppGoodCommissionConfigsRequest extends BaseRequest {
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppGoodCommissionConfigsResponse {
  Infos: AppGoodCommissionConfig[]
  /** @format int64 */
  Total: number
}

export interface GetNAppGoodCommissionConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetNAppGoodCommissionConfigsResponse {
  Infos: AppGoodCommissionConfig[]
  /** @format int64 */
  Total: number
}

export interface CloneAppGoodCommissionConfigsRequest extends BaseRequest {
  FromAppGoodID: string
  ToAppGoodID: string
  Value: string
  ScalePercent: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CloneAppGoodCommissionConfigsResponse {
}

export interface CloneNAppGoodCommissionConfigsRequest extends BaseRequest {
  TargetAppID: string
  FromAppGoodID: string
  ToAppGoodID: string
  Value: string
  ScalePercent: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CloneNAppGoodCommissionConfigsResponse {
}

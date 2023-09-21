import { BaseRequest } from '../../request'
import { SettleAmountType, SettleInterval, SettleMode, SettleType } from './const'

export interface Commission {
  ID: string
  AppID: string
  UserID: string
  Username: string
  EmailAddress: string
  PhoneNO: string
  FirstName: string
  LastName: string
  Kol: boolean
  SettleType: SettleType
  SettleMode: SettleMode
  SettleInterval: SettleInterval
  SettleAmountType: SettleAmountType
  GoodID: string
  GoodName: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  AmountOrPercent: string
  Threshold: string
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
  AppGoodID: string
}

export interface CreateCommissionRequest extends BaseRequest {
  TargetUserID: string
  AppGoodID: string
  SettleType: SettleType
  SettleAmountType: SettleAmountType
  AmountOrPercent: string
  StartAt: number
  SettleMode: SettleMode
  Threshold?: string
  SettleInterval: SettleInterval
}

export interface CreateCommissionResponse {
  Info: Commission
}

export interface CreateUserCommissionRequest extends BaseRequest {
  TargetUserID: string
  AppGoodID: string
  SettleType: SettleType
  SettleAmountType: SettleAmountType
  SettleMode: SettleMode
  AmountOrPercent: string
  StartAt: number
  Threshold?: string
  SettleInterval: SettleInterval
}

export interface CreateUserCommissionResponse {
  Info: Commission
}

export interface UpdateCommissionRequest extends BaseRequest {
  ID: string
  /** @format int64 */
  StartAt?: number
  Threshold?: string
}

export interface UpdateCommissionResponse {
  Info: Commission
}

export interface GetCommissionsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCommissionsResponse {
  Infos: Commission[]
  /** @format int64 */
  Total: number
}

export interface GetAppCommissionsRequest extends BaseRequest {
  /** @format int64 */
  EndAt?: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppCommissionsResponse {
  Infos: Commission[]
  /** @format int64 */
  Total: number
}

export interface CloneCommissionsRequest extends BaseRequest {
  FromAppGoodID: string
  ToAppGoodID: string
  Value: string
  ScalePercent: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CloneCommissionsResponse {
}

export interface CloneAppCommissionsRequest extends BaseRequest {
  TargetAppID: string
  FromAppGoodID: string
  ToAppGoodID: string
  Value: string
  ScalePercent: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CloneAppCommissionsResponse {
}

export interface GetCommissionHistoriesRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCommissionHistoriesResponse {
  Infos: Commission[]
  /** @format int64 */
  Total: number
}

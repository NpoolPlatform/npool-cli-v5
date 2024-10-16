import { BaseRequest } from '../../../request'

export interface CoinConfig {
  ID: number
  EntID: string
  AppID: string
  CoinTypeID: string
  MaxValue: string
  Allocated: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminCreateCoinConfigRequest extends BaseRequest {
  TargetAppID: string
  CoinTypeID: string
  MaxValue: string
  Allocated: string
}

export interface AdminCreateCoinConfigResponse {
  Info: CoinConfig
}

export interface AdminUpdateCoinConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  MaxValue?: string
  Allocated?: string
}

export interface AdminUpdateCoinConfigResponse {
  Info: CoinConfig
}

export interface AdminGetCoinConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetCoinConfigsResponse {
  Infos: CoinConfig[]
  /** @format int64 */
  Total: number
}

export interface AdminDeleteCoinConfigRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteCoinConfigResponse {
  Info: CoinConfig
}

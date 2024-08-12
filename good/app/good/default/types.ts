import { BaseRequest } from '../../../../request'

export interface Default {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  GoodID: string
  GoodName: string
  AppGoodID: string
  AppGoodName: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinEnv: string
  CoinUnit: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateDefaultRequest extends BaseRequest{
  CoinTypeID: string
  AppGoodID: string
}

export interface CreateDefaultResponse {
  Info: Default
}

export interface UpdateDefaultRequest extends BaseRequest{
  ID: number
  EntID: string
  AppGoodID?: string
}

export interface UpdateDefaultResponse {
  Info: Default
}

export interface DeleteDefaultRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteDefaultResponse {
  Info: Default
}

export interface GetDefaultsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetDefaultsResponse {
  Infos: Default[]
  Total: number
}

export interface AdminCreateDefaultRequest extends BaseRequest{
  TargetAppID: string
  CoinTypeID: string
  AppGoodID: string
}

export interface AdminCreateDefaultResponse {
  Info: Default
}

export interface AdminUpdateDefaultRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID?: string
}

export interface AdminUpdateDefaultResponse {
  Info: Default
}

export interface AdminDeleteDefaultRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteDefaultResponse {
  Info: Default
}

export interface AdminGetDefaultsRequest extends BaseRequest{
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetDefaultsResponse {
  Infos: Default[]
  /** @format int64 */
  Total: number
}

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
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppDefaultGoodRequest extends BaseRequest{
  AppGoodID: string
}

export interface CreateAppDefaultGoodResponse {
  Info: Default
}

export interface UpdateAppDefaultGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  AppGoodID: string
}

export interface UpdateAppDefaultGoodResponse {
  Info: Default
}

export interface DeleteAppDefaultGoodRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteAppDefaultGoodResponse {
  Info: Default
}

export interface GetAppDefaultGoodsRequest extends BaseRequest{
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppDefaultGoodsResponse {
  Infos: Default[]
  /** @format int64 */
  Total: number
}

export interface CreateNAppDefaultGoodRequest extends BaseRequest{
  TargetAppID: string
  AppGoodID: string
}

export interface CreateNAppDefaultGoodResponse {
  Info: Default
}

export interface UpdateNAppDefaultGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  AppGoodID: string
  TargetAppID: string
}

export interface UpdateNAppDefaultGoodResponse {
  Info: Default
}

export interface DeleteNAppDefaultGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
}

export interface DeleteNAppDefaultGoodResponse {
  Info: Default
}

export interface GetNAppDefaultGoodsRequest extends BaseRequest{
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetNAppDefaultGoodsResponse {
  Infos: Default[]
  /** @format int64 */
  Total: number
}

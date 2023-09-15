import { BaseRequest } from '../../../../request'

export interface Default {
  ID: string
  AppID: string
  GoodID: string
  CoinTypeID: string
  CoinUnit: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppDefaultGoodRequest extends BaseRequest{
  GoodID: string
  CoinTypeID: string
}

export interface CreateAppDefaultGoodResponse {
  Info: Default
}

export interface UpdateAppDefaultGoodRequest extends BaseRequest{
  ID: string
  GoodID: string
}

export interface UpdateAppDefaultGoodResponse {
  Info: Default
}

export interface DeleteAppDefaultGoodRequest extends BaseRequest{
  ID: string
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
  GoodID: string
  CoinTypeID: string
}

export interface CreateNAppDefaultGoodResponse {
  Info: Default
}

export interface UpdateNAppDefaultGoodRequest extends BaseRequest{
  ID: string
  GoodID: string
  TargetAppID: string
}

export interface UpdateNAppDefaultGoodResponse {
  Info: Default
}

export interface DeleteNAppDefaultGoodRequest extends BaseRequest{
  ID: string
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

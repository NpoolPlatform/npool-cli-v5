import { BaseRequest } from '../../../../request'

export interface Simulate {
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
  FixedOrderUnits: string
  FixedOrderDuration: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAppSimulateGoodRequest extends BaseRequest{
  AppGoodID: string
  FixedOrderUnits: string
  FixedOrderDuration: number
}

export interface CreateAppSimulateGoodResponse {
  Info: Simulate
}

export interface UpdateAppSimulateGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  FixedOrderUnits: string
  FixedOrderDuration: number
}

export interface UpdateAppSimulateGoodResponse {
  Info: Simulate
}

export interface DeleteAppSimulateGoodRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteAppSimulateGoodResponse {
  Info: Simulate
}

export interface GetAppSimulateGoodsRequest extends BaseRequest{
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppSimulateGoodsResponse {
  Infos: Simulate[]
  /** @format int64 */
  Total: number
}

export interface CreateNAppSimulateGoodRequest extends BaseRequest{
  TargetAppID: string
  AppGoodID: string
  FixedOrderUnits: string
  FixedOrderDuration: number
}

export interface CreateNAppSimulateGoodResponse {
  Info: Simulate
}

export interface UpdateNAppSimulateGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  FixedOrderUnits: string
  FixedOrderDuration: number
  TargetAppID: string
}

export interface UpdateNAppSimulateGoodResponse {
  Info: Simulate
}

export interface DeleteNAppSimulateGoodRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
}

export interface DeleteNAppSimulateGoodResponse {
  Info: Simulate
}

export interface GetNAppSimulateGoodsRequest extends BaseRequest{
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetNAppSimulateGoodsResponse {
  Infos: Simulate[]
  /** @format int64 */
  Total: number
}

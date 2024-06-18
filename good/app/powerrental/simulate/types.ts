import { GoodCoinInfo } from '../../../good/coin'
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
  OrderUnits: string
  OrderDurationSeconds: number
  GoodCoins: GoodCoinInfo[]
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateSimulateRequest extends BaseRequest{
  AppGoodID: string
  OrderUnits: string
  OrderDurationSeconds: number
}

export interface CreateSimulateResponse {
  Info: Simulate
}

export interface UpdateSimulateRequest extends BaseRequest{
  ID: number
  EntID: string
  OrderUnits: string
  OrderDurationSeconds: number
}

export interface UpdateSimulateResponse {
  Info: Simulate
}

export interface DeleteSimulateRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteSimulateResponse {
  Info: Simulate
}

export interface GetSimulatesRequest extends BaseRequest{
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetSimulatesResponse {
  Infos: Simulate[]
  /** @format int64 */
  Total: number
}

export interface AdminCreateSimulateRequest extends BaseRequest{
  TargetAppID: string
  AppGoodID: string
  OrderUnits: string
  OrderDurationSeconds: number
}

export interface AdminCreateSimulateResponse {
  Info: Simulate
}

export interface AdminUpdateSimulateRequest extends BaseRequest{
  ID: number
  EntID: string
  OrderUnits: string
  OrderDurationSeconds: number
  TargetAppID: string
}

export interface AdminUpdateSimulateResponse {
  Info: Simulate
}

export interface AdminDeleteSimulateRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteSimulateResponse {
  Info: Simulate
}

export interface AdminGetSimulatesRequest extends BaseRequest{
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetSimulatesResponse {
  Infos: Simulate[]
  /** @format int64 */
  Total: number
}

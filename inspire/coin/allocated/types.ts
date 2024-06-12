import { BaseRequest } from '../../../request'

export interface CoinAllocated {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  CoinConfigID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  CoinAmount: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminGetCoinAllocatedsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetCoinAllocatedsResponse {
  Infos: CoinAllocated[]
  /** @format int64 */
  Total: number
}

export interface UserGetCoinAllocatedsRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface UserGetCoinAllocatedsResponse {
  Infos: CoinAllocated[]
  /** @format int64 */
  Total: number
}

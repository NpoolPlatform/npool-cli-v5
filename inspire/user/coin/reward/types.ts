import { BaseRequest } from '../../../../request'

export interface UserCoinReward {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  CoinRewards: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminGetUserCoinRewardsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetUserCoinRewardsResponse {
  Infos: UserCoinReward[]
  /** @format int64 */
  Total: number
}

export interface UserGetUserCoinRewardsRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface UserGetUserCoinRewardsResponse {
  Infos: UserCoinReward[]
  /** @format int64 */
  Total: number
}

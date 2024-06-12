import { BaseRequest } from '../../../request'

export interface UserReward {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  ActionCredits: string
  CouponAmount: string
  CouponCashableAmount: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminGetUserRewardsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetUserRewardsResponse {
  Infos: UserReward[]
  /** @format int64 */
  Total: number
}

export interface UserGetUserRewardsRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface UserGetUserRewardsResponse {
  Infos: UserReward[]
  /** @format int64 */
  Total: number
}

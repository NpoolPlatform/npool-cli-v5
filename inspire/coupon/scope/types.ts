import { BaseRequest } from '../../../request'
import { CouponScope, CouponType } from '../const'

export interface Scope {
  ID: string
  AppID: string
  AppGoodID: string
  GoodName: string
  CouponID: string
  CouponName: string
  CouponTypeStr: string
  CouponType: CouponType
  CouponScopeStr: string
  CouponScope: CouponScope
  CouponDenomination: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}
export interface CreateScopeRequest extends BaseRequest {
  TargetAppID: string
  CouponID: string
  AppGoodID: string
  CouponScope: CouponScope
}

export interface CreateScopeResponse {
  Info: Scope
}

export interface DeleteScopeRequest extends BaseRequest {
  ID: string
  TargetAppID?: string
}

export interface DeleteScopeResponse {
  Info: Scope
}

export interface GetNAppScopesRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetNAppScopesResponse {
  Infos: Scope[]
  /** @format int64 */
  Total: number
}

export interface GetAppScopesRequest extends BaseRequest {
  AppID?: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetAppScopesResponse {
  Infos: Scope[]
  /** @format int64 */
  Total: number
}

export interface GetScopesRequest extends BaseRequest {
  AppID?: string
  UserID?: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetScopesResponse {
  Infos: Scope[]
  /** @format int64 */
  Total: number
}

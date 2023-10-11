import { BaseRequest } from '../../../request'
import { CouponScope, CouponType } from '../const'

export interface CreateScopeRequest extends BaseRequest {
  AppID?: string
  CouponID: string
  AppGoodID: string
  CouponScope: CouponScope
}

export interface CreateScopeResponse {
  Info: Scope
}

export interface DeleteScopeRequest extends BaseRequest {
  ID: string
  AppID?: string
}

export interface DeleteScopeResponse {
  Info: Scope
}

export interface GetAppScopesRequest extends BaseRequest {
  TargetAppID: string
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
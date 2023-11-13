import { BaseRequest } from '../../../request'
import { CouponScope, CouponType } from '../const'

export interface Scope {
  ID: number
  EntID: string
  GoodID: string
  GoodTitle: string
  CouponID: string
  CouponName: string
  CouponType: CouponType
  CouponScope: CouponScope
  CouponDenomination: string
  CouponCirculation: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}
export interface CreateScopeRequest extends BaseRequest {
  GoodID: string
  CouponID: string
  CouponScope?: CouponScope
}

export interface CreateScopeResponse {
  Info: Scope
}

export interface DeleteScopeRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteScopeResponse {
  Info: Scope
}

export interface GetScopesRequest extends BaseRequest {
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

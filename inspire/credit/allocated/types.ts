import { BaseRequest } from '../../../request'

export interface CreditAllocated {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Credits: string
  Extra: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminGetCreditAllocatedsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetCreditAllocatedsResponse {
  Infos: CreditAllocated[]
  /** @format int64 */
  Total: number
}

export interface GetMyCreditAllocatedsRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetMyCreditAllocatedsResponse {
  Infos: CreditAllocated[]
  /** @format int64 */
  Total: number
}

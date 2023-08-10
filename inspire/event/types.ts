import { BaseRequest } from 'npool-cli-v4'
import { Coupon } from '../coupon/types'

export enum CouponType {
  FixAmount = 'FixAmount',
  Discount = 'Discount',
  SpecialOffer = 'SpecialOffer'
}

export enum UsedFor {
  Signup = 'Signup',
  Signin = 'Signin',
  Update = 'Update',
  Contact = 'Contact',
  SetWithdrawAddress = 'SetWithdrawAddress',
  Withdraw = 'Withdraw',
  CreateInvitationCode = 'CreateInvitationCode',
  SetCommission = 'SetCommission',
  SetTransferTargetUser = 'SetTransferTargetUser',
  Transfer = 'Transfer',
  WithdrawalRequest = 'WithdrawalRequest',
  WithdrawalCompleted = 'WithdrawalCompleted',
  DepositReceived = 'DepositReceived',
  KYCApproved = 'KYCApproved',
  KYCRejected = 'KYCRejected',
  Purchase = 'Purchase',
  AffiliatePurchase = 'AffiliatePurchase',
  Announcement = 'Announcement',
  AffiliateSignup = 'AffiliateSignup',
}

export const UsedFors = Object.values(UsedFor)

export interface Event {
  ID: string
  AppName: string
  EventType: UsedFor
  Coupons: Coupon[]
  Credits: string
  CreditsPerUSD: string
  /** @format int64 */
  MaxConsecutive: number
  GoodID: string
  GoodName: string
  /** @format int64 */
  InviterLayers: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateEventRequest extends BaseRequest {
  EventType: UsedFor
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  GoodID?: string
  /** @format int64 */
  InviterLayers?: number
}

export interface CreateEventResponse {
  Info: Event;
}

export interface GetEventsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetEventsResponse {
  Infos: Event[]
  /** @format int64 */
  Total: number
}

export interface UpdateEventRequest extends BaseRequest {
  ID: string
  CouponIDs: string[]
  Credits?: string
  CreditsPerUSD?: string
  /** @format int64 */
  MaxConsecutive?: number
  /** @format int64 */
  InviterLayers?: number
}

export interface UpdateEventResponse {
  Info: Event
}

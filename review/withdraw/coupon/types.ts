import { WithdrawState } from '../../../ledger/withdraw'
import { BaseRequest, NotifyRequest } from '../../../request'
import { KycState, ReviewObjectType, ReviewState, ReviewTriggerType } from '../../base'

export interface CouponWithdrawReview {
  ID: number
  EntID: string
  UserID: string
  KycState: KycState
  EmailAddress: string
  PhoneNO: string
  Reviewer: string
  ObjectType: ReviewObjectType
  Domain: string
  CreatedAt: number
  UpdatedAt: number
  Message: string
  State: ReviewState
  Trigger: ReviewTriggerType
  Amount: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  AllocatedID: string
  CouponName: string
  CouponWithdrawID: string
  CouponWithdrawState: WithdrawState
}

export interface GetAppCouponWithdrawReviewsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppCouponWithdrawReviewsResponse {
  Infos: CouponWithdrawReview[]
  Total: number
}

export interface GetCouponWithdrawReviewsRequest extends BaseRequest {
  AppID: string
  Offset: number
  Limit: number
}

export interface GetCouponWithdrawReviewsResponse {
  Infos: CouponWithdrawReview[]
  Total: number
}

export interface UpdateAppCouponWithdrawReviewRequest extends NotifyRequest {
  ID: number
  EntID: string
  AppID: string
  TargetAppID: string
  UserID: string
  State: ReviewState
  Message: string
}

export interface UpdateAppCouponWithdrawReviewResponse {
  Info: CouponWithdrawReview
}

export interface UpdateCouponWithdrawReviewRequest extends NotifyRequest {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  State: ReviewState
  Message: string
}

export interface UpdateCouponWithdrawReviewResponse {
  Info: CouponWithdrawReview
}

import { BaseRequest, NotifyRequest } from '../../request'
import { ReviewState, ReviewTriggerType } from '../base'
export interface WithdrawReview {
  WithdrawID: string
  WithdrawState: string
  ReviewID: string
  UserID: string
  KycState: string
  EmailAddress: string
  PhoneNO: string
  Reviewer: string
  ObjectType: string
  Domain: string
  CreatedAt: number
  UpdatedAt: number
  Message: string
  State: ReviewState
  Trigger: ReviewTriggerType
  Amount: string
  FeeAmount: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  Address: string
  PlatformTransactionID: string
  ChainTransactionID: string
}

export interface UpdateWithdrawReviewRequest extends NotifyRequest {
  ReviewID: string
  UserID: string
  LangID: string
  State: ReviewState
  Message: string
}

export interface UpdateWithdrawReviewResponse {
  Info: WithdrawReview
}

export interface GetWithdrawReviewsRequest extends BaseRequest {
  Offset: number
  Limit: number
}
export interface GetWithdrawReviewsResponse {
  Infos: Array<WithdrawReview>
  Total: number
}

export interface GetAppWithdrawReviewsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppWithdrawReviewsResponse {
  Infos: WithdrawReview[]
  Total: number
}

export interface UpdateAppWithdrawReviewRequest extends NotifyRequest {
  TargetAppID: string
  ReviewID: string
  AppID: string
  UserID: string
  LangID: string
  State: ReviewState
  Message: string
}

export interface UpdateAppWithdrawReviewResponse {
  Info: WithdrawReview
}

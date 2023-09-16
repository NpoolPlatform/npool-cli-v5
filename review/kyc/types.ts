import { BaseRequest, NotifyRequest } from '../../request'
import { EntityType, KYCState, DocumentType } from '../../appuser/kyc'
import { ReviewState } from '../base'

export interface KYCReview {
  UserID: string
  EmailAddress: string
  PhoneNO: string
  KycID: string
  DocumentType: DocumentType
  IDNumber: string
  FrontImg: string
  BackImg: string
  SelfieImg: string
  EntityType: EntityType
  ReviewID: string
  ObjectType: string
  Domain: string
  Reviewer: string
  ReviewState: ReviewState
  KycState: KYCState
  Message: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetKycReviewsRequest extends BaseRequest {
  Offset: number
  Limit: number
}
export interface GetKycReviewsResponse {
  Infos: Array<KYCReview>
  Total: number
}

export interface UpdateKycReviewRequest extends NotifyRequest {
  LangID?: string
  ReviewID: string
  State?: ReviewState
  Message: string
  UserID?: string
}

export interface UpdateKycReviewResponse {
  Info: KYCReview
}

export interface GetAppKycReviewsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppKycReviewsResponse {
  Infos: Array<KYCReview>
  Total: number
}

export interface UpdateAppKycReviewRequest extends NotifyRequest {
  TargetAppID: string
  LangID?: string
  ReviewID: string
  State?: ReviewState
  Message: string
  UserID?: string
}

export interface UpdateAppKycReviewResponse {
  Info: KYCReview
}

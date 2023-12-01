import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetKycReviewsRequest,
  GetKycReviewsResponse,
  KYCReview,
  UpdateKycReviewRequest,
  UpdateKycReviewResponse,
  GetAppKycReviewsRequest,
  GetAppKycReviewsResponse,
  UpdateAppKycReviewRequest,
  UpdateAppKycReviewResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'
import { KYCState } from '../../appuser/kyc'

export const useKycReviewStore = defineStore('kyc-reviews', {
  state: () => ({
    KYCReviews: new Map<string, Array<KYCReview>>()
  }),
  getters: {
    reviews (): (appID?: string) => Array<KYCReview> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.KYCReviews.get(appID)?.sort((a, b) => {
          const states = new Map<KYCState, number>([
            [KYCState.Reviewing, 0],
            [KYCState.Rejected, 1],
            [KYCState.Approved, 1]
          ])
          return ((states.get(a.KycState) || -1) - (states.get(b.KycState) || -1)) || a.CreatedAt - b.CreatedAt
        }) || []
      }
    },
    review (): (appID: string | undefined, reviewID: string) => KYCReview | undefined {
      return (appID: string | undefined, reviewID: string) => {
        appID = formalizeAppID()
        return this.KYCReviews.get(appID)?.find((el) => el.ReviewID === reviewID)
      }
    },
    addReviews (): (appID: string | undefined, reviews: Array<KYCReview>) => void {
      return (appID: string | undefined, reviews: Array<KYCReview>) => {
        appID = formalizeAppID(appID)
        let _reviews = this.KYCReviews.get(appID) as Array<KYCReview>
        if (!_reviews) {
          _reviews = []
        }
        reviews.forEach((review) => {
          const index = _reviews.findIndex((el) => el.ReviewID === review.ReviewID)
          _reviews.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, review)
        })
        this.KYCReviews.set(appID, _reviews)
      }
    }
  },
  actions: {
    getKycReviews (req: GetKycReviewsRequest, done: (error: boolean, reviews?: Array<KYCReview>) => void) {
      doActionWithError<GetKycReviewsRequest, GetKycReviewsResponse>(
        API.GET_KYCREVIEWS,
        req,
        req.Message,
        (resp: GetKycReviewsResponse): void => {
          this.addReviews(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateKycReview (req: UpdateKycReviewRequest, done: (error: boolean, kycReview?: KYCReview) => void) {
      doActionWithError<UpdateKycReviewRequest, UpdateKycReviewResponse>(
        API.UPDATE_KYCREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateKycReviewResponse): void => {
          this.addReviews(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppKycReviews (req: GetAppKycReviewsRequest, done: (error: boolean, reviews?: Array<KYCReview>) => void) {
      doActionWithError<GetAppKycReviewsRequest, GetAppKycReviewsResponse>(
        API.GET_APP_KYCREVIEWS,
        req,
        req.Message,
        (resp: GetAppKycReviewsResponse): void => {
          this.addReviews(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppKycReview (req: UpdateAppKycReviewRequest, done: (error: boolean, kycReview?: KYCReview) => void) {
      doActionWithError<UpdateAppKycReviewRequest, UpdateAppKycReviewResponse>(
        API.UPDATE_APP_KYCREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateAppKycReviewResponse): void => {
          this.addReviews(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

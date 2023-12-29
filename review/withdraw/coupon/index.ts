import { doActionWithError } from '../../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCouponWithdrawReviewsRequest,
  GetCouponWithdrawReviewsResponse,
  UpdateCouponWithdrawReviewRequest,
  UpdateCouponWithdrawReviewResponse,
  CouponWithdrawReview,
  GetAppCouponWithdrawReviewsRequest,
  GetAppCouponWithdrawReviewsResponse,
  UpdateAppCouponWithdrawReviewRequest,
  UpdateAppCouponWithdrawReviewResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCouponWithdrawReviewStore = defineStore('couponwithdraw-reviews', {
  state: () => ({
    CouponWithdrawReviews: new Map<string, Array<CouponWithdrawReview>>()
  }),
  getters: {
    reviews (): (appID?: string) => Array<CouponWithdrawReview> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.CouponWithdrawReviews.get(appID)?.sort((a, b) => b.State.localeCompare(a.State, 'zh-CN')) || []
      }
    },
    review (): (appID: string | undefined, reviewID: string) => CouponWithdrawReview | undefined {
      return (appID: string | undefined, reviewID: string) => {
        appID = formalizeAppID()
        return this.CouponWithdrawReviews.get(appID)?.find((el) => el.EntID === reviewID)
      }
    },
    addReviews (): (appID: string | undefined, reviews: Array<CouponWithdrawReview>) => void {
      return (appID: string | undefined, reviews: Array<CouponWithdrawReview>) => {
        appID = formalizeAppID(appID)
        let _reviews = this.CouponWithdrawReviews.get(appID) as Array<CouponWithdrawReview>
        if (!_reviews) {
          _reviews = []
        }
        reviews.forEach((review) => {
          const index = _reviews.findIndex((el) => el.EntID === review.EntID)
          _reviews.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, review)
        })
        this.CouponWithdrawReviews.set(appID, _reviews)
      }
    }
  },
  actions: {
    getCouponWithdrawReviews (req: GetCouponWithdrawReviewsRequest, done: (error: boolean, reviews?: Array<CouponWithdrawReview>) => void) {
      doActionWithError<GetCouponWithdrawReviewsRequest, GetCouponWithdrawReviewsResponse>(
        API.GET_COUPONWITHDRAWREVIEWS,
        req,
        req.Message,
        (resp: GetCouponWithdrawReviewsResponse): void => {
          this.addReviews(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateCouponWithdrawReview (req: UpdateCouponWithdrawReviewRequest, done: (error: boolean, review?: CouponWithdrawReview,) => void) {
      doActionWithError<UpdateCouponWithdrawReviewRequest, UpdateCouponWithdrawReviewResponse>(
        API.UPDATE_COUPONWITHDRAWREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateCouponWithdrawReviewResponse): void => {
          this.addReviews(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppCouponWithdrawReviews (req: GetAppCouponWithdrawReviewsRequest, done: (error: boolean, reviews?: Array<CouponWithdrawReview>) => void) {
      doActionWithError<GetAppCouponWithdrawReviewsRequest, GetAppCouponWithdrawReviewsResponse>(
        API.GET_APP_COUPONWITHDRAWREVIEWAS,
        req,
        req.Message,
        (resp: GetAppCouponWithdrawReviewsResponse): void => {
          this.addReviews(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppCouponWithdrawReview (req: UpdateAppCouponWithdrawReviewRequest, done: (error: boolean, review?: CouponWithdrawReview) => void) {
      doActionWithError<UpdateAppCouponWithdrawReviewRequest, UpdateAppCouponWithdrawReviewResponse>(
        API.UPDATE_APP_COUPONWITHDRAWREVIEWA,
        req,
        req.NotifyMessage,
        (resp: UpdateAppCouponWithdrawReviewResponse): void => {
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

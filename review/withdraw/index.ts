import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateWithdrawReviewRequest,
  UpdateWithdrawReviewResponse,
  WithdrawReview,
  GetAppWithdrawReviewsRequest,
  GetAppWithdrawReviewsResponse,
  UpdateAppWithdrawReviewRequest,
  UpdateAppWithdrawReviewResponse
} from './types'
import { formalizeAppID } from '../../appuser/app/local'

export const useWithdrawReviewStore = defineStore('withdraw-reviews', {
  state: () => ({
    WithdrawReviews: new Map<string, Array<WithdrawReview>>()
  }),
  getters: {
    reviews (): (appID?: string) => Array<WithdrawReview> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.WithdrawReviews.get(appID)?.sort((a, b) => b.State.localeCompare(a.State, 'zh-CN')) || []
      }
    },
    review (): (appID: string | undefined, reviewID: string) => WithdrawReview | undefined {
      return (appID: string | undefined, reviewID: string) => {
        appID = formalizeAppID()
        return this.WithdrawReviews.get(appID)?.find((el) => el.ReviewID === reviewID)
      }
    },
    addReviews (): (appID: string | undefined, reviews: Array<WithdrawReview>) => void {
      return (appID: string | undefined, reviews: Array<WithdrawReview>) => {
        appID = formalizeAppID(appID)
        let _reviews = this.WithdrawReviews.get(appID) as Array<WithdrawReview>
        if (!_reviews) {
          _reviews = []
        }
        reviews.forEach((review) => {
          const index = _reviews.findIndex((el) => el.ReviewID === review.ReviewID)
          _reviews.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, review)
        })
        this.WithdrawReviews.set(appID, _reviews)
      }
    }
  },
  actions: {
    getWithdrawReviews (req: GetWithdrawReviewsRequest, done: (error: boolean, reviews?: Array<WithdrawReview>) => void) {
      doActionWithError<GetWithdrawReviewsRequest, GetWithdrawReviewsResponse>(
        API.GET_WITHDRAWREVIEWS,
        req,
        req.Message,
        (resp: GetWithdrawReviewsResponse): void => {
          this.addReviews(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateWithdrawReview (req: UpdateWithdrawReviewRequest, done: (error: boolean, review?: WithdrawReview,) => void) {
      doActionWithError<UpdateWithdrawReviewRequest, UpdateWithdrawReviewResponse>(
        API.UPDATE_WITHDRAWREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateWithdrawReviewResponse): void => {
          this.addReviews(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppWithdrawReviews (req: GetAppWithdrawReviewsRequest, done: (error: boolean, reviews?: Array<WithdrawReview>) => void) {
      doActionWithError<GetAppWithdrawReviewsRequest, GetAppWithdrawReviewsResponse>(
        API.GET_APP_WITHDRAWREVIEWAS,
        req,
        req.Message,
        (resp: GetAppWithdrawReviewsResponse): void => {
          this.addReviews(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppWithdrawReview (req: UpdateAppWithdrawReviewRequest, done: (error: boolean, review?: WithdrawReview) => void) {
      doActionWithError<UpdateAppWithdrawReviewRequest, UpdateAppWithdrawReviewResponse>(
        API.UPDATE_APP_WITHDRAWREVIEWA,
        req,
        req.NotifyMessage,
        (resp: UpdateAppWithdrawReviewResponse): void => {
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

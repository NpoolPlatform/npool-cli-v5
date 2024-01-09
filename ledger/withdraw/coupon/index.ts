import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  CouponWithdraw,
  CreateCouponWithdrawRequest,
  CreateCouponWithdrawResponse,
  GetCouponWithdrawsRequest,
  GetCouponWithdrawsResponse,
  GetAppCouponWithdrawsRequest,
  GetAppCouponWithdrawsResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCouponWithdrawStore = defineStore('coupon-withdraw', {
  state: () => ({
    CouponWithdraws: new Map<string, Array<CouponWithdraw>>()
  }),
  getters: {
    withdraws (): (appID?: string, userID?: string) => Array<CouponWithdraw> {
      return (appID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.CouponWithdraws.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        })?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    addCouponWithdraws (appID: string | undefined, withdraws: Array<CouponWithdraw>) {
      appID = formalizeAppID(appID)
      let _withdraws = this.CouponWithdraws.get(appID) as Array<CouponWithdraw>
      if (!_withdraws) {
        _withdraws = []
      }
      withdraws.forEach((withdraw) => {
        const index = _withdraws.findIndex((el) => el.ID === withdraw.ID)
        _withdraws.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, withdraw)
      })
      this.CouponWithdraws.set(appID, _withdraws)
    },
    getCouponWithdraws (req: GetCouponWithdrawsRequest, done: (error: boolean, rows: Array<CouponWithdraw>) => void) {
      doActionWithError<GetCouponWithdrawsRequest, GetCouponWithdrawsResponse>(
        API.GET_COUPONWITHDRAWS,
        req,
        req.Message,
        (resp: GetCouponWithdrawsResponse): void => {
          this.addCouponWithdraws(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<CouponWithdraw>)
        }
      )
    },
    createCouponWithdraw (req: CreateCouponWithdrawRequest, done: (error: boolean, row: CouponWithdraw) => void) {
      doActionWithError<CreateCouponWithdrawRequest, CreateCouponWithdrawResponse>(
        API.CREATE_COUPONWITHDRAW,
        req,
        req.Message,
        (resp: CreateCouponWithdrawResponse): void => {
          this.addCouponWithdraws(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true, {} as CouponWithdraw)
        }
      )
    },
    getAppCouponWithdraws (req: GetAppCouponWithdrawsRequest, done: (error: boolean, rows: Array<CouponWithdraw>) => void) {
      doActionWithError<GetAppCouponWithdrawsRequest, GetAppCouponWithdrawsResponse>(
        API.GET_APP_COUPONWITHDRAWS,
        req,
        req.Message,
        (resp: GetAppCouponWithdrawsResponse): void => {
          this.addCouponWithdraws(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<CouponWithdraw>)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

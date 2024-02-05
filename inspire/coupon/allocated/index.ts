import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppCouponsRequest,
  GetAppCouponsResponse,
  CreateCouponRequest,
  CreateCouponResponse,
  Coupon,
  GetCouponsRequest,
  GetCouponsResponse
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'
import { CouponType } from '../const'

export const useAllocatedCouponStore = defineStore('allocated-coupon', {
  state: () => ({
    AllocatedCoupons: new Map<string, Array<Coupon>>()
  }),
  getters: {
    coupons (): (appID?: string, userID?: string, couponType?: CouponType) => Array<Coupon> {
      return (appID?: string, userID?: string, couponType?: CouponType) => {
        appID = formalizeAppID(appID)
        return (this.AllocatedCoupons.get(appID) || []).filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (couponType) ok &&= el.CouponType === couponType
          return ok
        }).sort((a, b) => a.CreatedAt - b.CreatedAt)
      }
    }
  },
  actions: {
    addCoupons (appID: string | undefined, coupons: Array<Coupon>) {
      appID = formalizeAppID(appID)
      let _coupons = this.AllocatedCoupons.get(appID) as Array<Coupon>
      if (!_coupons) {
        _coupons = []
      }
      coupons.forEach((coupon) => {
        const index = _coupons.findIndex((el) => el.ID === coupon.ID)
        _coupons.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coupon)
      })
      this.AllocatedCoupons.set(appID, _coupons)
    },
    getAppCoupons (req: GetAppCouponsRequest, done: (error: boolean, rows?: Array<Coupon>) => void) {
      doActionWithError<GetAppCouponsRequest, GetAppCouponsResponse>(
        API.GET_APP_ALLOCATEDCOUPONS,
        req,
        req.Message,
        (resp: GetAppCouponsResponse): void => {
          this.addCoupons(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getCoupons (req: GetCouponsRequest, done: (error: boolean, rows?: Array<Coupon>) => void) {
      doActionWithError<GetCouponsRequest, GetCouponsResponse>(
        API.GET_ALLOCATEDCOUPONS,
        req,
        req.Message,
        (resp: GetCouponsResponse): void => {
          this.addCoupons(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createCoupon (req: CreateCouponRequest, done: (error: boolean, row?: Coupon) => void) {
      doActionWithError<CreateCouponRequest, CreateCouponResponse>(
        API.CREATE_ALLOCATEDCOUPON,
        req,
        req.Message,
        (resp: CreateCouponResponse): void => {
          this.addCoupons(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

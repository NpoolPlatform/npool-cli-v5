import { defineStore } from 'pinia'
import { API, CouponType } from './const'
import {
  GetAppCouponsRequest,
  GetAppCouponsResponse,
  CreateCouponRequest,
  CreateCouponResponse,
  Coupon,
  GetCouponsRequest,
  GetCouponsResponse,
  UpdateCouponRequest,
  UpdateCouponResponse
} from './types'
import { doActionWithError } from '../../request/action'
import { useMyApplicationStore } from '../../appuser/app'

export const useCouponStore = defineStore('coupon-pool', {
  state: () => ({
    Coupons: new Map<string, Array<Coupon>>()
  }),
  getters: {
    coupons (): (appID?: string, couponType?: CouponType) => Array<Coupon> {
      return (appID?: string, couponType?: CouponType): Array<Coupon> => {
        const coupons = [] as Array<Coupon>
        this.Coupons.forEach((_coupons, _appID) => {
          if (appID && appID !== _appID) {
            return
          }
          _coupons.forEach((coupon) => {
            if (couponType && coupon.CouponType !== couponType) {
              return
            }
            coupons.push(coupon)
          })
        })
        return coupons
      }
    }
  },
  actions: {
    getCoupons (req: GetCouponsRequest, done: (error: boolean, rows?: Array<Coupon>) => void) {
      doActionWithError<GetCouponsRequest, GetCouponsResponse>(
        API.GET_COUPONPOOLS,
        req,
        req.Message,
        (resp: GetCouponsResponse): void => {
          const myApp = useMyApplicationStore()
          if (myApp.AppID) {
            this.Coupons.set(myApp.AppID, resp.Infos)
          }
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getAppCoupons (req: GetAppCouponsRequest, done: (error: boolean, rows: Array<Coupon>) => void) {
      doActionWithError<GetAppCouponsRequest, GetAppCouponsResponse>(
        API.GET_APP_COUPONPOOLS,
        req,
        req.Message,
        (resp: GetAppCouponsResponse): void => {
          let coupons = this.Coupons.get(req.TargetAppID)
          if (!coupons) {
            coupons = [] as Array<Coupon>
          }
          coupons.push(...resp.Infos)
          this.Coupons.set(req.TargetAppID, coupons)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Coupon>)
        }
      )
    },
    createCoupon (req: CreateCouponRequest, done: (error: boolean, row: Coupon) => void) {
      doActionWithError<CreateCouponRequest, CreateCouponResponse>(
        API.CREATE_COUPONPOOL,
        req,
        req.NotifyMessage,
        (resp: CreateCouponResponse): void => {
          let coupons = this.Coupons.get(req.TargetAppID)
          if (!coupons) {
            coupons = [] as Array<Coupon>
          }
          coupons.push(resp.Info)
          this.Coupons.set(req.TargetAppID, coupons)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Coupon)
        }
      )
    },
    updateCoupon (req: UpdateCouponRequest, done: (error: boolean, row: Coupon) => void) {
      doActionWithError<UpdateCouponRequest, UpdateCouponResponse>(
        API.UPDATE_COUPONPOOL,
        req,
        req.NotifyMessage,
        (resp: UpdateCouponResponse): void => {
          let coupons = this.Coupons.get(req.TargetAppID)
          if (!coupons) {
            coupons = [] as Array<Coupon>
          }
          const index = coupons.findIndex((el) => el.ID === resp.Info.ID)
          coupons.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, resp.Info)
          this.Coupons.set(req.TargetAppID, coupons)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Coupon)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

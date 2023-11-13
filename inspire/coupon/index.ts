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
import { formalizeAppID } from '../../appuser/app/local'

export const useCouponStore = defineStore('coupon-pool', {
  state: () => ({
    Coupons: new Map<string, Array<Coupon>>()
  }),
  getters: {
    coupons (): (appID?: string, couponType?: CouponType) => Array<Coupon> {
      return (appID?: string, couponType?: CouponType): Array<Coupon> => {
        appID = formalizeAppID(appID)
        return this.Coupons.get(appID)?.filter((el) => !couponType || el.CouponType === couponType) || []
      }
    },
    coupon (): (appID: string | undefined, id: number) => Coupon | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Coupons.get(appID)?.find((el) => el.ID === id)
      }
    },
    valid (): (appID: string | undefined, id: number) => boolean {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        const coupon = this.coupon(appID, id)
        if (!coupon) {
          return false
        }
        const endAt = coupon.StartAt + coupon.DurationDays * 60 * 60 * 24
        const now = new Date().getTime() / 1000
        return Number(coupon.Allocated) < Number(coupon.Circulation) && endAt > now
      }
    },
    addCoupons (): (appID: string | undefined, coupons: Array<Coupon>) => void {
      return (appID: string | undefined, coupons: Array<Coupon>) => {
        appID = formalizeAppID(appID)
        let _coupons = this.Coupons.get(appID) as Array<Coupon>
        if (!_coupons) {
          _coupons = []
        }
        coupons.forEach((coupon) => {
          const index = _coupons.findIndex((el) => el.ID === coupon.ID)
          _coupons.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coupon)
        })
        this.Coupons.set(appID, _coupons)
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
          this.addCoupons(undefined, resp.Infos)
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
          this.addCoupons(req.TargetAppID, resp.Infos)
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
          this.addCoupons(req.TargetAppID, [resp.Info])
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
          this.addCoupons(req.TargetAppID, [resp.Info])
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

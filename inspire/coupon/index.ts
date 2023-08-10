import { defineStore } from 'pinia'
import { API } from './const'
import {
  Coupon,
  GetCouponsRequest,
  GetCouponsResponse
} from './types'
import { doActionWithError } from 'npool-cli-v4'

export const useCouponStore = defineStore('coupon-pool', {
  state: () => ({
    Coupons: [] as Array<Coupon>
  }),
  getters: {
    valid (): (coupon: Coupon) => boolean {
      return (coupon: Coupon) => {
        return coupon.StartAt <= Date.now() / 1000 && coupon.StartAt + coupon.DurationDays * 24 * 60 * 60 >= Date.now() / 1000
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
          this.Coupons.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

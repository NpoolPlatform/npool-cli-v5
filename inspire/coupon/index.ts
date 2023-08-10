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

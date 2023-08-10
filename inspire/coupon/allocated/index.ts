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
import { doActionWithError } from 'npool-cli-v4'

export const useAllocatedCouponStore = defineStore('allocated-coupon', {
  state: () => ({
    AllocatedCoupons: [] as Array<Coupon>
  }),
  getters: {
  },
  actions: {
    getAppCoupons (req: GetAppCouponsRequest, done: (error: boolean, rows: Array<Coupon>) => void) {
      doActionWithError<GetAppCouponsRequest, GetAppCouponsResponse>(
        API.GET_APP_ALLOCATEDCOUPONS,
        req,
        req.Message,
        (resp: GetAppCouponsResponse): void => {
          this.AllocatedCoupons.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Coupon>)
        }
      )
    },
    getCoupons (req: GetCouponsRequest, done: (error: boolean, rows: Array<Coupon>) => void) {
      doActionWithError<GetCouponsRequest, GetCouponsResponse>(
        API.GET_APP_ALLOCATEDCOUPONS,
        req,
        req.Message,
        (resp: GetCouponsResponse): void => {
          this.AllocatedCoupons.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Coupon>)
        }
      )
    },
    createCoupon (req: CreateCouponRequest, done: (error: boolean, row: Coupon) => void) {
      doActionWithError<CreateCouponRequest, CreateCouponResponse>(
        API.CREATE_ALLOCATEDCOUPON,
        req,
        req.Message,
        (resp: CreateCouponResponse): void => {
          this.AllocatedCoupons.push(resp.Info)
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

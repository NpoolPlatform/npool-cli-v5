import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  OrderCoupon,
  GetOrderCouponsRequest,
  GetOrderCouponsResponse,
  GetMyOrderCouponsRequest,
  GetMyOrderCouponsResponse,
  AdminGetOrderCouponsRequest,
  AdminGetOrderCouponsResponse
} from './types'

import { formalizeAppID } from '../../appuser/app/local'

export const useOrderCouponStore = defineStore('order-coupons', {
  state: () => ({
    OrderCoupons: new Map<string, Array<OrderCoupon>>()
  }),
  getters: {
    orderCoupon (): (appID: string | undefined, id: string) => OrderCoupon | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.OrderCoupons.get(appID)?.find((el) => el.EntID === id)
      }
    },
    orderCoupons (): (appID?: string) => Array<OrderCoupon> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.OrderCoupons.get(appID) || []
      }
    }
  },
  actions: {
    addOrderCoupons (appID: string | undefined, orderCoupons: Array<OrderCoupon>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.OrderCoupons.get(appID) as Array<OrderCoupon>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      orderCoupons.forEach((orderCoupon) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === orderCoupon.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, orderCoupon)
      })
      this.OrderCoupons.set(appID, _simulateConfigs)
    },
    delOrderCoupon (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.OrderCoupons.get(appID) as Array<OrderCoupon>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.OrderCoupons.set(appID, _coins)
    },
    adminGetOrderCoupons (req: AdminGetOrderCouponsRequest, done: (error: boolean, rows?: Array<OrderCoupon>, total?: number) => void) {
      doActionWithError<AdminGetOrderCouponsRequest, AdminGetOrderCouponsResponse>(
        API.ADMIN_GET_ORDER_COUPONS,
        req,
        req.Message,
        (resp: AdminGetOrderCouponsResponse): void => {
          this.addOrderCoupons(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getOrderCoupons (req: GetOrderCouponsRequest, done: (error: boolean, rows?: Array<OrderCoupon>, total?: number) => void) {
      doActionWithError<GetOrderCouponsRequest, GetOrderCouponsResponse>(
        API.GET_ORDER_COUPONS,
        req,
        req.Message,
        (resp: GetOrderCouponsResponse): void => {
          this.addOrderCoupons(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getMyOrderCoupons (req: GetMyOrderCouponsRequest, done: (error: boolean, rows?: Array<OrderCoupon>, total?: number) => void) {
      doActionWithError<GetMyOrderCouponsRequest, GetMyOrderCouponsResponse>(
        API.GET_MY_ORDER_COUPONS,
        req,
        req.Message,
        (resp: GetMyOrderCouponsResponse): void => {
          this.addOrderCoupons(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { remain } from '../utils'
import { doActionWithError } from '../request'
import {
  Order,
  GetOrdersRequest,
  GetOrdersResponse,
  GetMyOrdersRequest,
  GetMyOrdersResponse,
  AdminGetOrdersRequest,
  AdminGetOrdersResponse
} from './types'
import { API, OrderState, OrderTimeoutSeconds } from './const'
import { formalizeAppID } from '../appuser/app/local'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    Orders: new Map<string, Array<Order>>()
  }),
  getters: {
    orders (): (appID?: string, userID?: string, appGoodID?: string) => Array<Order> {
      return (appID?: string, userID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        return this.Orders.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    order (): (orderID: number) => Order | undefined {
      return (orderID: number) => {
        const appID = formalizeAppID()
        return this.Orders.get(appID)?.find((el) => el.ID === orderID)
      }
    },
    getOrderByEntID (): (entID: string) => Order | undefined {
      return (entID: string) => {
        const appID = formalizeAppID()
        return this.Orders.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    orderState (): (orderID: number) => string {
      return (orderID: number) => {
        const order = this.order(orderID)
        if (!order) {
          return 'MSG_ERROR'
        }
        if (order.OrderState === OrderState.PAYMENT_TIMEOUT) {
          return 'MSG_CANCELED_BY_TIMEOUT'
        }
        switch (order.OrderState) {
          case OrderState.WAIT_PAYMENT:
          case OrderState.CREATED:
            return remain(order.CreatedAt + OrderTimeoutSeconds)
        }
        if (order.OrderState === OrderState.EXPIRED) {
          return 'MSG_DONE'
        }
        if (order.OrderState === OrderState.CANCELED) {
          return 'MSG_PAYMENT_CANCELED'
        }
        if (order.OrderState === OrderState.PAID) {
          return 'MSG_WAIT_FOR_START'
        }
        return 'MSG_IN_SERVICE'
      }
    },
    orderPaid (): (orderID: number) => boolean {
      return (orderID: number) => {
        const order = this.order(orderID)
        if (!order) {
          return false
        }
        return !(order.OrderState !== OrderState.CREATED && order.OrderState !== OrderState.WAIT_PAYMENT)
      }
    },
    validateOrder (): (orderID: number) => boolean {
      return (orderID: number) => {
        const order = this.order(orderID)
        if (!order) {
          return false
        }
        return !(order.OrderState !== OrderState.CREATED &&
                 order.OrderState !== OrderState.WAIT_PAYMENT &&
                 order.OrderState !== OrderState.CANCELED &&
                 order.OrderState !== OrderState.EXPIRED)
      }
    }
  },
  actions: {
    addOrders (appID: string | undefined, orders: Array<Order>) {
      appID = formalizeAppID(appID)
      let _orders = this.Orders.get(appID) as Array<Order>
      if (!_orders) {
        _orders = []
      }
      orders.forEach((order) => {
        const index = _orders.findIndex((el) => el.ID === order.ID)
        _orders.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, order)
      })
      this.Orders.set(appID, _orders)
    },
    getOrders (req: GetOrdersRequest, done: (error: boolean, orders?: Array<Order>, total?: number) => void) {
      doActionWithError<GetOrdersRequest, GetOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        },
        () => {
          done(true)
        }
      )
    },
    getMyOrders (req: GetMyOrdersRequest, done: (error: boolean, orders?: Array<Order>, total?: number) => void) {
      doActionWithError<GetMyOrdersRequest, GetMyOrdersResponse>(
        API.GET_MY_ORDERS,
        req,
        req.Message,
        (resp: GetMyOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        },
        () => {
          done(true)
        }
      )
    },
    adminGetOrders (req: AdminGetOrdersRequest, done: (error: boolean, orders?: Array<Order>, total?: number) => void) {
      doActionWithError<AdminGetOrdersRequest, AdminGetOrdersResponse>(
        API.ADMIN_GET_ORDERS,
        req,
        req.Message,
        (resp: AdminGetOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

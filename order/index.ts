import { defineStore } from 'pinia'
import { remain } from '../utils'
import { doActionWithError } from '../request'
import {
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  CreateOrdersRequest,
  CreateOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  Order,
  GetAppOrdersRequest,
  GetAppOrdersResponse,
  CreateUserOrderResponse,
  CreateUserOrderRequest,
  UpdateUserOrderRequest,
  UpdateUserOrderResponse,
  GetNAppOrdersRequest,
  GetNAppOrdersResponse,
  CreateAppUserOrderResponse,
  CreateAppUserOrderRequest,
  UpdateAppUserOrderRequest,
  UpdateAppUserOrderResponse
} from './types'
import { API, OrderState, OrderTimeoutSeconds, PaymentState } from './const'
import { formalizeAppID } from '../appuser/app/local'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    Orders: new Map<string, Array<Order>>()
  }),
  getters: {
    orders (): (appID?: string, userID?: string, appGoodID?: string, coinTypeID?: string, parentOrderID?: string, paid?: boolean) => Array<Order> {
      return (appID?: string, userID?: string, appGoodID?: string, coinTypeID?: string, parentOrderID?: string, paid?: boolean) => {
        appID = formalizeAppID(appID)
        return this.Orders.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (parentOrderID) ok &&= el.ParentOrderID === parentOrderID
          if (paid !== undefined) ok &&= paid ? el.PaymentState === PaymentState.DONE : true
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
        switch (order.OrderState) {
          case OrderState.PAID:
          case OrderState.WAIT_START:
          case OrderState.IN_SERVICE:
          case OrderState.EXPIRED:
            return true
        }
        return false
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
    },
    purchasedUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => {
        appID = formalizeAppID(appID)
        const units = 0
        this.Orders.get(appID)?.filter((el) => {
          let ok = el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        })
        return units
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
    createOrder (req: CreateOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<CreateOrderRequest, CreateOrderResponse>(
        API.CREATE_ORDER,
        req,
        req.Message,
        (resp: CreateOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },
    createOrders (req: CreateOrdersRequest, done?: (error: boolean, orders?: Array<Order>) => void) {
      doActionWithError<CreateOrdersRequest, CreateOrdersResponse>(
        API.CREATE_ORDERS,
        req,
        req.Message,
        (resp: CreateOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done?.(false, resp.Infos)
        },
        () => {
          done?.(true)
        }
      )
    },
    updateOrder (req: UpdateOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<UpdateOrderRequest, UpdateOrderResponse>(
        API.UPDATE_ORDER,
        req,
        req.Message,
        (resp: UpdateOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },
    getOrder (req: GetOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<GetOrderRequest, GetOrderResponse>(
        API.GET_ORDER,
        req,
        req.Message,
        (resp: GetOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },

    getAppOrders (req: GetAppOrdersRequest, done: (error: boolean, orders?: Array<Order>) => void) {
      doActionWithError<GetAppOrdersRequest, GetAppOrdersResponse>(
        API.GET_APP_ORDERS,
        req,
        req.Message,
        (resp: GetAppOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true)
        }
      )
    },
    createUserOrder (req: CreateUserOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<CreateUserOrderRequest, CreateUserOrderResponse>(
        API.CREATE_USER_ORDER,
        req,
        req.Message,
        (resp: CreateUserOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },
    updateUserOrder (req: UpdateUserOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<UpdateUserOrderRequest, UpdateUserOrderResponse>(
        API.UPDATE_USER_ORDER,
        req,
        req.Message,
        (resp: UpdateUserOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },

    getNAppOrders (req: GetNAppOrdersRequest, done: (error: boolean, orders?: Array<Order>, total?: number) => void) {
      doActionWithError<GetNAppOrdersRequest, GetNAppOrdersResponse>(
        API.GET_N_APP_ORDERS,
        req,
        req.Message,
        (resp: GetNAppOrdersResponse): void => {
          this.addOrders(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        },
        () => {
          done(true)
        }
      )
    },
    createAppUserOrder (req: CreateAppUserOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<CreateAppUserOrderRequest, CreateAppUserOrderResponse>(
        API.CREATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: CreateAppUserOrderResponse): void => {
          this.addOrders(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true)
        }
      )
    },
    updateAppUserOrder (req: UpdateAppUserOrderRequest, done: (error: boolean, order?: Order) => void) {
      doActionWithError<UpdateAppUserOrderRequest, UpdateAppUserOrderResponse>(
        API.UPDATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: UpdateAppUserOrderResponse): void => {
          this.addOrders(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
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

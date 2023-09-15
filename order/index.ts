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
import { API, OrderState, OrderTimeoutSeconds, OrderType, PaymentState } from './const'
import { formalizeAppID } from '../appuser/app'
import { NIL as NIL_UUID } from 'uuid'

export const useFrontendOrderStore = defineStore('frontend-order-v4', {
  state: () => ({
    Orders: new Map<string, Array<Order>>()
  }),
  getters: {
    orders (): (appID: string | undefined, userID: string | undefined) => Array<Order> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Orders.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    order (): (orderID: string) => Order | undefined {
      return (orderID: string) => {
        const appID = formalizeAppID()
        return this.Orders.get(appID)?.find((el) => el.ID === orderID)
      }
    },
    orderState (): (orderID: string) => string {
      return (orderID: string) => {
        const order = this.order(orderID)
        if (!order) {
          return 'MSG_ERROR'
        }
        if (order.PaymentState === PaymentState.NO_PAYMENT) {
          return 'MSG_NO_PAYMENT'
        }
        if (order.OrderType === OrderType.Offline) {
          return 'MSG_PAYMENT_OFFLINE'
        }
        if (order.PaymentID === NIL_UUID && Number(order.TransferAmount) > 0) {
          return 'MSG_INVALID_PAYMENT'
        }
        if (order.OrderState === OrderState.PAYMENT_TIMEOUT) {
          return 'MSG_CANCELED_BY_TIMEOUT'
        }
        if (order.OrderState === OrderState.WAIT_PAYMENT) {
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
    orderPaid (): (orderID: string) => boolean {
      return (orderID: string) => {
        const order = this.order(orderID)
        if (!order) {
          return false
        }
        return !(order.OrderState !== OrderState.CREATED && order.OrderState !== OrderState.WAIT_PAYMENT)
      }
    },
    validateOrder (): (orderID: string) => boolean {
      return (orderID: string) => {
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
    purchaseUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, goodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, goodID: string | undefined) => {
        appID = formalizeAppID(appID)
        const units = 0
        this.Orders.get(appID)?.filter((el) => {
          let ok = el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          if (goodID) ok &&= el.GoodID === goodID
          return ok
        })
        return units
      }
    },
    addOrders (): (appID: string | undefined, orders: Array<Order>) => void {
      return (appID: string | undefined, orders: Array<Order>) => {
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
      }
    }
  },
  actions: {
    getOrders (req: GetOrdersRequest, done: (orders: Array<Order>, error: boolean) => void) {
      doActionWithError<GetOrdersRequest, GetOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(resp.Infos, false)
        },
        () => {
          done([], true)
        }
      )
    },
    createOrder (req: CreateOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<CreateOrderRequest, CreateOrderResponse>(
        API.CREATE_ORDER,
        req,
        req.Message,
        (resp: CreateOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    updateOrder (req: UpdateOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<UpdateOrderRequest, UpdateOrderResponse>(
        API.UPDATE_ORDER,
        req,
        req.Message,
        (resp: UpdateOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    getOrder (req: GetOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<GetOrderRequest, GetOrderResponse>(
        API.GET_ORDER,
        req,
        req.Message,
        (resp: GetOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },

    getAppOrders (req: GetAppOrdersRequest, done: (orders: Array<Order>, error: boolean) => void) {
      doActionWithError<GetAppOrdersRequest, GetAppOrdersResponse>(
        API.GET_APP_ORDERS,
        req,
        req.Message,
        (resp: GetAppOrdersResponse): void => {
          this.addOrders(undefined, resp.Infos)
          done(resp.Infos, false)
        },
        () => {
          done([], true)
        }
      )
    },
    createUserOrder (req: CreateUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<CreateUserOrderRequest, CreateUserOrderResponse>(
        API.CREATE_USER_ORDER,
        req,
        req.Message,
        (resp: CreateUserOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    updateUserOrder (req: UpdateUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<UpdateUserOrderRequest, UpdateUserOrderResponse>(
        API.UPDATE_USER_ORDER,
        req,
        req.Message,
        (resp: UpdateUserOrderResponse): void => {
          this.addOrders(undefined, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },

    getNAppOrders (req: GetNAppOrdersRequest, done: (orders: Array<Order>, error: boolean) => void) {
      doActionWithError<GetNAppOrdersRequest, GetNAppOrdersResponse>(
        API.GET_N_APP_ORDERS,
        req,
        req.Message,
        (resp: GetNAppOrdersResponse): void => {
          this.addOrders(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        },
        () => {
          done([], true)
        }
      )
    },
    createAppUserOrder (req: CreateAppUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<CreateAppUserOrderRequest, CreateAppUserOrderResponse>(
        API.CREATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: CreateAppUserOrderResponse): void => {
          this.addOrders(req.TargetAppID, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    updateAppUserOrder (req: UpdateAppUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<UpdateAppUserOrderRequest, UpdateAppUserOrderResponse>(
        API.UPDATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: UpdateAppUserOrderResponse): void => {
          this.addOrders(req.TargetAppID, [resp.Info])
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    }
  }
})

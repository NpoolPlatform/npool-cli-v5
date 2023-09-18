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
import { formalizeAppID } from '../appuser/app/local'
import { NIL as NIL_UUID } from 'uuid'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    Orders: new Map<string, Array<Order>>()
  }),
  getters: {
    orders (): (appID?: string, userID?: string) => Array<Order> {
      return (appID?: string, userID?: string) => {
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

    getNAppOrders (req: GetNAppOrdersRequest, done: (error: boolean, orders?: Array<Order>) => void) {
      doActionWithError<GetNAppOrdersRequest, GetNAppOrdersResponse>(
        API.GET_N_APP_ORDERS,
        req,
        req.Message,
        (resp: GetNAppOrdersResponse): void => {
          this.addOrders(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
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

import { order, notify, constant, utils } from '../'
import { AppID } from './localapp'

const _order = order.useOrderStore()

const getPageOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _order.getOrders({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_ORDERS',
        Message: 'MSG_GET_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<order.Order>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageOrders(++pageIndex, pageEnd, done)
  })
}

export const getOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageOrders(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageNAppOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _order.getNAppOrders({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_ORDERS',
        Message: 'MSG_GET_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<order.Order>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageNAppOrders(pageIndex + 1, pageEnd, done)
  })
}

export const getNAppOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageNAppOrders(pageStart, pages ? pageStart + pages : pages, done)
}

export const updateAppUserOrder = (id: number, canceled: boolean) => {
  const targetOrder = _order.order(id)
  if (!targetOrder) {
    return
  }
  _order.updateAppUserOrder({
    TargetAppID: AppID.value,
    ID: targetOrder.ID,
    EntID: targetOrder.EntID,
    TargetUserID: targetOrder.UserID,
    Canceled: canceled,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_ORDER',
        Message: 'MSG_UPDATE_ORDER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, () => {
    // TODO
  })
}

export const createAppUserOrder = (req: order.CreateAppUserOrderRequest) => {
  req.Message = {
    Error: {
      Title: 'MSG_CREATE_ORDER',
      Message: 'MSG_CREATE_ORDER_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _order.createAppUserOrder(req, () => {
    // TODO
  })
}

export const createOrders = (req: order.CreateOrdersRequest, done?: (error: boolean, orders?: Array<order.Order>) => void) => {
  req.Message = {
    Error: {
      Title: 'MSG_CREATE_ORDERS',
      Message: 'MSG_CREATE_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _order.createOrders(req, done)
}

export const orders = () => _order.orders(AppID.value)
export const orderByID = (orderID: string) => _order.getOrderByEntID(orderID)
export const childOrders = (parentOrderID: string, paid?: boolean) => _order.orders(undefined, undefined, undefined, undefined, parentOrderID, paid)
export const orderPaymentDeadline = (orderID: string) => (orderByID(orderID)?.CreatedAt || 0) + order.OrderTimeoutSeconds
export const orderPaid = (orderID: string) => _order.orderPaid(orderByID(orderID)?.ID as number)
export const orderStartAt = (orderID: string) => orderByID(orderID)?.StartAt
export const orderEndAt = (orderID: string) => orderByID(orderID)?.EndAt
export const orderServicePeriod = (orderID: string) => utils.formatTime(orderStartAt(orderID) as number, 'YYYY/MM/DD HH:mm') + ' ~ ' + utils.formatTime(orderEndAt(orderID) as number, 'YYYY/MM/DD HH:mm')
export const orderStateStr = (orderID: string) => {
  const _order = orderByID(orderID)
  if (!_order) {
    return 'MSG_INVALID'
  }
  switch (_order.OrderState) {
    case order.OrderState.CREATED:
    case order.OrderState.WAIT_PAYMENT:
      return 'MSG_WAIT_PAYMENT'
    case order.OrderState.PAID:
    case order.OrderState.WAIT_START:
      return 'MSG_WAIT_START'
    case order.OrderState.IN_SERVICE:
      return 'MSG_IN_SERVICE'
    case order.OrderState.EXPIRED:
      return 'MSG_EXPIRED'
    case order.OrderState.PAYMENT_TIMEOUT:
      return 'MSG_PAYMENT_TIMEOUT'
    case order.OrderState.CANCELED:
      return 'MSG_CANCELED'
  }
}

export const orderCancelStateStr = (orderID: string) => {
  const _order = orderByID(orderID)
  if (!_order) {
    return 'MSG_INVALID'
  }
  if (_order.AdminSetCanceled) {
    return 'MSG_CANCELED_BY_ADMIN'
  }
  if (_order.UserSetCanceled) {
    return 'MSG_CANCELED_BY_USER'
  }
  switch (_order.CancelState) {
    case order.OrderState.PAYMENT_TIMEOUT:
      return 'MSG_TIMEOUT'
    default:
      return 'MSG_CANCELED_BY_USER'
  }
}

export const orderWaitPayment = (orderID: string) => {
  const _order = orderByID(orderID)
  if (!_order) {
    return false
  }
  switch (_order.OrderState) {
    case order.OrderState.CREATED:
    case order.OrderState.WAIT_PAYMENT:
      return true
  }
  return false
}

export const orderPayable = (orderID: string) => {
  const _order = orderByID(orderID)
  if (!_order) {
    return false
  }
  if (_order.CreateMethod !== order.OrderCreateMethod.OrderCreatedByPurchase) {
    return false
  }
  if (orderWaitPayment(orderID)) {
    if (orderPaymentDeadline(orderID) > Date.now() / 1000) {
      return true
    }
  }
  return false
}

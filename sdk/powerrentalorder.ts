import { powerrentalorder, notify, constant } from '..'
import { AppID } from './localapp'
import { OrderState, OrderTimeoutSeconds } from '../order'
import { remain } from '../utils'

const _powerRentalOrder = powerrentalorder.usePowerRentalOrderStore()

const getPagePowerRentalOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _powerRentalOrder.getPowerRentalOrders({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POWERRENTAL_ORDERS',
        Message: 'MSG_GET_POWERRENTAL_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<powerrentalorder.PowerRentalOrder>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPagePowerRentalOrders(++pageIndex, pageEnd, done)
  })
}

export const getPowerRentalOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPagePowerRentalOrders(pageStart, pages ? pageStart + pages : pages, done)
}

export const resetPowerRentalOrders = () => _powerRentalOrder.$reset()
const adminGetPagePowerRentalOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _powerRentalOrder.adminGetPowerRentalOrders({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POWERRENTAL_ORDERS',
        Message: 'MSG_GET_POWERRENTAL_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<powerrentalorder.PowerRentalOrder>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePowerRentalOrders(pageIndex + 1, pageEnd, done)
  })
}

export const adminGetPowerRentalOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePowerRentalOrders(pageStart, pages ? pageStart + pages : pages, done)
}

export const powerRentalOrders = (userID?: string) => _powerRentalOrder.powerRentalOrders(AppID.value, userID)
export const powerRentalOrder = (orderID: string) => powerRentalOrders().find((el) => el.OrderID === orderID)

export const validate = (orderID: string) => _powerRentalOrder.validate(orderID)

export const orderState = (orderID: string) => {
  const order = powerRentalOrder(orderID)
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

export const purchasedUnits = (appGoodID: string) => {
  let units = 0
  _powerRentalOrder.powerRentalOrders(undefined)?.forEach((el) => {
    if (el.AppGoodID === appGoodID) {
      units += Number(el.Units)
    }
  })
  return units
}

export const createPowerRentalOrder = (request: powerrentalorder.CreatePowerRentalOrderRequest, done?: (error: boolean, powerRentalOrder?: powerrentalorder.PowerRentalOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_POWERRENTAL_ORDERS',
      Message: 'MSG_CREATE_POWERRENTAL_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _powerRentalOrder.createPowerRentalOrder(request, done)
}

export const createUserPowerRentalOrder = (request: powerrentalorder.CreateUserPowerRentalOrderRequest, done?: (error: boolean, powerRentalOrder?: powerrentalorder.PowerRentalOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_POWERRENTAL_ORDERS',
      Message: 'MSG_CREATE_POWERRENTAL_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _powerRentalOrder.createUserPowerRentalOrder(request, done)
}

export const adminCreatePowerRentalOrder = (request: powerrentalorder.AdminCreatePowerRentalOrderRequest, done?: (error: boolean, powerRentalOrder?: powerrentalorder.PowerRentalOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_POWERRENTAL_ORDERS',
      Message: 'MSG_CREATE_POWERRENTAL_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _powerRentalOrder.adminCreatePowerRentalOrder(request, done)
}

const getPageMyPowerRentalOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _powerRentalOrder.getMyPowerRentalOrders({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POWERRENTAL_ORDERS',
        Message: 'MSG_GET_POWERRENTAL_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<powerrentalorder.PowerRentalOrder>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageMyPowerRentalOrders(pageIndex + 1, pageEnd, done)
  })
}

export const getMyPowerRentalOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageMyPowerRentalOrders(pageStart, pages ? pageStart + pages : pages, done)
}

export const getPowerRentalOrder = (orderId: string, done?: (error: boolean, powerRentalOrder?: powerrentalorder.PowerRentalOrder) => void) => {
  _powerRentalOrder.getPowerRentalOrder({
    OrderID: orderId
  }, done)
}

export const updatePowerRentalOrder = (target: powerrentalorder.PowerRentalOrder, paid?: boolean, canceled?: boolean, done?: (error: boolean, powerRentalOrder?: powerrentalorder.PowerRentalOrder) => void) => {
  _powerRentalOrder.updatePowerRentalOrder({
    ID: target.ID,
    EntID: target.EntID,
    OrderID: target.OrderID,
    Balances: [],
    Paid: paid,
    Canceled: canceled
  }, done)
}

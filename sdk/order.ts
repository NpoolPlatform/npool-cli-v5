import { computed } from 'vue'
import { order, notify, constant } from '../'
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

export const orders = computed(() => _order.orders(AppID.value))
export const orderByID = (orderID: string) => _order.getOrderByEntID(orderID)
export const childOrders = (parentOrderID: string, paid?: boolean) => _order.orders(undefined, undefined, undefined, undefined, parentOrderID, paid)

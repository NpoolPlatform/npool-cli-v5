import { computed } from 'vue'
import { order, notify, constant } from '../'
import { AppID } from './localapp'

const _order = order.useOrderStore()

const getPageOrders = (pageIndex: number, pageEnd: number, done: (error: boolean, totalPages: number, totalRows: number) => void) => {
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
    if (error || !orders?.length || pageIndex === pageEnd) {
      const totalPages = total as number / constant.DefaultPageSize + (total as number % constant.DefaultPageSize) ? 1 : 0
      done(error, totalPages, total as number)
      return
    }
    getPageOrders(++pageIndex, pageEnd, done)
  })
}

export const getOrders = (pageStart: number, pages: number, done: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageOrders(pageStart, pageStart + pages, done)
}

const getPageNAppOrders = (pageIndex: number, pageEnd: number, done: (error: boolean, totalPages: number, totalRows: number) => void) => {
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
    if (error || !orders?.length || pageIndex === pageEnd) {
      const totalPages = total as number / constant.DefaultPageSize + (total as number % constant.DefaultPageSize) ? 1 : 0
      done(error, totalPages, total as number)
      return
    }
    getPageOrders(++pageIndex, pageEnd, done)
  })
}

export const getNAppOrders = (pageStart: number, pages: number, done: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageNAppOrders(pageStart, pageStart + pages, done)
}

export const orders = computed(() => _order.orders(AppID.value))

export const updateAppUserOrder = (id: string, canceled: boolean) => {
  const targetOrder = _order.order(id)
  if (!targetOrder) {
    return
  }
  _order.updateAppUserOrder({
    TargetAppID: AppID.value,
    ID: id,
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

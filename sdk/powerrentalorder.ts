import { computed } from 'vue'
import { powerrentalorder, notify, constant } from '..'
import { AppID } from './localapp'

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

export const powerRentalOrders = computed(() => _powerRentalOrder.powerRentalOrders(AppID.value))
export const powerRentalOrder = (orderID: string) => powerRentalOrders.value.find((el) => el.OrderID === orderID)

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

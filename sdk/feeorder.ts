import { computed } from 'vue'
import { feeorder, notify, constant } from '..'
import { AppID } from './localapp'

const _feeOrder = feeorder.useFeeOrderStore()

const getPageFeeOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _feeOrder.getFeeOrders({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_FEE_ORDERS',
        Message: 'MSG_GET_FEE_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<feeorder.FeeOrder>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageFeeOrders(++pageIndex, pageEnd, done)
  })
}

export const getFeeOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageFeeOrders(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageFeeOrders = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _feeOrder.adminGetFeeOrders({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_FEE_ORDERS',
        Message: 'MSG_GET_FEE_ORDERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<feeorder.FeeOrder>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageFeeOrders(pageIndex + 1, pageEnd, done)
  })
}

export const adminGetFeeOrders = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageFeeOrders(pageStart, pages ? pageStart + pages : pages, done)
}

export const feeOrders = computed(() => _feeOrder.feeOrders(AppID.value))
export const feeOrder = (orderID: string) => feeOrders.value.find((el) => el.OrderID === orderID)

export const createFeeOrder = (request: feeorder.CreateFeeOrderRequest, done?: (error: boolean, feeOrder?: feeorder.FeeOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_FEE_ORDERS',
      Message: 'MSG_CREATE_FEE_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _feeOrder.createFeeOrder(request, done)
}

export const createUserFeeOrder = (request: feeorder.CreateUserFeeOrderRequest, done?: (error: boolean, feeOrder?: feeorder.FeeOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_FEE_ORDERS',
      Message: 'MSG_CREATE_FEE_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _feeOrder.createUserFeeOrder(request, done)
}

export const adminCreateFeeOrder = (request: feeorder.AdminCreateFeeOrderRequest, done?: (error: boolean, feeOrder?: feeorder.FeeOrder) => void) => {
  request.Message = {
    Error: {
      Title: 'MSG_CREATE_FEE_ORDERS',
      Message: 'MSG_CREATE_FEE_ORDERS_FAIL',
      Popup: true,
      Type: notify.NotifyType.Error
    }
  }
  _feeOrder.adminCreateFeeOrder(request, done)
}

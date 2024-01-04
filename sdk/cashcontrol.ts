import { cashcontrol, constant, notify } from '..'
import { AppID } from './localapp'
const _cashcontrol = cashcontrol.useCashControlStore()

const getPageCashControls = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _cashcontrol.getCashControls({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPON_COINS',
        Message: 'MSG_GET_COUPON_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<cashcontrol.CashControl>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCashControls(++pageIndex, pageEnd, done)
  })
}

export const getCashControls = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCashControls(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageAppCashControls = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _cashcontrol.getAppCashControls({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPON_COINS',
        Message: 'MSG_GET_COUPON_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<cashcontrol.CashControl>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCashControls(++pageIndex, pageEnd, done)
  })
}

export const getAppCashControls = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCashControls(pageStart, pages ? pageStart + pages : pages, done)
}

export const createCashControl = (target: cashcontrol.CashControl, finish: (error: boolean) => void) => {
  _cashcontrol.createCashControl({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COUPON_COIN',
        Message: 'MSG_CREATE_COUPON_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COUPON_COIN',
        Message: 'MSG_CREATE_COUPON_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteCashControl = (target: cashcontrol.CashControl, finish: (error: boolean) => void) => {
  _cashcontrol.deleteCashControl({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COUPON_COIN',
        Message: 'MSG_DELETE_COUPON_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COUPON_COIN',
        Message: 'MSG_DELETE_COUPON_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

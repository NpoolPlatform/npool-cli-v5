import { computed } from 'vue'
import { appgood, constant, notify, order } from '..'
import { AppID } from './localapp'
import { formalizeUserID } from '../appuser/user'

const _appgood = appgood.useAppGoodStore()
const _order = order.useOrderStore()

const getPageAppGoods = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _appgood.getAppGoods({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COUNTRIES',
        Message: 'MSG_GET_APP_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgood.Good>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageAppGoods(offset, limit, ++pageIndex, done)
  })
}

export const getAppGoods = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageAppGoods(offset, limit, 0, done)
}

const getNPageAppGoods = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _appgood.getNAppGoods({
    TargetAppID: AppID.value,
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COUNTRIES',
        Message: 'MSG_GET_APP_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgood.Good>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageAppGoods(offset, limit, ++pageIndex, done)
  })
}

export const getNAppGoods = (offset: number, limit: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageAppGoods(offset, limit, 0, done)
}

export const appGoods = computed(() => _appgood.goods(AppID.value))
export const appGoodCancelable = (appGoodID: string) => _appgood.cancelable(AppID.value, appGoodID)

export const appGoodPurchaseLimit = (appGoodID: string) => {
  const goodPurchaseLimit = _appgood.purchaseLimit(undefined, appGoodID)
  if (goodPurchaseLimit <= 0) {
    return 0
  }
  const _appGood = _appgood.good(undefined, appGoodID)
  if (!_appGood) {
    return 0
  }
  let units = 0
  _order.orders(undefined, formalizeUserID(), appGoodID).filter((el) => el.OrderState !== order.OrderState.CANCELED).forEach((el) => {
    units += Number(el.Units)
  })
  return Math.max(Math.min(Number(_appGood.MaxUserAmount) - units, goodPurchaseLimit), 0)
}

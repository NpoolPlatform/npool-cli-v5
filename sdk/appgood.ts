import { computed } from 'vue'
import { appgood, constant, notify, order } from '..'
import { AppID } from './localapp'
import { formalizeUserID } from '../appuser/user'

const _appgood = appgood.useAppGoodStore()
const _order = order.useOrderStore()

const getPageAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appgood.getAppGoods({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOODS',
        Message: 'MSG_GET_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appgood.Good>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppGoods(++pageIndex, pageEnd, done)
  })
}

export const getAppGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const getNPageAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appgood.getNAppGoods({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOODS',
        Message: 'MSG_GET_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appgood.Good>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getNPageAppGoods(++pageIndex, pageEnd, done)
  })
}

export const getNAppGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageAppGoods(pageStart, pages ? pageStart + pages : pages, done)
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

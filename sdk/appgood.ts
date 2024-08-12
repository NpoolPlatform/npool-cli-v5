import { computed } from 'vue'
import { appgood, constant, goodbase, notify } from '..'
import { AppID } from './localapp'

const _appGood = appgood.useAppGoodStore()

const getPageAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appGood.getAppGoods({
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

const adminGetPageAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appGood.adminGetAppGoods({
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
    adminGetPageAppGoods(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const appGoods = computed(() => _appGood.goods(AppID.value))
export const appGoodsWithGoodTypes = (goodTypes: goodbase.GoodType[]) => appGoods.value.filter((el) => goodTypes.includes(el.GoodType))
export const appGood = (appGoodID: string) => appGoods.value.find((el) => el.EntID === appGoodID)
export const appGoodDisplayName = (appGoodID: string, index: number) => appGood(appGoodID)?.DisplayNames[index] || appGood(appGoodID)?.AppGoodName || ''

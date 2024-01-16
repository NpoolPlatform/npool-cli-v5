import { computed } from 'vue'
import { appgood, constant, notify } from '..'
import { AppID } from './localapp'

const _appgood = appgood.useAppGoodStore()

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
export const appGoodCancelable = (id: string) => _appgood.cancelable(AppID.value, id)

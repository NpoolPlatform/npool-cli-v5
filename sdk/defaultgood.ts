import { computed } from 'vue'
import { appdefaultgood, constant, notify } from '..'
import { AppID } from './localapp'

const defaultgood = appdefaultgood.useAppDefaultGoodStore()

const getPageDefaultGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  defaultgood.getAppDefaultGoods({
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
  }, (error: boolean, orders?: Array<appdefaultgood.Default>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDefaultGoods(++pageIndex, pageEnd, done)
  })
}

export const getDefaultGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDefaultGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const getNPageDefaultGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  defaultgood.getNAppDefaultGoods({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DEFAULT_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appdefaultgood.Default>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getNPageDefaultGoods(++pageIndex, pageEnd, done)
  })
}

export const getNDefaultGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageDefaultGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const defaultGoods = computed(() => defaultgood.defaults(AppID.value))

export const updateNDefaultGood = (target: appdefaultgood.Default) => {
  defaultgood.updateNAppDefaultGood({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_DEFAULT_GOOD',
        Message: 'MSG_UPDATE_APP_DEFAULT_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_DEFAULT_GOOD',
        Message: 'MSG_UPDATE_APP_DEFAULT_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

export const createNDefaultGood = (target: appdefaultgood.Default) => {
  defaultgood.createNAppDefaultGood({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_DEFAULT_GOOD',
        Message: 'MSG_CREATE_APP_DEFAULT_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_DEFAULT_GOOD',
        Message: 'MSG_CREATE_APP_DEFAULT_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

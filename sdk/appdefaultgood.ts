import { computed } from 'vue'
import { appdefaultgood, constant, notify } from '..'
import { AppID } from './localapp'

const appDefaultGood = appdefaultgood.useDefaultStore()

const getPageAppDefaultGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appDefaultGood.getDefaults({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DEFAULT_GOODS',
        Message: 'MSG_GET_APP_DEFAULT_GOODS_FAIL',
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
    getPageAppDefaultGoods(++pageIndex, pageEnd, done)
  })
}

export const getAppDefaultGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppDefaultGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppDefaultGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appDefaultGood.adminGetDefaults({
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
    adminGetPageAppDefaultGoods(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppDefaultGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppDefaultGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const appDefaultGoods = computed(() => appDefaultGood.defaults(AppID.value))
export const coinDefaultAppGoodIDWithUnit = (coinUnit: string) => appDefaultGoods.value.find((el) => el.CoinUnit === coinUnit)?.AppGoodID

export const adminUpdateAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.adminUpdateDefault({
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
  }, done)
}

export const updateAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.updateDefault({
    ...target,
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
  }, done)
}

export const adminCreateAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.adminCreateDefault({
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
  }, done)
}

export const createAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.createDefault({
    ...target,
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
  }, done)
}

export const adminDeleteAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.adminDeleteDefault({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_DEFAULT_GOOD',
        Message: 'MSG_DELETE_APP_DEFAULT_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_APP_DEFAULT_GOOD',
        Message: 'MSG_DELETE_APP_DEFAULT_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteAppDefaultGood = (target: appdefaultgood.Default, done?: (error: boolean, defautle?: appdefaultgood.Default) => void) => {
  appDefaultGood.deleteDefault({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_DEFAULT_GOOD',
        Message: 'MSG_DELETE_APP_DEFAULT_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_APP_DEFAULT_GOOD',
        Message: 'MSG_DELETE_APP_DEFAULT_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

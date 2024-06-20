import { computed } from 'vue'
import { appcoin, constant, notify } from '..'
import { AppID } from './localapp'

const _appCoin = appcoin.useAppCoinStore()

const getPageAppCoins = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appCoin.getAppCoins({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COINS',
        Message: 'MSG_GET_APP_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appcoin.AppCoin>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCoins(++pageIndex, pageEnd, done)
  })
}

export const getAppCoins = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCoins(pageStart, pages ? pageStart + pages : pages, done)
}

export const appCoins = computed(() => _appCoin.coins(AppID.value))

export const adminCreateAppCoin = (appCoin: appcoin.AppCoin, done?: (error: boolean, appCoin?: appcoin.AppCoin) => void) => {
  _appCoin.createAppCoin({
    ...appCoin,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_COIN',
        Message: 'MSG_CREATE_APP_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppCoin = (appCoin: appcoin.AppCoin, done?: (error: boolean, appCoin?: appcoin.AppCoin) => void) => {
  _appCoin.deleteAppCoin({
    ...appCoin,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_COIN',
        Message: 'MSG_DELETE_APP_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

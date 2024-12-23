import { computed } from 'vue'
import { apppledge, constant, goodbase, notify, order, utils } from '..'
import { AppID } from './localapp'
import { formalizeUserID } from '../appuser/user/local'
import { date } from 'quasar'
import { GoodType } from '../good/base'

const _appPledge = apppledge.useAppPledgeStore()

const getPageAppPledges = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appPledge.getAppPledges({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_PLEDGES',
        Message: 'MSG_GET_APP_PLEDGES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppledge.AppPledge>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppPledges(++pageIndex, pageEnd, done)
  })
}

export const getAppPledges = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppPledges(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppPledges = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appPledge.adminGetAppPledges({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_PLEDGES',
        Message: 'MSG_GET_APP_PLEDGES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppledge.AppPledge>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppPledges(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppPledges = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppPledges(pageStart, pages ? pageStart + pages : pages, done)
}

export const getAppPledge = (appGoodID: string, done?: (error: boolean) => void) => {
  _appPledge.getAppPledge({
    AppGoodID: appGoodID,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_PLEDGE',
        Message: 'MSG_GET_APP_PLEDGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}

export const appPledges = computed(() => _appPledge.appPledges(AppID.value).sort((a, b) => a.ID > b.ID ? -1 : 1))
export const appPledge = (appGoodId: string) => appPledges.value.find((el) => el.AppGoodID === appGoodId)

export const onlineAppPledges = computed(() => appPledges.value.filter((el) => el.GoodOnline && el.AppGoodOnline))
export const purchasableAppPledges = computed(() => onlineAppPledges.value.filter((el) => el.GoodPurchasable && el.AppGoodPurchasable))
export const visible = (appGoodID: string) => appPledge(appGoodID)?.Visible
export const canBuy = (appGoodID: string) => {
  const _appPledge = appPledge(appGoodID)
  if (!_appPledge) {
    return false
  }
  return _appPledge?.AppGoodOnline && _appPledge.GoodOnline
}
export const displayName = (appGoodID: string, index: number) => appPledge(appGoodID)?.DisplayNames?.find((el) => el.Index === index)?.Name || appPledge(appGoodID)?.AppGoodName || ''
export const enableSetCommission = (appGoodID: string) => appPledge(appGoodID)?.EnableSetCommission
export const displayColor = (appGoodID: string, index: number) => appPledge(appGoodID)?.DisplayColors?.find(el => el.Index === index)?.Color || ''
export const description = (appGoodID: string, index: number) => appPledge(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description || ''
export const requireDescription = (appGoodID: string, index: number) => appPledge(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description
export const enableProductPage = (appGoodID: string) => appPledge(appGoodID)?.EnableProductPage
export const showProductPage = (appGoodID: string) => enableProductPage(appGoodID) && canBuy(appGoodID)
export const mainCoinTypeID = (appGoodID: string) => appPledge(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinTypeID
export const mainCoinUnit = (appGoodID: string) => appPledge(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinUnit
export const mainCoinName = (appGoodID: string) => appPledge(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinName
export const mainCoinLogo = (appGoodID: string) => appPledge(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinLogo
export const coinEnv = (appGoodID: string) => appPledge(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinENV
export const purchasable = (appGoodID: string) => appPledge(appGoodID)?.GoodPurchasable && appPledge(appGoodID)?.AppGoodPurchasable
export const enablePurchase = (appGoodID: string) => purchasable(appGoodID) && canBuy(appGoodID)

export const adminCreateAppPledge = (target: apppledge.AppPledge, done?: (error: boolean, appPledge?: apppledge.AppPledge) => void) => {
  _appPledge.adminCreateAppPledge({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    StartMode: target?.GoodStartMode,
    Online: target.AppGoodOnline,
    Purchasable: target.AppGoodPurchasable,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_PLEDGE',
        Message: 'MSG_CREATE_APP_PLEDGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateAppPledge = (target: apppledge.AppPledge, done?: (error: boolean, appPledge?: apppledge.AppPledge) => void) => {
  _appPledge.adminUpdateAppPledge({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    StartMode: target?.GoodStartMode,
    Online: target.AppGoodOnline,
    Purchasable: target.AppGoodPurchasable,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_PLEDGE',
        Message: 'MSG_CREATE_APP_PLEDGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppPledge = (target: apppledge.AppPledge, done?: (error: boolean, appPledge?: apppledge.AppPledge) => void) => {
  _appPledge.adminDeleteAppPledge({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_PLEDGE',
        Message: 'MSG_DELETE_APP_PLEDGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const updateAppPledge = (target: apppledge.AppPledge, done?: (error: boolean, appPledge?: apppledge.AppPledge) => void) => {
  _appPledge.updateAppPledge({
    ...target,
    Name: target.AppGoodName,
    Purchasable: target.AppGoodPurchasable,
    StartMode: target?.GoodStartMode,
    Online: target.AppGoodOnline,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_PLEDGE',
        Message: 'MSG_UPDATE_APP_PLEDGE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

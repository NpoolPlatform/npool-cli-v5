import { computed } from 'vue'
import { appdelegatedstaking, constant, notify } from '..'
import { AppID } from './localapp'

const _appDelegatedStaking = appdelegatedstaking.useAppDelegatedStakingStore()

const getPageAppDelegatedStakings = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appDelegatedStaking.getAppDelegatedStakings({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DELEGATEDSTAKINGS',
        Message: 'MSG_GET_APP_DELEGATEDSTAKINGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appdelegatedstaking.AppDelegatedStaking>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppDelegatedStakings(++pageIndex, pageEnd, done)
  })
}

export const getAppDelegatedStakings = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppDelegatedStakings(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppDelegatedStakings = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appDelegatedStaking.adminGetAppDelegatedStakings({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DELEGATEDSTAKINGS',
        Message: 'MSG_GET_APP_DELEGATEDSTAKINGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appdelegatedstaking.AppDelegatedStaking>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppDelegatedStakings(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppDelegatedStakings = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppDelegatedStakings(pageStart, pages ? pageStart + pages : pages, done)
}

export const getAppDelegatedStaking = (appGoodID: string, done?: (error: boolean) => void) => {
  _appDelegatedStaking.getAppDelegatedStaking({
    AppGoodID: appGoodID,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DELEGATEDSTAKING',
        Message: 'MSG_GET_APP_DELEGATEDSTAKING_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}

export const appDelegatedStakings = computed(() => _appDelegatedStaking.appDelegatedStakings(AppID.value).sort((a, b) => a.ID > b.ID ? -1 : 1))
export const appDelegatedStaking = (appGoodId: string) => appDelegatedStakings.value.find((el) => el.AppGoodID === appGoodId)

export const onlineAppDelegatedStakings = computed(() => appDelegatedStakings.value.filter((el) => el.GoodOnline && el.AppGoodOnline))
export const purchasableAppDelegatedStakings = computed(() => onlineAppDelegatedStakings.value.filter((el) => el.GoodPurchasable && el.AppGoodPurchasable))
export const visible = (appGoodID: string) => appDelegatedStaking(appGoodID)?.Visible
export const canBuy = (appGoodID: string) => {
  const _appDelegatedStaking = appDelegatedStaking(appGoodID)
  if (!_appDelegatedStaking) {
    return false
  }
  return _appDelegatedStaking?.AppGoodOnline && _appDelegatedStaking.GoodOnline
}
export const displayName = (appGoodID: string, index: number) => appDelegatedStaking(appGoodID)?.DisplayNames?.find((el) => el.Index === index)?.Name || appDelegatedStaking(appGoodID)?.AppGoodName || ''
export const enableSetCommission = (appGoodID: string) => appDelegatedStaking(appGoodID)?.EnableSetCommission
export const displayColor = (appGoodID: string, index: number) => appDelegatedStaking(appGoodID)?.DisplayColors?.find(el => el.Index === index)?.Color || ''
export const description = (appGoodID: string, index: number) => appDelegatedStaking(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description || ''
export const requireDescription = (appGoodID: string, index: number) => appDelegatedStaking(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description
export const enableProductPage = (appGoodID: string) => appDelegatedStaking(appGoodID)?.EnableProductPage
export const showProductPage = (appGoodID: string) => enableProductPage(appGoodID) && canBuy(appGoodID)
export const mainCoinTypeID = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinTypeID
export const mainCoinUnit = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinUnit
export const mainCoinName = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinName
export const mainCoinLogo = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinLogo
export const coinEnv = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinENV
export const purchasable = (appGoodID: string) => appDelegatedStaking(appGoodID)?.GoodPurchasable && appDelegatedStaking(appGoodID)?.AppGoodPurchasable
export const enablePurchase = (appGoodID: string) => purchasable(appGoodID) && canBuy(appGoodID)

export const adminCreateAppDelegatedStaking = (target: appdelegatedstaking.AppDelegatedStaking, done?: (error: boolean, appDelegatedStaking?: appdelegatedstaking.AppDelegatedStaking) => void) => {
  _appDelegatedStaking.adminCreateAppDelegatedStaking({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    StartMode: target?.AppGoodStartMode,
    Online: target.AppGoodOnline,
    Purchasable: target.AppGoodPurchasable,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_DELEGATEDSTAKING',
        Message: 'MSG_CREATE_APP_DELEGATEDSTAKING_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateAppDelegatedStaking = (target: appdelegatedstaking.AppDelegatedStaking, done?: (error: boolean, appDelegatedStaking?: appdelegatedstaking.AppDelegatedStaking) => void) => {
  _appDelegatedStaking.adminUpdateAppDelegatedStaking({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    StartMode: target?.AppGoodStartMode,
    Online: target.AppGoodOnline,
    Purchasable: target.AppGoodPurchasable,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_DELEGATEDSTAKING',
        Message: 'MSG_CREATE_APP_DELEGATEDSTAKING_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppDelegatedStaking = (target: appdelegatedstaking.AppDelegatedStaking, done?: (error: boolean, appDelegatedStaking?: appdelegatedstaking.AppDelegatedStaking) => void) => {
  _appDelegatedStaking.adminDeleteAppDelegatedStaking({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_DELEGATEDSTAKING',
        Message: 'MSG_DELETE_APP_DELEGATEDSTAKING_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const updateAppDelegatedStaking = (target: appdelegatedstaking.AppDelegatedStaking, done?: (error: boolean, appDelegatedStaking?: appdelegatedstaking.AppDelegatedStaking) => void) => {
  _appDelegatedStaking.updateAppDelegatedStaking({
    ...target,
    Name: target.AppGoodName,
    Purchasable: target.AppGoodPurchasable,
    StartMode: target?.GoodStartMode,
    Online: target.AppGoodOnline,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DELEGATEDSTAKING',
        Message: 'MSG_UPDATE_APP_DELEGATEDSTAKING_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

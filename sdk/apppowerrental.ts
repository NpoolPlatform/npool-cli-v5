import { computed } from 'vue'
import { apppowerrental, constant, goodbase, notify } from '..'
import { AppID } from './localapp'

const _appPowerRental = apppowerrental.useAppPowerRentalStore()

const getPageAppPowerRentals = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appPowerRental.getAppPowerRentals({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_POWERRENTALS',
        Message: 'MSG_GET_APP_POWERRENTALS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppowerrental.AppPowerRental>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppPowerRentals(++pageIndex, pageEnd, done)
  })
}

export const getAppPowerRentals = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppPowerRentals(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppPowerRentals = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appPowerRental.adminGetAppPowerRentals({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_POWERRENTALS',
        Message: 'MSG_GET_APP_POWERRENTALS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppowerrental.AppPowerRental>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppPowerRentals(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppPowerRentals = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppPowerRentals(pageStart, pages ? pageStart + pages : pages, done)
}

export const appPowerRentals = computed(() => _appPowerRental.appPowerRentals(AppID.value).sort((a, b) => a.ID > b.ID ? -1 : 1))
export const appPowerRental = (appGoodId: string) => appPowerRentals.value.find((el) => el.AppGoodID === appGoodId)
export const appPowerRentalMaxPurchasedUnits = (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental) return 0
  const stockUnits = Number(_appPowerRental.GoodSpotQuantity) - Number(_appPowerRental.AppGoodSpotQuantity)
  const maxOrderAmount = Number(_appPowerRental.MaxOrderAmount)
  const maxUserAmount = Number(_appPowerRental.MaxUserAmount)
  return Math.min(stockUnits, maxOrderAmount, maxUserAmount)
}
export const onlineAppPowerRentals = computed(() => appPowerRentals.value.filter((el) => el.GoodOnline && el.AppGoodOnline))
export const purchasableAppPowerRentals = computed(() => onlineAppPowerRentals.value.filter((el) => el.GoodPurchase && el.AppGoodPurchasable))
export const appPowerRentalCancelable = (appGoodId: string) => appPowerRental(appGoodId)?.CancelMode !== goodbase.CancelMode.Uncancellable
const getSpotQuantity = computed(() => (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  return Number(_appPowerRental?.GoodSpotQuantity) + Number(_appPowerRental?.AppGoodSpotQuantity)
})
export const spotQuantity = (appGoodID: string) => getSpotQuantity.value(appGoodID)
const getDisplayName = computed(() => (appGoodID: string, index: number) => appPowerRental(appGoodID)?.DisplayNames?.find(el => el.Index === index)?.Name || '')
export const displayName = (appGoodID: string, index: number) => getDisplayName.value(appGoodID, index)
const getDisplayColor = computed(() => (appGoodID: string, index: number) => appPowerRental(appGoodID)?.DisplayColors?.find(el => el.Index === index)?.Color || '')
export const displayColor = (appGoodID: string, index: number) => getDisplayColor.value(appGoodID, index)
const getDescription = computed(() => (appGoodID: string, index: number) => appPowerRental(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description || '')
export const description = (appGoodID: string, index: number) => getDescription.value(appGoodID, index)
const canBuy = computed(() => (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental) {
    return false
  }
  const now = Math.floor(Date.now() / 1000)
  if (_appPowerRental?.SaleEndAt === 0 || _appPowerRental?.SaleStartAt === 0 || now > _appPowerRental?.SaleEndAt || now < _appPowerRental?.SaleStartAt) {
    return false
  }
  if (!spotQuantity(appGoodID)) {
    return false
  }
  return _appPowerRental?.AppGoodOnline
})
export const buyable = (appGoodID: string) => canBuy.value(appGoodID)

export const adminCreateAppPowerRental = (target: apppowerrental.AppPowerRental, done?: (error: boolean, appPowerRental?: apppowerrental.AppPowerRental) => void) => {
  _appPowerRental.adminCreateAppPowerRental({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_POWERRENTAL',
        Message: 'MSG_CREATE_APP_POWERRENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateAppPowerRental = (target: apppowerrental.AppPowerRental, done?: (error: boolean, appPowerRental?: apppowerrental.AppPowerRental) => void) => {
  _appPowerRental.adminUpdateAppPowerRental({
    ...target,
    TargetAppID: AppID.value,
    Name: target.AppGoodName,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_POWERRENTAL',
        Message: 'MSG_CREATE_APP_POWERRENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppPowerRental = (target: apppowerrental.AppPowerRental, done?: (error: boolean, appPowerRental?: apppowerrental.AppPowerRental) => void) => {
  _appPowerRental.adminDeleteAppPowerRental({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_POWERRENTAL',
        Message: 'MSG_DELETE_APP_POWERRENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const updateAppPowerRental = (target: apppowerrental.AppPowerRental, done?: (error: boolean, appPowerRental?: apppowerrental.AppPowerRental) => void) => {
  _appPowerRental.updateAppPowerRental({
    ...target,
    MinOrderAmount: `${target.MinOrderAmount}`,
    MaxOrderAmount: `${target.MaxOrderAmount}`,
    MaxUserAmount: `${target.MaxUserAmount}`,
    UnitPrice: `${target.UnitPrice}`,
    Name: target.AppGoodName,
    Purchasable: target.AppGoodPurchasable,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_POWERRENTAL',
        Message: 'MSG_UPDATE_APP_POWERRENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

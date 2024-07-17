import { computed } from 'vue'
import { apppowerrental, constant, goodbase, notify, order } from '..'
import { AppID } from './localapp'
import { formalizeUserID } from '../appuser/user/local'
import { usePowerRentalOrderStore } from '../order/powerrental'
import { date } from 'quasar'
import { GoodType } from '../good/base'

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

export const getAppPowerRental = (appGoodID: string, done?: (error: boolean) => void) => {
  _appPowerRental.getAppPowerRental({
    AppGoodID: appGoodID,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_POWER_RENTAL',
        Message: 'MSG_GET_APP_POWER_RENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}

export const appPowerRentals = computed(() => _appPowerRental.appPowerRentals(AppID.value).sort((a, b) => a.ID > b.ID ? -1 : 1))
export const appPowerRental = (appGoodId: string) => appPowerRentals.value.find((el) => el.AppGoodID === appGoodId)
export const maxPurchasedUnits = (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental) return 0
  const stockUnits = Number(_appPowerRental.GoodSpotQuantity) - Number(_appPowerRental.AppGoodSpotQuantity)
  const maxOrderAmount = Number(_appPowerRental.MaxOrderAmount)
  const maxUserAmount = Number(_appPowerRental.MaxUserAmount)
  return Math.min(stockUnits, maxOrderAmount, maxUserAmount)
}
export const onlineAppPowerRentals = computed(() => appPowerRentals.value.filter((el) => el.GoodOnline && el.AppGoodOnline))
export const purchasableAppPowerRentals = computed(() => onlineAppPowerRentals.value.filter((el) => el.GoodPurchasable && el.AppGoodPurchasable))
export const cancelable = (appGoodId: string) => appPowerRental(appGoodId)?.CancelMode !== goodbase.CancelMode.Uncancellable
export const spotQuantity = (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  return Number(_appPowerRental?.GoodSpotQuantity) + Number(_appPowerRental?.AppGoodSpotQuantity)
}
export const visible = (appGoodID: string) => appPowerRental(appGoodID)?.Visible

const canBuy = (appGoodID: string) => {
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
  return _appPowerRental?.AppGoodOnline && _appPowerRental.GoodOnline
}

export const displayName = (appGoodID: string, index: number) => appPowerRental(appGoodID)?.DisplayNames?.find((el) => el.Index === index)?.Name || appPowerRental(appGoodID)?.AppGoodName
export const enableSetCommission = (appGoodID: string) => appPowerRental(appGoodID)?.EnableSetCommission
export const displayColor = (appGoodID: string, index: number) => appPowerRental(appGoodID)?.DisplayColors?.find(el => el.Index === index)?.Color || ''
export const description = (appGoodID: string, index: number) => appPowerRental(appGoodID)?.Descriptions?.find(el => el.Index === index)?.Description || '*'
export const enableProductPage = (appGoodID: string) => appPowerRental(appGoodID)?.EnableProductPage
export const showProductPage = (appGoodID: string) => enableProductPage(appGoodID) && canBuy(appGoodID) && spotQuantity(appGoodID)
export const maxOrderDurationSeconds = (appGoodID: string) => appPowerRental(appGoodID)?.MaxOrderDurationSeconds
export const minOrderDurationSeconds = (appGoodID: string) => appPowerRental(appGoodID)?.MinOrderDurationSeconds
export const durationDisplayType = (appGoodID: string) => appPowerRental(appGoodID)?.DurationDisplayType
export const unitPrice = (appGoodID: string) => appPowerRental(appGoodID)?.UnitPrice
export const unitPriceFloat = (appGoodID: string) => Number(unitPrice(appGoodID) || 0)
export const mainCoinTypeID = (appGoodID: string) => appPowerRental(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinTypeID
export const mainCoinUnit = (appGoodID: string) => appPowerRental(appGoodID)?.GoodCoins?.find(el => el.Main)?.CoinUnit

export const techniqueFeeRatio = (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental) {
    return 0
  }
  switch (_appPowerRental.GoodType) {
    case GoodType.LegacyPowerRental:
      return Number(_appPowerRental.TechniqueFeeRatio)
    case GoodType.PowerRental:
      return Number(_appPowerRental.Requireds.find(el => el.RequiredGoodType === GoodType.TechniqueServiceFee)?.RequiredAppGoodUnitValue)
  }
  return 0
}

const getPricePresentString = computed(() => (appGoodID: string) => Number(appPowerRental(appGoodID)?.UnitPrice).toFixed(4))
export const priceString = (appGoodID: string) => getPricePresentString.value(appGoodID)

const getSaleEndDate = computed(() => (appGoodID: string, format?: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental?.SaleEndAt) {
    return '*'
  }
  return date.formatDate(_appPowerRental?.SaleEndAt * 1000, format || 'YYYY/MM/DD')
})
export const saleEndDate = (appGoodID: string, format?: string) => {
  return getSaleEndDate.value(appGoodID, format)
}
const getSaleEndTime = computed(() => (appGoodID: string, format?: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental?.SaleEndAt) {
    return '*'
  }
  return date.formatDate((_appPowerRental?.SaleEndAt + 60 * new Date().getTimezoneOffset() + 9 * 60 * 60) * 1000, format || 'HH:mm')
})
export const saleEndTime = (appGoodID: string, format?: string) => {
  return getSaleEndTime.value(appGoodID, format)
}

const powerRentalOrder = usePowerRentalOrderStore()

export const purchaseLimit = (appGoodID: string) => {
  const goodPurchaseLimit = _appPowerRental.purchaseLimit(undefined, appGoodID)
  if (goodPurchaseLimit <= 0) {
    return 0
  }
  const __appPowerRental = appPowerRental(appGoodID)
  if (!__appPowerRental) {
    return 0
  }
  let units = 0
  const userID = formalizeUserID()
  powerRentalOrder.powerRentalOrders().filter((el) => el.UserID === userID && el.OrderState !== order.OrderState.CANCELED).forEach((el) => {
    units += Number(el.Units)
  })
  return Math.max(Math.min(Number(__appPowerRental.MaxUserAmount) - units, goodPurchaseLimit), 0)
}

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

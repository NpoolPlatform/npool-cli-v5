import { computed } from 'vue'
import { apppowerrental, constant, notify } from '..'
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

export const appPowerRentals = computed(() => _appPowerRental.goods(AppID.value))
export const appPowerRental = (appGoodID: string) => appPowerRentals.value.find((el) => el.AppGoodID === appGoodID)
export const appPowerRentalMaxPurchasedUnits = (appGoodID: string) => {
  const _appPowerRental = appPowerRental(appGoodID)
  if (!_appPowerRental) return 0
  const stockUnits = Number(_appPowerRental.GoodSpotQuantity) - Number(_appPowerRental.AppGoodSpotQuantity)
  const maxOrderAmount = Number(_appPowerRental.MaxOrderAmount)
  const maxUserAmount = Number(_appPowerRental.MaxUserAmount)
  return Math.min(stockUnits, maxOrderAmount, maxUserAmount)
}

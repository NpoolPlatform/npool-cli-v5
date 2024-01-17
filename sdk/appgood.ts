import { computed } from 'vue'
import { appgood, constant, notify, appcoin, vendorbrand, deviceinfo, goodbase, topmostgood, requiredgood } from '..'
import { AppID } from './localapp'

const _appgood = appgood.useAppGoodStore()
const _appcoin = appcoin.useAppCoinStore()
const _vendorbrand = vendorbrand.useVendorBrandStore()
const _deviceinfo = deviceinfo.useDeviceInfoStore()
const _topmostgood = topmostgood.useTopMostGoodStore()
const _requiredgood = requiredgood.useRequiredStore()

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
        Title: 'MSG_GET_APP_GOODS',
        Message: 'MSG_GET_APP_GOODS_FAIL',
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
        Title: 'MSG_GET_APP_GOODS',
        Message: 'MSG_GET_APP_GOODS_FAIL',
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
export const appGood = (appGoodID: string) => _appgood.good(undefined, appGoodID)
export const appGoodCancelable = (id: string) => _appgood.cancelable(AppID.value, id)
export const appGoodCoins = computed(() => _appcoin.coins(undefined).filter((el) => appGoods.value.findIndex((el1) => el.CoinTypeID === el1.CoinTypeID) >= 0))
export const appGoodVendorBrands = computed(() => _vendorbrand.vendorBrands().filter((el) => appGoods.value.findIndex((el1) => el.Name === el1.VendorBrandName) >= 0))
export const appGoodDeviceInfos = computed(() => _deviceinfo.deviceInfos().filter((el) => appGoods.value.findIndex((el1) => el.Type === el1.DeviceType) >= 0))
export const appGoodName = (appGoodID: string, index: number) => _appgood.displayName(undefined, appGoodID, index)
export const appGoodQuantityUnitAmount = (appGoodID: string) => appGood(appGoodID)?.QuantityUnitAmount
export const appGoodQuantityUnit = (appGoodID: string) => appGood(appGoodID)?.QuantityUnit as string

export const appGoodDuration = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (_appGood?.MinOrderDuration === _appGood?.MaxOrderDuration) {
    return _appGood?.MinOrderDuration
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return _appGood?.MinOrderDuration.toString() + '~' + _appGood?.MaxOrderDuration.toString()
}

export const appGoodUnitDuration = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (_appGood?.MinOrderDuration === _appGood?.MaxOrderDuration) {
    return _appGood?.MinOrderDuration || 1
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return 1
}

export const appGoodDurationUnit = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  switch (_appGood?.DurationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      return appGoodUnitDuration(appGoodID) === 1 ? 'MSG_HOUR' : 'MSG_HOURS'
    case goodbase.GoodDurationType.GoodDurationByDay:
      return appGoodUnitDuration(appGoodID) === 1 ? 'MSG_DAY' : 'MSG_DAYS'
    case goodbase.GoodDurationType.GoodDurationByMonth:
      return appGoodUnitDuration(appGoodID) === 1 ? 'MSG_MONTH' : 'MSG_MONTHS'
    case goodbase.GoodDurationType.GoodDurationByYear:
      return appGoodUnitDuration(appGoodID) === 1 ? 'MSG_YEAR' : 'MSG_YEARS'
  }
  return appGoodUnitDuration(appGoodID) === 1 ? 'MSG_DAY' : 'MSG_DAYS'
}

export const appGoodUnitDurationUnit = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  switch (_appGood?.DurationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      return 'MSG_HOUR'
    case goodbase.GoodDurationType.GoodDurationByDay:
      return 'MSG_DAY'
    case goodbase.GoodDurationType.GoodDurationByMonth:
      return 'MSG_MONTH'
    case goodbase.GoodDurationType.GoodDurationByYear:
      return 'MSG_YEAR'
  }
  return 'MSG_DAY'
}

export const appGoodMultipleDurationUnit = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  switch (_appGood?.DurationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      return 'MSG_HOURS'
    case goodbase.GoodDurationType.GoodDurationByDay:
      return 'MSG_DAYS'
    case goodbase.GoodDurationType.GoodDurationByMonth:
      return 'MSG_MONTHS'
    case goodbase.GoodDurationType.GoodDurationByYear:
      return 'MSG_YEARS'
  }
  return 'MSG_DAYS'
}

export const appGoodOriginalUnitPrice = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (_appGood?.PackagePrice?.length && Number(_appGood?.PackagePrice) > 0) {
    return _appGood.PackagePrice
  }
  if (_appGood?.UnitPrice?.length && Number(_appGood?.UnitPrice) > 0) {
    return _appGood.UnitPrice
  }
  return '9999999999.999999'
}

export const appGoodUnitPrice = (appGoodID: string) => {
  const topMostGoods = _topmostgood.topmostgoods(undefined, undefined, appGoodID)
  let packagePrice = 0
  let unitPrice = 0

  topMostGoods.forEach((el) => {
    if (el.PackagePrice.length && (packagePrice === 0 || Number(el.PackagePrice) > packagePrice)) {
      packagePrice = Number(el.PackagePrice)
    }
    if (el.UnitPrice.length && (unitPrice === 0 || Number(el.UnitPrice) > unitPrice)) {
      unitPrice = Number(el.UnitPrice)
    }
  })
  if (packagePrice > 0) {
    return packagePrice
  }
  if (unitPrice > 0) {
    return unitPrice
  }

  return appGoodOriginalUnitPrice(appGoodID)
}

export const appGoodRequiredAppGoods = (appGoodID: string, requiredTypes: goodbase.GoodType[]) => {
  const _appGood = appGood(appGoodID)
  const _requiredGoods = computed(() => _requiredgood.requireds(_appGood?.GoodID))
  return _appgood.goods(undefined, undefined, undefined, _requiredGoods.value?.map((el) => el.RequiredGoodID) || []).filter((el) => {
    if (requiredTypes.length === 0) {
      return true
    }
    let ok = true
    requiredTypes.forEach((el1) => {
      ok ||= el1 === el.GoodType
    })
    return ok
  }).slice(0, 2)
}

export const appGoodEstimatedUnitDailyReward = (appGoodID: string) => appGood(appGoodID)?.LastUnitRewardAmount
export const appGoodSoldPercent = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!Number(_appGood?.GoodTotal)) {
    return 0
  }
  return (Number(_appGood?.GoodTotal) - Number(_appGood?.GoodSpotQuantity)) / Number(_appGood?.GoodTotal)
}

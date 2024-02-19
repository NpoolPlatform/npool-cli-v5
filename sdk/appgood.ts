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

export const getAppGood = (appGoodID: string, done?: (error: boolean, good?: appgood.Good) => void) => {
  _appgood.getAppGood({
    EntID: appGoodID,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_GOOD',
        Message: 'MSG_GET_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, good?: appgood.Good) => {
    done?.(error, good)
  })
}

export const appGoods = () => _appgood.goods(AppID.value)
export const appGood = (appGoodID: string) => _appgood.good(undefined, appGoodID)
export const appGoodCancelable = (id: string) => _appgood.cancelable(AppID.value, id)
export const appGoodCoins = () => _appcoin.coins(undefined).filter((el) => appGoods().findIndex((el1) => el.CoinTypeID === el1.CoinTypeID) >= 0)
export const appGoodVendorBrands = () => _vendorbrand.vendorBrands().filter((el) => appGoods().findIndex((el1) => el.Name === el1.VendorBrandName) >= 0)
export const appGoodDeviceInfos = () => _deviceinfo.deviceInfos().filter((el) => appGoods().findIndex((el1) => el.Type === el1.DeviceType) >= 0)
export const appGoodName = (appGoodID: string, index: number) => _appgood.displayName(undefined, appGoodID, index)
export const appGoodQuantityUnitAmount = (appGoodID: string) => appGood(appGoodID)?.QuantityUnitAmount
export const appGoodQuantityUnit = (appGoodID: string) => appGood(appGoodID)?.QuantityUnit as string
export const appGoodRewardDistributionMethod = (appGoodID: string) => appGood(appGoodID)?.BenefitType
export const appGoodBestSeller = () => [...appGoods()].sort((a, b) => Number(a.AppGoodSold) - Number(b.AppGoodSold)).slice(0, 5)
export const appGoodScore = (appGoodID: string) => Number(appGood(appGoodID)?.Score) || 4.5
export const appGoodScoreCount = (appGoodID: string) => Number(appGood(appGoodID)?.ScoreCount) || '220+'
export const appGoodLastUnitReward = (appGoodID: string) => appGood(appGoodID)?.LastUnitRewardAmount
export const appGoodMinOrderDuration = (appGoodID: string) => Number(appGood(appGoodID)?.MinOrderDuration)
export const appGoodMaxOrderDuration = (appGoodID: string) => Number(appGood(appGoodID)?.MaxOrderDuration)
export const appGoodBanner = (appGoodID: string) => appGood(appGoodID)?.GoodBanner

export const appGoodMinOrderDurationDays = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 365
  }
  let minOrderDuration = appGoodMinOrderDuration(appGoodID)
  switch (_appGood.DurationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      minOrderDuration /= 24
      break
    case goodbase.GoodDurationType.GoodDurationByDay:
      break
    case goodbase.GoodDurationType.GoodDurationByMonth:
      minOrderDuration *= 30
      break
    case goodbase.GoodDurationType.GoodDurationByYear:
      minOrderDuration *= 365
      break
  }
  return minOrderDuration
}

export const appGoodStaticReturnDays = (appGoodID: string, coinPrice: number) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 365
  }
  const dailyRewardUSD = Number(_appGood.LastUnitRewardAmount) * coinPrice
  let price = Number(appGoodUnitPrice(appGoodID))
  const minOrderDurationDays = appGoodMinOrderDurationDays(appGoodID)
  const packagePrice = Number(_appGood.PackagePrice)
  if (packagePrice > 0) {
    price /= minOrderDurationDays
  }
  return Math.floor(price * minOrderDurationDays / dailyRewardUSD)
}

export const appGoodStaticReturnPercent = (appGoodID: string, coinPrice: number) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 115.75
  }
  const dailyRewardUSD = Number(_appGood.LastUnitRewardAmount) * coinPrice
  let price = Number(appGoodUnitPrice(appGoodID))
  const minOrderDurationDays = appGoodMinOrderDurationDays(appGoodID)
  const packagePrice = Number(_appGood.PackagePrice)
  if (packagePrice > 0) {
    price /= minOrderDurationDays
  }
  return (dailyRewardUSD / price * 100).toFixed(2)
}

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
    return Number(_appGood.PackagePrice)
  }
  if (_appGood?.UnitPrice?.length && Number(_appGood?.UnitPrice) > 0) {
    return Number(_appGood.UnitPrice)
  }
  return Number('9999999999.999999')
}

export const appGoodOrderLimitation = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 'MSG_UNKNOWN'
  }
  if (_appGood?.MinOrderAmount === _appGood?.MaxOrderAmount) {
    return _appGood?.MinOrderAmount
  }
  return _appGood?.MinOrderAmount + '~' + _appGood?.MaxOrderAmount
}

export const appGoodUnitPrice = (appGoodID: string) => {
  const topMostGoods = _topmostgood.topmostgoods(undefined, undefined, appGoodID)
  let packagePrice = 0
  let unitPrice = 0

  topMostGoods.forEach((el) => {
    if (el.PackagePrice?.length && (packagePrice === 0 || Number(el.PackagePrice) > packagePrice)) {
      packagePrice = Number(el.PackagePrice)
    }
    if (el.UnitPrice?.length && (unitPrice === 0 || Number(el.UnitPrice) > unitPrice)) {
      unitPrice = Number(el.UnitPrice)
    }
  })
  if (packagePrice > 0) {
    return packagePrice
  }
  if (unitPrice > 0) {
    return unitPrice
  }

  return Number(appGoodOriginalUnitPrice(appGoodID))
}

export const appGoodRequiredAppGoods = (appGoodID: string, requiredTypes?: goodbase.GoodType[], must?: boolean) => {
  const _appGood = appGood(appGoodID)
  const _requiredGoods = _requiredgood.requireds(_appGood?.GoodID).filter((el) => {
    let ok = true
    if (must !== undefined) ok &&= el.Must === must
    return ok
  })
  return _appgood.goods(undefined, undefined, undefined, _requiredGoods?.map((el) => el.RequiredGoodID) || []).filter((el) => {
    if (!requiredTypes?.length) {
      return true
    }
    let ok = false
    requiredTypes.forEach((el1) => {
      ok ||= el1 === el.GoodType
    })
    return ok
  })
}

export const appGoodRequiredAppGood = (appGoodID: string, requiredAppGoodID: string) => {
  const _appGood = appGood(appGoodID)
  const _requiredAppGood = appGood(requiredAppGoodID)
  return _requiredgood.requireds(_appGood?.GoodID).find((el) => el.RequiredGoodID === _requiredAppGood?.GoodID)
}

export const appGoodEstimatedUnitDailyReward = (appGoodID: string) => appGood(appGoodID)?.LastUnitRewardAmount
export const appGoodSoldPercent = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!Number(_appGood?.GoodTotal)) {
    return 0
  }
  return (Number(_appGood?.GoodTotal) - Number(_appGood?.GoodSpotQuantity)) / Number(_appGood?.GoodTotal)
}

export const appGoodUnitStrings = (appGoodID: string): string[] => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return []
  }
  const prices = [_appGood.QuantityUnitAmount]
  prices[0] = _appGood.QuantityUnitAmount
  prices[1] = _appGood.QuantityUnit
  switch (_appGood.DurationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      prices[2] = 'MSG_HOUR'
      break
    case goodbase.GoodDurationType.GoodDurationByDay:
      prices[2] = 'MSG_DAY'
      break
    case goodbase.GoodDurationType.GoodDurationByMonth:
      prices[2] = 'MSG_MONTH'
      break
    case goodbase.GoodDurationType.GoodDurationByYear:
      prices[2] = 'MSG_YEAR'
      break
  }
  return prices
}

export const appGoodUnitPriceStrings = (appGoodID: string): string[] => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return []
  }
  const prices = [_appGood?.UnitPrice]
  if (_appGood?.SettlementType === goodbase.GoodSettlementType.GoodSettledByCash) {
    prices[0] += 'USDT'
    prices[1] = _appGood.QuantityUnitAmount
    prices[2] = _appGood.QuantityUnit
    switch (_appGood.DurationType) {
      case goodbase.GoodDurationType.GoodDurationByHour:
        prices[3] = 'MSG_HOUR'
        break
      case goodbase.GoodDurationType.GoodDurationByDay:
        prices[3] = 'MSG_DAY'
        break
      case goodbase.GoodDurationType.GoodDurationByMonth:
        prices[3] = 'MSG_MONTH'
        break
      case goodbase.GoodDurationType.GoodDurationByYear:
        prices[3] = 'MSG_YEAR'
        break
    }
  } else {
    prices[0] += '%'
  }
  return prices
}

export const appGoodTopMostGoods = (appGoodID?: string, topMostType?: goodbase.GoodTopMostType) => {
  return _topmostgood.topmostgoods(undefined, topMostType, appGoodID)
}

export const appGoodTopMostAppGoods = (appGoodID?: string, topMostType?: goodbase.GoodTopMostType) => {
  const topMostGoods = _topmostgood.topmostgoods(undefined, topMostType, appGoodID)
  return _appgood.goods(undefined, undefined, undefined, topMostGoods?.map((el) => el.AppGoodID) || [])
}

export const appGoodDeviceHashrate = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return '135 TH/s'
  }
  const deviceInfo = _deviceinfo.deviceInfo(undefined, _appGood.DeviceType)
  if (!deviceInfo) {
    return '135 TH/s'
  }
  return deviceInfo?.Hashrate?.toString() + ' ' + deviceInfo?.HashrateUnit
}

export const appGoodDevicePowerComsuption = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 3750
  }
  return _deviceinfo.deviceInfo(undefined, _appGood.DeviceType)?.PowerConsumption || 3750
}

export const appGoodTypeStr = (appGoodID: string) => {
  const _appGood = appGood(appGoodID)
  if (!_appGood) {
    return 'MSG_RENTAL'
  }
  switch (_appGood.GoodType) {
    case goodbase.GoodType.MachineRenting:
    case goodbase.GoodType.PowerRenting:
      return 'MSG_RENTAL'
    case goodbase.GoodType.MachineHosting:
      return 'MSG_HOSTING'
    case goodbase.GoodType.DelegatedStaking:
      return 'MSG_DELEGATE_STAKING'
    case goodbase.GoodType.ElectricityFee:
      return 'MSG_ELECTRICITY_FEE'
    case goodbase.GoodType.TechniqueServiceFee:
      return 'MSG_TECHNIQUE_FEE'
  }
}

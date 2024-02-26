import { appcountry, constant, notify } from '..'
import { AppID } from './localapp'

const appCountry = appcountry.useAppCountryStore()

const getPageCountries = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  appCountry.getAppCountries({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COUNTRIES',
        Message: 'MSG_GET_APP_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appcountry.Country>, totalRows?: number) => {
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
    getPageCountries(offset, limit, ++pageIndex, done)
  })
}

export const getAppCountries = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageCountries(offset, limit, 0, done)
}

export const appCountries = () => appCountry.countries(AppID.value)

export const createAppCountry = (target: appcountry.Country, finish: (error: boolean) => void) => {
  appCountry.createAppCountry({
    TargetAppID: target.AppID,
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_COUNTRY',
        Message: 'MSG_CREATE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_COUNTRY',
        Message: 'MSG_CREATE_APP_COUNTRY_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

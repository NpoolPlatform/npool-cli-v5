import { computed } from 'vue'
import { appcountry, constant, notify } from '..'
import { AppID } from './localapp'

const _appCountry = appcountry.useAppCountryStore()

const getPageAppCountries = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appCountry.getAppCountries({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COUNTRIES',
        Message: 'MSG_GET_APP_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appcountry.Country>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCountries(++pageIndex, pageEnd, done)
  })
}

export const getAppCountries = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCountries(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppCountries = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appCountry.getNAppCountries({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COUNTRIES',
        Message: 'MSG_GET_APP_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appcountry.Country>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppCountries(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppCountries = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppCountries(pageStart, pages ? pageStart + pages : pages, done)
}

export const appCountries = computed(() => _appCountry.countries(AppID.value))

export const adminCreateAppCountry = (appCountry: appcountry.Country, done?: (error: boolean, appCountry?: appcountry.Country) => void) => {
  _appCountry.createAppCountry({
    ...appCountry,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_COUNTRY',
        Message: 'MSG_CREATE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteAppCountry = (appCountry: appcountry.Country, done?: (error: boolean, appCountry?: appcountry.Country) => void) => {
  _appCountry.deleteAppCountry({
    ...appCountry,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_COUNTRY',
        Message: 'MSG_DELETE_APP_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

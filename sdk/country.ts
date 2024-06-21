import { computed } from 'vue'
import { country, constant, notify } from '..'

const _country = country.useCountryStore()

const adminGetPageCountries = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _country.getCountries({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUNTRIES',
        Message: 'MSG_GET_COUNTRIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<country.Country>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageCountries(++pageIndex, pageEnd, done)
  })
}

export const adminGetCountries = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageCountries(pageStart, pages ? pageStart + pages : pages, done)
}

export const countries = computed(() => _country.countries)

export const adminCreateCountry = (country: country.Country, done?: (error: boolean, country?: country.Country) => void) => {
  _country.createCountry({
    ...country,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COUNTRY',
        Message: 'MSG_CREATE_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminCreateCountries = (countries: country.Country[], done?: (error: boolean, country?: country.Country[]) => void) => {
  _country.createCountries({
    Infos: countries,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COUNTRY',
        Message: 'MSG_CREATE_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateCountry = (country: country.Country, done?: (error: boolean, country?: country.Country) => void) => {
  _country.updateCountry({
    ...country,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_COUNTRY',
        Message: 'MSG_UPDATE_COUNTRY_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

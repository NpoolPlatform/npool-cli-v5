import { defineStore } from 'pinia'
import { API } from './const'
import {
  Country,
  GetCountriesRequest,
  GetCountriesResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  CreateCountryRequest,
  CreateCountryResponse,
  CreateCountriesRequest,
  CreateCountriesResponse
} from './types'
import { doActionWithError } from '../../request'

export const useCountryStore = defineStore('countries', {
  state: () => ({
    Countries: [] as Array<Country>
  }),
  getters: {
    country (): (id: number) => Country | undefined {
      return (id: number) => {
        return this.Countries.find((el) => el.ID === id)
      }
    },
    countries (): Array<Country> {
      return this.Countries
    }
  },
  actions: {
    addCountries (countries: Array<Country>) {
      countries.forEach((country) => {
        const index = this.Countries.findIndex((el) => el.ID === country.ID)
        this.Countries.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, country)
      })
    },
    getCountries (req: GetCountriesRequest, done?: (error: boolean, countries: Array<Country>) => void) {
      doActionWithError<GetCountriesRequest, GetCountriesResponse>(
        API.GET_COUNTRIES,
        req,
        req.Message,
        (resp: GetCountriesResponse): void => {
          this.addCountries(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true, [])
        }
      )
    },
    updateCountry (req: UpdateCountryRequest, done?: (error: boolean, country: Country) => void) {
      doActionWithError<UpdateCountryRequest, UpdateCountryResponse>(
        API.UPDATE_COUNTRY,
        req,
        req.Message,
        (resp: UpdateCountryResponse): void => {
          this.addCountries([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true, {} as Country)
        }
      )
    },
    createCountry (req: CreateCountryRequest, done?: (error: boolean, country: Country) => void) {
      doActionWithError<CreateCountryRequest, CreateCountryResponse>(
        API.CREATE_COUNTRY,
        req,
        req.Message,
        (resp: CreateCountryResponse): void => {
          this.addCountries([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true, {} as Country)
        }
      )
    },
    createCountries (req: CreateCountriesRequest, done?: (error: boolean, countries: Array<Country>) => void) {
      doActionWithError<CreateCountriesRequest, CreateCountriesResponse>(
        API.CREATE_COUNTRIES,
        req,
        req.Message,
        (resp: CreateCountriesResponse): void => {
          this.addCountries(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true, [] as Array<Country>)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

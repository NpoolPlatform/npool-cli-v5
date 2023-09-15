import { defineStore } from 'pinia'
import { API } from './const'
import {
  Country,
  GetAppCountriesRequest,
  GetAppCountriesResponse,
  GetNAppCountriesRequest,
  GetNAppCountriesResponse,
  CreateAppCountryRequest,
  CreateAppCountryResponse,
  DeleteAppCountryRequest,
  DeleteAppCountryResponse
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppCountryStore = defineStore('app-countries', {
  state: () => ({
    AppCountries: new Map<string, Array<Country>>()
  }),
  getters: {
    addCountries (): (appID: string | undefined, countries: Array<Country>) => void {
      return (appID: string | undefined, countries: Array<Country>) => {
        appID = formalizeAppID(appID)
        let _countries = this.AppCountries.get(appID) as Array<Country>
        if (!_countries) {
          _countries = []
        }
        countries.forEach((lang) => {
          const index = _countries?.findIndex((el) => el.ID === lang.ID)
          _countries.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, lang)
        })
        this.AppCountries.set(appID, _countries)
      }
    },
    delCountry (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const _langs = this.AppCountries.get(appID) as Array<Country>
        if (!_langs) {
          return
        }
        const index = _langs?.findIndex((el) => el.ID === id)
        _langs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.AppCountries.set(appID, _langs)
      }
    }
  },
  actions: {
    getAppCountries (req: GetAppCountriesRequest, done: (error: boolean, rows: Array<Country>) => void) {
      doActionWithError<GetAppCountriesRequest, GetAppCountriesResponse>(
        API.GET_APPCOUNTRIES,
        req,
        req.Message,
        (resp: GetAppCountriesResponse): void => {
          this.addCountries(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },

    getNAppCountries (req: GetNAppCountriesRequest, done: (error: boolean, countries: Array<Country>) => void) {
      doActionWithError<GetNAppCountriesRequest, GetNAppCountriesResponse>(
        API.GET_APP_APPCOUNTRIES,
        req,
        req.Message,
        (resp: GetNAppCountriesResponse): void => {
          this.addCountries(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppCountry (req: DeleteAppCountryRequest, done: (error: boolean, country: Country) => void) {
      doActionWithError<DeleteAppCountryRequest, DeleteAppCountryResponse>(
        API.DELETE_APPCOUNTRY,
        req,
        req.Message,
        (resp: DeleteAppCountryResponse): void => {
          this.delCountry(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Country)
        }
      )
    },
    createAppCountry (req: CreateAppCountryRequest, done: (error: boolean, country: Country) => void) {
      doActionWithError<CreateAppCountryRequest, CreateAppCountryResponse>(
        API.CREATE_APPCOUNTRY,
        req,
        req.Message,
        (resp: CreateAppCountryResponse): void => {
          this.addCountries(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Country)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

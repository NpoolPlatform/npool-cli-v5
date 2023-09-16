import { defineStore } from 'pinia'
import { API, FiatType } from './const'
import {
  FiatCurrency,
  GetFiatCurrenciesRequest,
  GetFiatCurrenciesResponse,
  GetFiatCurrencyRequest,
  GetFiatCurrencyResponse
} from './types'
import { doActionWithError } from '../../../request'

export const useFiatCurrencyStore = defineStore('fiat-currencies', {
  state: () => ({
    FiatCurrencies: [] as Array<FiatCurrency>
  }),
  getters: {
    jpy (): () => number | undefined {
      return () => {
        const currency = this.FiatCurrencies.find((el) => el?.FiatName === FiatType.JPY)
        return currency ? Number(currency.MarketValueHigh) : Number('NaN')
      }
    },
    addCurrencies (): (currencies: Array<FiatCurrency>) => void {
      return (currencies: Array<FiatCurrency>) => {
        currencies.forEach((currency) => {
          const index = this.FiatCurrencies.findIndex((el) => el.ID === currency.ID)
          this.FiatCurrencies.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, currency)
        })
      }
    }
  },
  actions: {
    getFiatCurrencies (req: GetFiatCurrenciesRequest, done: (error: boolean, rows: Array<FiatCurrency>) => void) {
      doActionWithError<GetFiatCurrenciesRequest, GetFiatCurrenciesResponse>(
        API.GET_FIATCURRENCIES,
        req,
        req.Message,
        (resp: GetFiatCurrenciesResponse): void => {
          this.addCurrencies(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatCurrency>)
        }
      )
    },
    getFiatCurrency (req: GetFiatCurrencyRequest, done: (error: boolean, rows: FiatCurrency) => void) {
      doActionWithError<GetFiatCurrencyRequest, GetFiatCurrencyResponse>(
        API.GET_FIATCURRENCY,
        req,
        req.Message,
        (resp: GetFiatCurrencyResponse): void => {
          this.addCurrencies([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatCurrency)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCurrenciesRequest,
  GetCurrenciesResponse,
  GetCurrencyRequest,
  GetCurrencyResponse
} from './types'
import { doActionWithError } from '../../../request'
import { CoinCurrency } from './base'

export const useCurrencyStore = defineStore('coin-currencies', {
  state: () => ({
    Currencies: [] as Array<CoinCurrency>
  }),
  getters: {
    currency () {
      return (coinTypeID: string) => {
        return Number(this.Currencies.find((el) => el.CoinTypeID === coinTypeID)?.MarketValueLow) || 0
      }
    },
    currencyByUnit () {
      return (coinUnit: string) => {
        return Number(this.Currencies.find((el) => el.CoinUnit === coinUnit)?.MarketValueLow) || 0
      }
    },
    currencies () {
      return () => this.Currencies
    },
    expired () {
      return () => {
        const now = Math.ceil(new Date().getTime() / 1000)
        return !(now - this.Currencies[0]?.UpdatedAt <= 10 * 60)
      }
    }
  },
  actions: {
    addCurrencies (currencies: Array<CoinCurrency>) {
      currencies.forEach((currency) => {
        const index = this.Currencies.findIndex((el) => el.CoinTypeID === currency.CoinTypeID)
        this.Currencies.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, currency)
      })
    },
    getCurrencies (req: GetCurrenciesRequest, done: (error: boolean, rows?: Array<CoinCurrency>) => void) {
      doActionWithError<GetCurrenciesRequest, GetCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetCurrenciesResponse): void => {
          this.addCurrencies(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getCoinCurrency (req: GetCurrencyRequest, done: (error: boolean, row?: CoinCurrency) => void) {
      doActionWithError<GetCurrencyRequest, GetCurrencyResponse>(
        API.GET_CURRENCY,
        req,
        req.Message,
        (resp: GetCurrencyResponse): void => {
          this.addCurrencies([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

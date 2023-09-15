import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetFiatCurrenciesRequest,
  GetFiatCurrenciesResponse
} from './types'
import { doActionWithError } from '../../../../request'
import { FiatCurrency } from '../types'

export const useFiatCurrencyHistoryStore = defineStore('fiat-currency-histories', {
  state: () => ({
    Histories: [] as Array<FiatCurrency>
  }),
  getters: {
    addHistories (): (currencies: Array<FiatCurrency>) => void {
      return (feeds: Array<FiatCurrency>) => {
        feeds.forEach((feed) => {
          const index = this.Histories.findIndex((el) => el.ID === feed.ID)
          this.Histories.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feed)
        })
      }
    }
  },
  actions: {
    getFiatCurrencyHistories (req: GetFiatCurrenciesRequest, done: (error: boolean, rows?: Array<FiatCurrency>) => void) {
      doActionWithError<GetFiatCurrenciesRequest, GetFiatCurrenciesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetFiatCurrenciesResponse): void => {
          this.addHistories(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

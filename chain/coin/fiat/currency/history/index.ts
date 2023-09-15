import { defineStore } from 'pinia'
import { API } from './const'
import {
  CoinFiatCurrency,
  GetCoinFiatCurrenciesRequest,
  GetCoinFiatCurrenciesResponse
} from './types'
import { doActionWithError } from '../../../../../request'

export const useCoinFiatCurrencyHistoryStore = defineStore('coin-fiat-currency-histories', {
  state: () => ({
    Histories: [] as Array<CoinFiatCurrency>
  }),
  getters: {
    addHistories (): (currencies: Array<CoinFiatCurrency>) => void {
      return (feeds: Array<CoinFiatCurrency>) => {
        feeds.forEach((feed) => {
          const index = this.Histories.findIndex((el) => el.ID === feed.ID)
          this.Histories.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feed)
        })
      }
    }
  },
  actions: {
    getCoinFiatCurrencyHistories (req: GetCoinFiatCurrenciesRequest, done: (error: boolean, rows?: Array<CoinFiatCurrency>) => void) {
      doActionWithError<GetCoinFiatCurrenciesRequest, GetCoinFiatCurrenciesResponse>(
        API.GET_COIN_FIAT_CURRENCY_HISTORIES,
        req,
        req.Message,
        (resp: GetCoinFiatCurrenciesResponse): void => {
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
export * from './const'

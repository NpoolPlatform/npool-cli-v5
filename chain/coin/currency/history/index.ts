import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCurrencyHistoriesRequest,
  GetCurrencyHistoriesResponse
} from './types'
import { doActionWithError } from '../../../../request'
import { CoinCurrency } from '../base'

export const useCoinCurrencyHistoryStore = defineStore('coin-currency-histories', {
  state: () => ({
    Histories: [] as Array<CoinCurrency>
  }),
  getters: {
    addHistories (): (currencies: Array<CoinCurrency>) => void {
      return (feeds: Array<CoinCurrency>) => {
        feeds.forEach((feed) => {
          const index = this.Histories.findIndex((el) => el.ID === feed.ID)
          this.Histories.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feed)
        })
      }
    }
  },
  actions: {
    getCurrencyHistories (req: GetCurrencyHistoriesRequest, done: (error: boolean, rows?: Array<CoinCurrency>) => void) {
      doActionWithError<GetCurrencyHistoriesRequest, GetCurrencyHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetCurrencyHistoriesResponse): void => {
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

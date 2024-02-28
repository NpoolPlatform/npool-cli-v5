import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../../request'
import {
  GetSimulateProfitsRequest,
  GetSimulateProfitsResponse,
  Profit
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useProfitStore = defineStore('simulate-ledger-profits', {
  state: () => ({
    Profits: new Map<string, Array<Profit>>()
  }),
  getters: {
    profits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => Array<Profit> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.Profits.get(appID)?.filter((el) => {
          let ok = true
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          return ok
        }) || []
      }
    }
  },
  actions: {
    addProfits (appID: string | undefined, profits: Array<Profit>) {
      appID = formalizeAppID(appID)
      let _profits = this.Profits.get(appID) as Array<Profit>
      if (!_profits) {
        _profits = []
      }
      profits.forEach((profit) => {
        const index = _profits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID)
        _profits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      this.Profits.set(appID, _profits)
    },
    getProfits (req: GetSimulateProfitsRequest, done: (error: boolean, rows: Array<Profit>) => void) {
      doActionWithError<GetSimulateProfitsRequest, GetSimulateProfitsResponse>(
        API.GET_SIMULATE_PROFITS,
        req,
        req.Message,
        (resp: GetSimulateProfitsResponse): void => {
          this.addProfits(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Profit>)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

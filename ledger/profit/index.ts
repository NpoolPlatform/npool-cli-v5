import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  CoinProfit,
  GetCoinProfitsRequest,
  GetCoinProfitsResponse,
  GetGoodProfitsRequest,
  GetGoodProfitsResponse,
  GoodProfit
} from './types'
import { formalizeAppID } from '../../appuser/app/local'
import { formalizeUserID } from '../../appuser/user'

export const useProfitStore = defineStore('ledger-profits', {
  state: () => ({
    GoodProfits: new Map<string, Array<GoodProfit>>(),
    CoinProfits: new Map<string, Array<CoinProfit>>()
  }),
  getters: {
    purchaseUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        let units = 0
        this.GoodProfits.get(appID)?.filter((el) => {
          let ok = el.UserID === userID && el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        })?.forEach((el) => {
          units += Number(el.Units)
        })
        return units
      }
    },
    totalIncoming (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        let incoming = 0
        this.GoodProfits.get(appID)?.filter((el) => {
          let ok = el.UserID === userID && el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        })?.forEach((el) => {
          incoming += Number(el.Incoming)
        })
        return incoming
      }
    },
    coinProfits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => Array<CoinProfit> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.CoinProfits.get(appID)?.filter((el) => {
          let ok = true
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          return ok
        }) || []
      }
    },
    goodProfits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => Array<GoodProfit> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.GoodProfits.get(appID)?.filter((el) => {
          let ok = Number(el.Units) > 0
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          return ok
        })?.sort((a, b) => a.AppGoodName.localeCompare(b.AppGoodName)) || []
      }
    }
  },
  actions: {
    addGoodProfits (appID: string | undefined, profits: Array<GoodProfit>) {
      appID = formalizeAppID(appID)
      let _profits = this.GoodProfits.get(appID) as Array<GoodProfit>
      if (!_profits) {
        _profits = []
      }
      profits.forEach((profit) => {
        const index = _profits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID && el.AppGoodID === profit.AppGoodID)
        _profits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      this.GoodProfits.set(appID, _profits)
    },
    addCoinProfits (appID: string | undefined, profits: Array<CoinProfit>) {
      appID = formalizeAppID(appID)
      let _profits = this.CoinProfits.get(appID) as Array<CoinProfit>
      if (!_profits) {
        _profits = []
      }
      profits.forEach((profit) => {
        const index = _profits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID)
        _profits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      this.CoinProfits.set(appID, _profits)
    },
    getGoodProfits (req: GetGoodProfitsRequest, done: (error: boolean, rows: Array<GoodProfit>) => void) {
      doActionWithError<GetGoodProfitsRequest, GetGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetGoodProfitsResponse): void => {
          this.addGoodProfits(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<GoodProfit>)
        }
      )
    },
    getCoinProfits (req: GetCoinProfitsRequest, done: (error: boolean, rows: Array<CoinProfit>) => void) {
      doActionWithError<GetCoinProfitsRequest, GetCoinProfitsResponse>(
        API.GET_COINPROFITS,
        req,
        req.Message,
        (resp: GetCoinProfitsResponse): void => {
          this.addCoinProfits(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<CoinProfit>)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

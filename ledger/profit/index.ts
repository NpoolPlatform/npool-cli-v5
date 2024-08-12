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
import { formalizeUserID } from '../../appuser/user/local'
import { IntervalKey } from '../../utils'

export const useProfitStore = defineStore('ledger-profits', {
  state: () => ({
    GoodProfits: new Map<string, Map<IntervalKey, Array<GoodProfit>>>(),
    CoinProfits: new Map<string, Map<IntervalKey, Array<CoinProfit>>>()
  }),
  getters: {
    purchaseUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        let units = 0
        this.GoodProfits.get(appID)?.get(IntervalKey.All)?.filter((el) => {
          let ok = el.UserID === userID && el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        })?.forEach((el) => {
          units += Number(el.Units)
        })
        return units
      }
    },
    totalIncoming (): (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID: string | undefined, appGoodID: string | undefined) => number {
      return (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID: string | undefined, appGoodID: string | undefined) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        let incoming = 0
        this.GoodProfits.get(appID)?.get(key)?.filter((el) => {
          let ok = el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        })?.forEach((el) => {
          incoming += Number(el.Incoming)
        })
        return incoming
      }
    },
    coinProfits (): (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID?: string) => Array<CoinProfit> {
      return (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.CoinProfits.get(appID)?.get(key)?.filter((el) => {
          let ok = true
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          return ok
        }) || []
      }
    },
    goodProfits (): (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID?: string, appGoodID?: string) => Array<GoodProfit> {
      return (appID: string | undefined, userID: string | undefined, key: IntervalKey, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        return this.GoodProfits.get(appID)?.get(key)?.filter((el) => {
          let ok = Number(el.Units) > 0
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          if (userID) ok &&= el.UserID === userID
          return ok
        })?.sort((a, b) => a.AppGoodName.localeCompare(b.AppGoodName)) || []
      }
    }
  },
  actions: {
    addGoodProfits (appID: string | undefined, key: IntervalKey, profits: Array<GoodProfit>) {
      appID = formalizeAppID(appID)
      const goodProfits = this.GoodProfits.get(appID) || new Map<IntervalKey, Array<GoodProfit>>()
      const _profits = goodProfits.get(key) || []
      profits.forEach((profit) => {
        const index = _profits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID && el.AppGoodID === profit.AppGoodID)
        _profits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      goodProfits.set(key, _profits)
      this.GoodProfits.set(appID, goodProfits)
    },
    addCoinProfits (appID: string | undefined, key: IntervalKey, profits: Array<CoinProfit>) {
      appID = formalizeAppID(appID)
      const coinProfits = this.CoinProfits.get(appID) || new Map<IntervalKey, Array<CoinProfit>>()
      const _profits = coinProfits.get(key) || []
      profits.forEach((profit) => {
        const index = _profits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID)
        _profits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      coinProfits.set(key, _profits)
      this.CoinProfits.set(appID, coinProfits)
    },
    getGoodProfits (req: GetGoodProfitsRequest, key: IntervalKey, done: (error: boolean, rows: Array<GoodProfit>) => void) {
      doActionWithError<GetGoodProfitsRequest, GetGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetGoodProfitsResponse): void => {
          this.addGoodProfits(undefined, key, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<GoodProfit>)
        }
      )
    },
    getCoinProfits (req: GetCoinProfitsRequest, key: IntervalKey, done: (error: boolean, rows: Array<CoinProfit>) => void) {
      doActionWithError<GetCoinProfitsRequest, GetCoinProfitsResponse>(
        API.GET_COINPROFITS,
        req,
        req.Message,
        (resp: GetCoinProfitsResponse): void => {
          this.addCoinProfits(undefined, key, resp.Infos)
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

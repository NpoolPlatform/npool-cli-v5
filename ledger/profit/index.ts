import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  GetGoodProfitsRequest,
  GetGoodProfitsResponse,
  GetIntervalGoodProfitsRequest,
  GetIntervalGoodProfitsResponse,
  GetIntervalProfitsRequest,
  GetIntervalProfitsResponse,
  GetProfitsRequest,
  GetProfitsResponse,
  GoodProfit,
  Profit
} from './types'
import { formalizeAppID } from '../../appuser/app/local'
import { formalizeUserID } from '../../appuser/user'

export const useProfitStore = defineStore('ledger-profits', {
  state: () => ({
    GoodProfits: new Map<string, Array<GoodProfit>>(),
    IntervalGoodProfits: new Map<string, Map<string, Array<GoodProfit>>>(),
    Profits: new Map<string, Array<Profit>>(),
    IntervalProfits: new Map<string, Map<string, Array<Profit>>>()
  }),
  getters: {
    intervalProfits (): (appID: string | undefined, userID: string | undefined, coinTypeID: string | undefined, key: string) => Array<Profit> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string | undefined, key: string) => {
        appID = formalizeAppID(appID)
        return this.IntervalProfits.get(appID)?.get(key)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }) || []
      }
    },
    intervalGoodProfits (): (appID: string | undefined, userID: string | undefined, key: string) => Array<GoodProfit> {
      return (appID: string | undefined, userID: string | undefined, key: string) => {
        appID = formalizeAppID(appID)
        return this.IntervalGoodProfits.get(appID)?.get(key)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        }) || []
      }
    },
    intervalIncoming (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, key: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, key: string) => {
        let incoming = 0
        this.intervalProfits(appID, userID, coinTypeID, key).forEach((el) => {
          incoming += Number(el.Incoming)
        })
        return incoming
      }
    },
    intervalGoodIncoming (): (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined, key: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string, appGoodID: string | undefined, key: string) => {
        let incoming = 0
        this.intervalGoodProfits(appID, userID, key).filter((el) => {
          let ok = el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        }).forEach((el) => {
          incoming += Number(el.Incoming)
        })
        return incoming
      }
    },
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
    },
    goodProfits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => Array<GoodProfit> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.GoodProfits.get(appID)?.filter((el) => {
          let ok = Number(el.Units) > 0
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (userID) ok &&= el.UserID === userID
          return ok
        })?.sort((a, b) => a.GoodName.localeCompare(b.GoodName)) || []
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
    addIntervalGoodProfits (appID: string | undefined, key: string, profits: Array<GoodProfit>) {
      appID = formalizeAppID(appID)
      let _profits = this.IntervalGoodProfits.get(appID) as Map<string, Array<GoodProfit>>
      if (!_profits) {
        _profits = new Map<string, Array<GoodProfit>>()
      }
      let keyProfits = _profits.get(key) as Array<GoodProfit>
      if (!keyProfits) {
        keyProfits = []
      }
      profits.forEach((profit) => {
        const index = keyProfits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID && el.AppGoodID === profit.AppGoodID)
        keyProfits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      _profits.set(key, keyProfits)
      this.IntervalGoodProfits.set(appID, _profits)
    },
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
    addIntervalProfits (appID: string | undefined, key: string, profits: Array<Profit>) {
      appID = formalizeAppID(appID)
      let _profits = this.IntervalProfits.get(appID) as Map<string, Array<Profit>>
      if (!_profits) {
        _profits = new Map<string, Array<Profit>>()
      }
      let keyProfits = _profits.get(key) as Array<Profit>
      if (!keyProfits) {
        keyProfits = []
      }
      profits.forEach((profit) => {
        const index = keyProfits.findIndex((el) => el.UserID === profit.UserID && el.CoinTypeID === profit.CoinTypeID)
        keyProfits.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, profit)
      })
      _profits.set(key, keyProfits)
      this.IntervalProfits.set(appID, _profits)
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
    getIntervalGoodProfits (req: GetIntervalGoodProfitsRequest, intervalKey: string, done: (error:boolean, rows: Array<GoodProfit>) => void) {
      doActionWithError<GetIntervalGoodProfitsRequest, GetIntervalGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetIntervalGoodProfitsResponse): void => {
          this.addIntervalGoodProfits(undefined, intervalKey, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<GoodProfit>)
        }
      )
    },
    getProfits (req: GetProfitsRequest, done: (error: boolean, rows: Array<Profit>) => void) {
      doActionWithError<GetProfitsRequest, GetProfitsResponse>(
        API.GET_PROFITS,
        req,
        req.Message,
        (resp: GetProfitsResponse): void => {
          this.addProfits(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Profit>)
        }
      )
    },
    getIntervalProfits (req: GetIntervalProfitsRequest, intervalKey: string, done: (error: boolean, rows: Array<Profit>) => void) {
      doActionWithError<GetIntervalProfitsRequest, GetIntervalProfitsResponse>(
        API.GET_INTERVALPROFITS,
        req,
        req.Message,
        (resp: GetIntervalProfitsResponse): void => {
          this.addIntervalProfits(undefined, intervalKey, resp.Infos)
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

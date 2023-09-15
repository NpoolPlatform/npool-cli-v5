import { doActionWithError } from '../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Ledger,
  GetLedgersRequest,
  GetLedgersResponse,
  GetIntervalLedgersRequest,
  GetIntervalLedgersResponse,
  GetAppLedgersRequest,
  GetAppLedgersResponse
} from './types'
import { formalizeAppID } from '../appuser/app/local'
import { formalizeUserID } from '../appuser/user'

export const useChurchLedgerStore = defineStore('church-Ledger-v4', {
  state: () => ({
    Ledgers: new Map<string, Array<Ledger>>(),
    IntervalLedgers: new Map<string, Map<string, Array<Ledger>>>()
  }),
  getters: {
    ledgers () : (appID?: string, userID?: string, coinTypeID?: string) => Array<Ledger> {
      return (appID?: string, userID?: string, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.Ledgers.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }).sort((a, b) => a.Spendable > b.Spendable ? -1 : 1) || []
      }
    },
    intervalLedgers (): (appID: string | undefined, userID: string | undefined, coinTypeID: string | undefined, key: string) => Array<Ledger> {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string | undefined, key: string) => {
        appID = formalizeAppID(appID)
        return this.IntervalLedgers.get(appID)?.get(key)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }) || []
      }
    },
    coinBalance (): (appID: string | undefined, userID: string | undefined, coinTypeID: string) => string {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Ledgers.get(appID)?.find((el) => el.UserID === userID && el.CoinTypeID === coinTypeID)?.Spendable || '0'
      }
    },
    addLedgers (): (appID: string | undefined, ledgers: Array<Ledger>) => void {
      return (appID: string | undefined, ledgers: Array<Ledger>) => {
        appID = formalizeAppID(appID)
        let _ledgers = this.Ledgers.get(appID) as Array<Ledger>
        if (!_ledgers) {
          _ledgers = []
        }
        ledgers.forEach((ledger) => {
          const index = _ledgers.findIndex((el) => el.UserID === ledger.UserID && el.CoinTypeID === ledger.CoinTypeID)
          _ledgers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, ledger)
        })
        this.Ledgers.set(appID, _ledgers)
      }
    },
    addIntervalLedgers (): (appID: string | undefined, key: string, ledgers: Array<Ledger>) => void {
      return (appID: string | undefined, key: string, ledgers: Array<Ledger>) => {
        appID = formalizeAppID(appID)
        let _ledgers = this.IntervalLedgers.get(appID) as Map<string, Array<Ledger>>
        if (!_ledgers) {
          _ledgers = new Map<string, Array<Ledger>>()
        }
        let keyLedgers = _ledgers.get(key) as Array<Ledger>
        if (!keyLedgers) {
          keyLedgers = []
        }
        ledgers.forEach((ledger) => {
          const index = keyLedgers.findIndex((el) => el.UserID === ledger.UserID && el.CoinTypeID === ledger.CoinTypeID)
          keyLedgers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, ledger)
        })
        _ledgers.set(key, keyLedgers)
        this.IntervalLedgers.set(appID, _ledgers)
      }
    }
  },
  actions: {
    getAppLedgers (req: GetAppLedgersRequest, done: (Ledgers: Array<Ledger>, error: boolean) => void) {
      doActionWithError<GetAppLedgersRequest, GetAppLedgersResponse>(
        API.GET_APP_LEDGERS,
        req,
        req.Message,
        (resp: GetAppLedgersResponse): void => {
          this.addLedgers(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    getLedgers (req: GetLedgersRequest, done: (error: boolean, rows: Array<Ledger>) => void) {
      doActionWithError<GetLedgersRequest, GetLedgersResponse>(
        API.GET_LEDGERS,
        req,
        req.Message,
        (resp: GetLedgersResponse): void => {
          this.addLedgers(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Ledger>)
        }
      )
    },
    getIntervalLedgers (req: GetIntervalLedgersRequest, intervalKey: string, done: (error: boolean, rows: Array<Ledger>) => void) {
      doActionWithError<GetIntervalLedgersRequest, GetIntervalLedgersResponse>(
        API.GET_INTERVALLEDGERS,
        req,
        req.Message,
        (resp: GetIntervalLedgersResponse): void => {
          this.addIntervalLedgers(undefined, intervalKey, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Ledger>)
        }
      )
    }
  }
})

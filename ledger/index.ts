import { doActionWithError } from '../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Ledger,
  GetLedgersRequest,
  GetLedgersResponse,
  GetAppLedgersRequest,
  GetAppLedgersResponse
} from './types'
import { formalizeAppID } from '../appuser/app/local'
import { formalizeUserID } from '../appuser/user'

export const useLedgerStore = defineStore('ledgers', {
  state: () => ({
    Ledgers: new Map<string, Array<Ledger>>()
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
    coinBalance (): (appID: string | undefined, userID: string | undefined, coinTypeID: string) => string {
      return (appID: string | undefined, userID: string | undefined, coinTypeID: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Ledgers.get(appID)?.find((el) => el.UserID === userID && el.CoinTypeID === coinTypeID)?.Spendable || '0'
      }
    }
  },
  actions: {
    addLedgers  (appID: string | undefined, ledgers: Array<Ledger>) {
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
    },
    getAppLedgers (req: GetAppLedgersRequest, done: (error: boolean, rows?: Array<Ledger>) => void) {
      doActionWithError<GetAppLedgersRequest, GetAppLedgersResponse>(
        API.GET_APP_LEDGERS,
        req,
        req.Message,
        (resp: GetAppLedgersResponse): void => {
          this.addLedgers(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getLedgers (req: GetLedgersRequest, done: (error: boolean, rows?: Array<Ledger>) => void) {
      doActionWithError<GetLedgersRequest, GetLedgersResponse>(
        API.GET_LEDGERS,
        req,
        req.Message,
        (resp: GetLedgersResponse): void => {
          this.addLedgers(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

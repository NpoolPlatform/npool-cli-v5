import { defineStore } from 'pinia'
import {
  GetDepositAccountRequest,
  GetDepositAccountResponse,
  GetDepositAccountsRequest,
  GetDepositAccountsResponse,
  GetAppDepositAccountsRequest,
  GetAppDepositAccountsResponse
} from './types'
import { doActionWithError } from '../../../request'
import { Account } from '../base'
import { API } from './const'
import { formalizeAppID } from '../../../appuser/app/local'
import { UserAccounts } from './state'

export const useUserAccountStore = defineStore('userDepositAccounts', {
  state: () => ({
    UserAccounts: new Map<string, UserAccounts>()
  }),
  getters: {
    accounts (): (appID?: string, userID?: string, coinTypeID?: string) => Array<Account> {
      return (appID?: string, userID?: string, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.Accounts?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    pageStart (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.pageStart() || 0
      }
    },
    pageLimit (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.pageLimit() || 10
      }
    },
    pageLoaded (): (appID: string | undefined, page: number) => boolean {
      return (appID: string | undefined, page: number) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.pageLoaded(page) || false
      }
    },
    pageLoading (): (appID: string | undefined, page: number) => boolean {
      return (appID: string | undefined, page: number) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.pageLoading(page) || false
      }
    },
    totalRows (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.totalRows() || 0
      }
    },
    totalPages (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.totalPages() || 0
      }
    }
  },
  actions: {
    addAccounts  (appID: string | undefined, accounts: Array<Account>) {
      appID = formalizeAppID(appID)
      const userAccounts = this.UserAccounts.get(appID) || {} as UserAccounts
      const _accounts = userAccounts.Accounts || []
      accounts.forEach((account) => {
        const index = _accounts?.findIndex((el) => el.ID === account.ID)
        _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
      })
      userAccounts.Accounts = _accounts
      this.UserAccounts.set(appID, userAccounts)
    },
    delAccount  (appID: string | undefined, accountID: string) {
      appID = formalizeAppID(appID)
      const userAccounts = this.UserAccounts.get(appID) || {} as UserAccounts
      const _accounts = userAccounts.Accounts || []
      const index = _accounts.findIndex((el) => el.EntID === accountID)
      _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      userAccounts.Accounts = _accounts
      this.UserAccounts.set(appID, userAccounts)
    },
    getDepositAccount (req: GetDepositAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<GetDepositAccountRequest, GetDepositAccountResponse>(
        API.GET_DEPOSITACCOUNT,
        req,
        req.Message,
        (resp: GetDepositAccountResponse): void => {
          this.addAccounts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Account)
        })
    },

    getDepositAccounts (req: GetDepositAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetDepositAccountsRequest, GetDepositAccountsResponse>(
        API.GET_DEPOSITACCOUNTS,
        req,
        req.Message,
        (resp: GetDepositAccountsResponse): void => {
          this.addAccounts(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },

    getAppDepositAccounts (req: GetAppDepositAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetAppDepositAccountsRequest, GetAppDepositAccountsResponse>(
        API.GET_APP_DEPOSITACCOUNTS,
        req,
        req.Message,
        (resp: GetAppDepositAccountsResponse): void => {
          this.addAccounts(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },

    initializePager (appID: string | undefined) {
      appID = formalizeAppID(appID)
      if (!this.UserAccounts.get(appID)) {
        this.UserAccounts.set(appID, new UserAccounts())
      }
    },
    incrementPageStart (appID: string | undefined) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.incrementPageStart()
    },
    subtractPageStart (appID: string | undefined) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.subtractPageStart()
    },
    setPageLimit (appID: string | undefined, pageLimit: number) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.setPageLimit(pageLimit)
    },
    loadPage (appID: string | undefined, page: number) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.loadPage(page)
    },
    loadedPage (appID: string | undefined, page: number) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.loadedPage(page)
    },
    setTotalPages (appID: string | undefined, pages: number) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.setTotalPages(pages)
    },
    setTotalRows (appID: string | undefined, rows: number) {
      appID = formalizeAppID(appID)
      this.UserAccounts.get(appID)?.setTotalRows(rows)
    }
  }
})

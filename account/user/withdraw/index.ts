import { defineStore } from 'pinia'
import {
  CreateUserAccountRequest,
  CreateUserAccountResponse,
  DeleteUserAccountRequest,
  DeleteUserAccountResponse,
  GetUserAccountsRequest,
  GetUserAccountsResponse,
  GetAppUserAccountsRequest,
  GetAppUserAccountsResponse,
  GetNAppUserAccountsRequest,
  GetNAppUserAccountsResponse,
  UpdateAppUserAccountRequest,
  UpdateAppUserAccountResponse
} from './types'
import { doActionWithError } from '../../../request'
import { Account } from '../base'
import { API } from './const'
import { formalizeAppID } from '../../../appuser/app/local'
import { AccountUsedFor } from '../../base'
import { UserAccounts } from './state'

export const useUserAccountStore = defineStore('userWithdrawAccounts', {
  state: () => ({
    UserAccounts: new Map<string, UserAccounts>()
  }),
  getters: {
    accounts (): (appID?: string, userID?: string, coinTypeID?: string, usedFor?: AccountUsedFor) => Array<Account> {
      return (appID?: string, userID?: string, coinTypeID?: string, usedFor?: AccountUsedFor) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.Accounts?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (usedFor) ok &&= el.UsedFor === usedFor
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
    createUserAccount (req: CreateUserAccountRequest, done: (error: boolean, row?: Account) => void) {
      req.UsedFor = AccountUsedFor.UserWithdraw
      doActionWithError<CreateUserAccountRequest, CreateUserAccountResponse>(
        API.CREATE_USERACCOUNT,
        req,
        req.Message,
        (resp: CreateUserAccountResponse): void => {
          this.addAccounts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteUserAccount (req: DeleteUserAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<DeleteUserAccountRequest, DeleteUserAccountResponse>(
        API.DELETE_USERACCOUNT,
        req,
        req.Message,
        (resp: DeleteUserAccountResponse): void => {
          this.delAccount(undefined, req.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getUserAccounts (req: GetUserAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      req.UsedFor = AccountUsedFor.UserWithdraw
      doActionWithError<GetUserAccountsRequest, GetUserAccountsResponse>(
        API.GET_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetUserAccountsResponse): void => {
          this.addAccounts(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },

    getAppUserAccounts (req: GetAppUserAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetAppUserAccountsRequest, GetAppUserAccountsResponse>(
        API.GET_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetAppUserAccountsResponse): void => {
          this.addAccounts(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },

    getNAppUserAccounts (req: GetNAppUserAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetNAppUserAccountsRequest, GetNAppUserAccountsResponse>(
        API.GET_N_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetNAppUserAccountsResponse): void => {
          this.addAccounts(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppUserAccount (req: UpdateAppUserAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<UpdateAppUserAccountRequest, UpdateAppUserAccountResponse>(
        API.UPDATE_APP_USERACCOUNT,
        req,
        req.Message,
        (resp: UpdateAppUserAccountResponse): void => {
          this.addAccounts(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
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

import { defineStore } from 'pinia'
import {
  CreateUserAccountRequest,
  CreateUserAccountResponse,
  DeleteUserAccountRequest,
  DeleteUserAccountResponse,
  GetUserAccountsRequest,
  GetUserAccountsResponse,
  GetDepositAccountRequest,
  GetDepositAccountResponse,
  GetAppUserAccountsRequest,
  GetAppUserAccountsResponse,
  GetDepositAccountsRequest,
  GetDepositAccountsResponse,
  GetAppDepositAccountsRequest,
  GetAppDepositAccountsResponse,
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

export const useUserAccountStore = defineStore('user-accounts', {
  state: () => ({
    UserAccounts: new Map<string, Array<Account>>()
  }),
  getters: {
    accounts (): (appID?: string, userID?: string, coinTypeID?: string, usedFor?: AccountUsedFor) => Array<Account> {
      return (appID?: string, userID?: string, coinTypeID?: string, usedFor?: AccountUsedFor) => {
        appID = formalizeAppID(appID)
        return this.UserAccounts.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (usedFor) ok &&= el.UsedFor === usedFor
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    addAccounts  (appID: string | undefined, accounts: Array<Account>) {
      appID = formalizeAppID(appID)
      let _accounts = this.UserAccounts.get(appID) as Array<Account>
      if (!_accounts) {
        _accounts = []
      }
      accounts.forEach((account) => {
        const index = _accounts?.findIndex((el) => el.ID === account.ID)
        _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
      })
      this.UserAccounts.set(appID, _accounts)
    },
    delAccount  (appID: string | undefined, accountID: string) {
      appID = formalizeAppID(appID)
      let _accounts = this.UserAccounts.get(appID)
      if (!_accounts) {
        _accounts = []
      }
      const index = _accounts.findIndex((el) => el.ID === accountID)
      _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.UserAccounts.set(appID, _accounts)
    },
    createUserAccount (req: CreateUserAccountRequest, done: (error: boolean, row?: Account) => void) {
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
          this.delAccount(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getUserAccounts (req: GetUserAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
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
    getDepositAccount (req: GetDepositAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<GetDepositAccountRequest, GetDepositAccountResponse>(
        API.GET_DEPOSITACCOUNT,
        req,
        req.Message,
        (resp: GetDepositAccountResponse): void => {
          this.addAccounts(undefined, [resp.Info])
          done(false, resp.Info)
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
    getDepositAccounts (req: GetDepositAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetDepositAccountsRequest, GetDepositAccountsResponse>(
        API.GET_APP_USERACCOUNTS,
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
    }
  }
})

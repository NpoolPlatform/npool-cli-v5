import { defineStore } from 'pinia'
import {
  CreateTransferAccountRequest,
  CreateTransferAccountResponse,
  DeleteTransferAccountRequest,
  DeleteTransferAccountResponse,
  GetTransferAccountsRequest,
  GetTransferAccountsResponse,
  TransferAccount,
  GetAppTransferAccountsRequest,
  GetAppTransferAccountsResponse
} from './types'
import { doActionWithError } from '../../../request'
import { API } from './const'
import { formalizeAppID } from '../../../appuser/app/local'

export const useTransferAccountStore = defineStore('transfer-account', {
  state: () => ({
    TransferAccounts: new Map<string, Array<TransferAccount>>()
  }),
  getters: {
    transferAccounts (): (appID: string | undefined) => Array<TransferAccount> | undefined {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.TransferAccounts.get(appID)?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
      }
    },
    addTransferAccounts (): (appID: string | undefined, accounts: Array<TransferAccount>) => void {
      return (appID: string | undefined, accounts: Array<TransferAccount>) => {
        appID = formalizeAppID(appID)
        let _accounts = this.TransferAccounts.get(appID)
        if (!_accounts) {
          _accounts = []
        }
        _accounts.push(...accounts)
        this.TransferAccounts.set(appID, _accounts)
      }
    },
    delTransferAccount (): (appID: string | undefined, accountID: string) => void {
      return (appID: string | undefined, accountID: string) => {
        appID = formalizeAppID(appID)
        let _accounts = this.TransferAccounts.get(appID)
        if (!_accounts) {
          _accounts = []
        }
        const index = _accounts.findIndex((el) => el.ID === accountID)
        _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.TransferAccounts.set(appID, _accounts)
      }
    }
  },
  actions: {
    createTransfer (req: CreateTransferAccountRequest, done: (error: boolean, row?: TransferAccount) => void) {
      doActionWithError<CreateTransferAccountRequest, CreateTransferAccountResponse>(
        API.CREATE_TRANSFER,
        req,
        req.Message,
        (resp: CreateTransferAccountResponse): void => {
          this.addTransferAccounts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteTransfer (req: DeleteTransferAccountRequest, done: (error: boolean, row?: TransferAccount) => void) {
      doActionWithError<DeleteTransferAccountRequest, DeleteTransferAccountResponse>(
        API.DELETE_TRANSFER,
        req,
        req.Message,
        (resp: DeleteTransferAccountResponse): void => {
          this.delTransferAccount(undefined, req.TransferID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getTransfers (req: GetTransferAccountsRequest, done: (error: boolean, rows?: Array<TransferAccount>) => void) {
      doActionWithError<GetTransferAccountsRequest, GetTransferAccountsResponse>(
        API.GET_TRANSFERS,
        req,
        req.Message,
        (resp: GetTransferAccountsResponse): void => {
          this.addTransferAccounts(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getAppTransfers (req: GetAppTransferAccountsRequest, done: (error: boolean, rows?: Array<TransferAccount>) => void) {
      doActionWithError<GetAppTransferAccountsRequest, GetAppTransferAccountsResponse>(
        API.GET_APP_TRANSFERS,
        req,
        req.Message,
        (resp: GetAppTransferAccountsResponse): void => {
          this.addTransferAccounts(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})
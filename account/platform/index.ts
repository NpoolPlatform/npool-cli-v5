import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import { AccountUsedFor } from '../base'
import {
  Account,
  GetPlatformAccountsRequest,
  GetPlatformAccountsResponse,
  CreatePlatformAccountRequest,
  CreatePlatformAccountResponse,
  UpdatePlatformAccountRequest,
  UpdatePlatformAccountResponse
} from './types'

export const usePlatformAccountStore = defineStore('platform-accounts', {
  state: () => ({
    PlatformAccounts: [] as Array<Account>
  }),
  getters: {
    accounts (): (usedFor?: AccountUsedFor) => Array<Account> {
      return (usedFor?: AccountUsedFor) => {
        if (!usedFor) {
          return this.PlatformAccounts
        }
        return this.PlatformAccounts.filter((el) => el.UsedFor === usedFor)
      }
    },
    addAccounts (): (accounts: Array<Account>) => void {
      return (accounts: Array<Account>) => {
        const _accounts = this.PlatformAccounts
        accounts.forEach((account) => {
          const index = _accounts?.findIndex((el) => el.ID === account.ID)
          _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
        })
      }
    }
  },
  actions: {
    getPlatformAccounts (req: GetPlatformAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetPlatformAccountsRequest, GetPlatformAccountsResponse>(
        API.GET_PLATFORMACCOUNTS,
        req,
        req.Message,
        (resp: GetPlatformAccountsResponse): void => {
          this.addAccounts(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updatePlatformAccount (req: UpdatePlatformAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<UpdatePlatformAccountRequest, UpdatePlatformAccountResponse>(
        API.UPDATE_PLATFORMACCOUNT,
        req,
        req.Message,
        (resp: UpdatePlatformAccountResponse): void => {
          this.addAccounts([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createPlatformAccount (req: CreatePlatformAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<CreatePlatformAccountRequest, CreatePlatformAccountResponse>(
        API.CREATE_PLATFORMACCOUNT,
        req,
        req.Message,
        (resp: CreatePlatformAccountResponse): void => {
          this.addAccounts([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

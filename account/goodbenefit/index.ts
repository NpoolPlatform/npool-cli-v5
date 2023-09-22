import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Account,
  GetGoodBenefitAccountsRequest,
  GetGoodBenefitAccountsResponse,
  CreateGoodBenefitAccountRequest,
  CreateGoodBenefitAccountResponse,
  UpdateGoodBenefitAccountRequest,
  UpdateGoodBenefitAccountResponse
} from './types'

export const useGoodBenefitAccountStore = defineStore('goodbenefit-accounts', {
  state: () => ({
    GoodBenefitAccounts: [] as Array<Account>
  }),
  getters: {
    accounts () {
      return () => {
        return this.GoodBenefitAccounts
      }
    }
  },
  actions: {
    addAccounts (accounts: Array<Account>) {
      const _accounts = this.GoodBenefitAccounts
      accounts.forEach((account) => {
        if (!account) return
        const index = _accounts?.findIndex((el) => el.ID === account.ID)
        _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
      })
    },
    getGoodBenefitAccounts (req: GetGoodBenefitAccountsRequest, done: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<GetGoodBenefitAccountsRequest, GetGoodBenefitAccountsResponse>(
        API.GET_GOODBENEFITACCOUNTS,
        req,
        req.Message,
        (resp: GetGoodBenefitAccountsResponse): void => {
          this.addAccounts(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateGoodBenefitAccount (req: UpdateGoodBenefitAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<UpdateGoodBenefitAccountRequest, UpdateGoodBenefitAccountResponse>(
        API.UPDATE_GOODBENEFITACCOUNT,
        req,
        req.Message,
        (resp: UpdateGoodBenefitAccountResponse): void => {
          this.addAccounts([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createGoodBenefitAccount (req: CreateGoodBenefitAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<CreateGoodBenefitAccountRequest, CreateGoodBenefitAccountResponse>(
        API.CREATE_GOODBENEFITACCOUNT,
        req,
        req.Message,
        (resp: CreateGoodBenefitAccountResponse): void => {
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

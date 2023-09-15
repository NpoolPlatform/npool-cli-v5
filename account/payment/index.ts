import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Account,
  GetPaymentAccountsRequest,
  GetPaymentAccountsResponse,
  UpdatePaymentAccountRequest,
  UpdatePaymentAccountResponse
} from './types'

export const usePaymentAccountStore = defineStore('payment-accounts', {
  state: () => ({
    PaymentAccounts: [] as Array<Account>
  }),
  getters: {
    addAccounts (): (accounts: Array<Account>) => void {
      return (accounts: Array<Account>) => {
        const _accounts = this.PaymentAccounts
        accounts.forEach((account) => {
          const index = _accounts?.findIndex((el) => el.ID === account.ID)
          _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
        })
      }
    }
  },
  actions: {
    getPaymentAccounts (req: GetPaymentAccountsRequest, done: (error: boolean, rows?: Array<Account>,) => void) {
      doActionWithError<GetPaymentAccountsRequest, GetPaymentAccountsResponse>(
        API.GET_PAYMENTACCOUNTS,
        req,
        req.Message,
        (resp: GetPaymentAccountsResponse): void => {
          this.addAccounts(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updatePaymentAccount (req: UpdatePaymentAccountRequest, done: (error: boolean, row?: Account) => void) {
      doActionWithError<UpdatePaymentAccountRequest, UpdatePaymentAccountResponse>(
        API.UPDATE_PAYMENTACCOUNT,
        req,
        req.Message,
        (resp: UpdatePaymentAccountResponse): void => {
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

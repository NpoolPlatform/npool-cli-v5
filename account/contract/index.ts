import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Account,
  AdminGetContractAccountsRequest,
  AdminGetContractAccountsResponse
} from './types'

export const useContractAccountStore = defineStore('contract-accounts', {
  state: () => ({
    ContractAccounts: [] as Array<Account>
  }),
  getters: {
    accounts (): Array<Account> {
      return this.ContractAccounts
    }
  },
  actions: {
    addAccounts (accounts: Array<Account>) {
      const _accounts = this.ContractAccounts
      accounts.forEach((account) => {
        if (!account) return
        const index = _accounts?.findIndex((el) => el.ID === account.ID)
        _accounts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, account)
      })
    },
    getContractAccounts (req: AdminGetContractAccountsRequest, done?: (error: boolean, rows?: Array<Account>) => void) {
      doActionWithError<AdminGetContractAccountsRequest, AdminGetContractAccountsResponse>(
        API.ADMIN_GET_CONTRACTACCOUNTS,
        req,
        req.Message,
        (resp: AdminGetContractAccountsResponse): void => {
          this.addAccounts(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

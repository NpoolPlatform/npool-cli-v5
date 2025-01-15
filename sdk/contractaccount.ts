import { computed } from 'vue'
import { contractaccount, notify, constant } from '..'

const _contractAccount = contractaccount.useContractAccountStore()

const adminGetPageContractAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _contractAccount.getContractAccounts({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_CONTRACT_ACCOUNTS',
        Message: 'MSG_GET_CONTRACT_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<contractaccount.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageContractAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetContractAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageContractAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const contractAccounts = computed(() => _contractAccount.accounts)

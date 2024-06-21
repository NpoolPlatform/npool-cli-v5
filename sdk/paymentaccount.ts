import { computed } from 'vue'
import { paymentaccount, notify, constant } from '..'

const _paymentccount = paymentaccount.usePaymentAccountStore()

const adminGetPagePaymentAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _paymentccount.getPaymentAccounts({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_PAYMENT_ACCOUNTS',
        Message: 'MSG_GET_PAYMENT_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<paymentaccount.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePaymentAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetPaymentAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePaymentAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const paymentAccounts = computed(() => _paymentccount.accounts)

export const adminUpdatePaymentAccount = (account: paymentaccount.Account, done?: (error: boolean, account?: paymentaccount.Account) => void) => {
  _paymentccount.updatePaymentAccount({
    ...account,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_PAYMENT_ACCOUNT',
        Message: 'MSG_UPDATE_PAYMENT_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

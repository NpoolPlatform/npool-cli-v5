import { computed } from 'vue'
import { goodbenefitaccount, notify, constant } from '..'

const _goodBenefitAccount = goodbenefitaccount.useGoodBenefitAccountStore()

const adminGetPageGoodBenefitAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _goodBenefitAccount.getGoodBenefitAccounts({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOD_BENEFIT_ACCOUNTS',
        Message: 'MSG_GET_GOOD_BENEFIT_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<goodbenefitaccount.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageGoodBenefitAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodBenefitAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageGoodBenefitAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodBenefitAccounts = computed(() => _goodBenefitAccount.accounts)

export const adminCreateGoodBenefitAccount = (account: goodbenefitaccount.Account, done?: (error: boolean, account?: goodbenefitaccount.Account) => void) => {
  _goodBenefitAccount.createGoodBenefitAccount({
    ...account,
    Message: {
      Error: {
        Title: 'MSG_CREATE_GOOD_BENEFIT_ACCOUNT',
        Message: 'MSG_CREATE_GOOD_BENEFIT_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateGoodBenefitAccount = (account: goodbenefitaccount.Account, done?: (error: boolean, account?: goodbenefitaccount.Account) => void) => {
  _goodBenefitAccount.updateGoodBenefitAccount({
    ...account,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_GOOD_BENEFIT_ACCOUNT',
        Message: 'MSG_UPDATE_GOOD_BENEFIT_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

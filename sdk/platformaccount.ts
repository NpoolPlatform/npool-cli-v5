import { platformaccount, notify, constant, accountbase } from '..'

const _platformAccount = platformaccount.usePlatformAccountStore()

const adminGetPagePlatformAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _platformAccount.getPlatformAccounts({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_PLATFORM_ACCOUNTS',
        Message: 'MSG_GET_PLATFORM_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<platformaccount.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePlatformAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetPlatformAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePlatformAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const platformAccounts = (usedFor?: accountbase.AccountUsedFor) => _platformAccount.accounts(usedFor)

export const adminCreatePlatformAccount = (account: platformaccount.Account, done?: (error: boolean, account?: platformaccount.Account) => void) => {
  _platformAccount.createPlatformAccount({
    ...account,
    Message: {
      Error: {
        Title: 'MSG_CREATE_PLATFORM_ACCOUNT',
        Message: 'MSG_CREATE_PLATFORM_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdatePlatformAccount = (account: platformaccount.Account, done?: (error: boolean, account?: platformaccount.Account) => void) => {
  _platformAccount.updatePlatformAccount({
    ...account,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_PLATFORM_ACCOUNT',
        Message: 'MSG_UPDATE_PLATFORM_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

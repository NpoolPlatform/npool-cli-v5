import { useraccount, constant, notify, accountbase, useraccountbase, appuserbase } from '..'

const _useraccount = useraccount.useUserAccountStore()

const getPageUserAccounts = (usedFor: accountbase.AccountUsedFor, offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _useraccount.getUserAccounts({
    UsedFor: usedFor,
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_USER_ACCOUNTS',
        Message: 'MSG_GET_USER_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<useraccountbase.Account>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageUserAccounts(usedFor, offset, limit, ++pageIndex, done)
  })
}

export const getUserAccounts = (usedFor: accountbase.AccountUsedFor, offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageUserAccounts(usedFor, offset, limit, 0, done)
}

export const createUserAccount = (coinTypeID: string, usedFor: accountbase.AccountUsedFor, address: string, memo: string | undefined, labels: string[], account: string, accountType: appuserbase.SignMethodType, verificationCode: string, done: (error: boolean, row?: useraccountbase.Account) => void) => {
  _useraccount.createUserAccount({
    CoinTypeID: coinTypeID,
    UsedFor: usedFor,
    Address: address,
    Memo: memo,
    Labels: labels,
    Account: account,
    AccountType: accountType,
    VerificationCode: verificationCode,
    Message: {
      Error: {
        Title: 'MSG_CREATE_USER_ACCOUNT',
        Message: 'MSG_CREATE_USER_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const userAccounts = (coinTypeID: string, usedFor: accountbase.AccountUsedFor) => _useraccount.accounts(undefined, undefined, coinTypeID, usedFor)

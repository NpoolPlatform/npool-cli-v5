import { transferaccount, constant, notify, appuserbase } from '..'
import { AppID } from './localapp'

const _transferaccount = transferaccount.useTransferAccountStore()

const getPageTransferAccounts = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _transferaccount.getTransfers({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_TRANSFER_ACCOUNTS',
        Message: 'MSG_GET_TRANSFER_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<transferaccount.TransferAccount>, totalRows?: number) => {
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
    getPageTransferAccounts(offset, limit, ++pageIndex, done)
  })
}

export const getTransferAccounts = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageTransferAccounts(offset, limit, 0, done)
}

export const createTransferAccount = (account: string, accountType: appuserbase.SignMethodType, verificationCode: string, targetAccount: string, targetAccountType: appuserbase.SignMethodType, done?: (error: boolean, row?: transferaccount.TransferAccount) => void) => {
  _transferaccount.createTransfer({
    Account: account,
    AccountType: accountType,
    VerificationCode: verificationCode,
    TargetAccount: targetAccount,
    TargetAccountType: targetAccountType,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TRANSFER_ACCOUNT',
        Message: 'MSG_CREATE_TRANSFER_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const transferAccounts = (userID?: string) => _transferaccount.transferAccounts(AppID.value, userID)
export const transferAccount = (accountID: string) => _transferaccount.transferAccount(undefined, accountID)
export const transferAccountName = (accountID: string) => transferAccount(accountID)?.TargetEmailAddress || transferAccount(accountID)?.TargetPhoneNO

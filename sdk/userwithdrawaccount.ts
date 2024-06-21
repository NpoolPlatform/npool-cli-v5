import { userwithdrawaccount, notify, useraccountbase } from '..'
import { AppID } from './localapp'

const _userWithdrawAccount = userwithdrawaccount.useUserAccountStore()

const getPageMyUserWithdrawAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userWithdrawAccount.totalPages(undefined), _userWithdrawAccount.totalRows(undefined))
  }
  _userWithdrawAccount.initializePager(undefined)
  if (_userWithdrawAccount.pageLoaded(undefined, pageIndex) || _userWithdrawAccount.pageLoading(undefined, pageIndex)) {
    _userWithdrawAccount.incrementPageStart(undefined)
    getPageMyUserWithdrawAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userWithdrawAccount.loadPage(undefined, pageIndex)
  _userWithdrawAccount.getUserAccounts({
    Offset: pageIndex * _userWithdrawAccount.pageLimit(undefined),
    Limit: _userWithdrawAccount.pageLimit(undefined),
    Message: {
      Error: {
        Title: 'MSG_GET_USER_ACCOUNTS',
        Message: 'MSG_GET_USER_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<useraccountbase.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / _userWithdrawAccount.pageLimit(undefined))
      if (total) {
        _userWithdrawAccount.setTotalPages(undefined, totalPages)
        _userWithdrawAccount.setTotalRows(undefined, total || 0)
      }
      _userWithdrawAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userWithdrawAccount.loadedPage(undefined, pageIndex)
    _userWithdrawAccount.incrementPageStart(undefined)
    getPageMyUserWithdrawAccounts(++pageIndex, pageEnd, done)
  })
}

export const getMyUserWithdrawAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userWithdrawAccount.pageStart(undefined)
  getPageMyUserWithdrawAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageUserWithdrawAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userWithdrawAccount.totalPages(undefined), _userWithdrawAccount.totalRows(undefined))
  }
  _userWithdrawAccount.initializePager(undefined)
  if (_userWithdrawAccount.pageLoaded(undefined, pageIndex) || _userWithdrawAccount.pageLoading(undefined, pageIndex)) {
    _userWithdrawAccount.incrementPageStart(undefined)
    getPageUserWithdrawAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userWithdrawAccount.loadPage(undefined, pageIndex)
  _userWithdrawAccount.getAppUserAccounts({
    Offset: pageIndex * _userWithdrawAccount.pageLimit(undefined),
    Limit: _userWithdrawAccount.pageLimit(undefined),
    Message: {
      Error: {
        Title: 'MSG_GET_USER_ACCOUNTS',
        Message: 'MSG_GET_USER_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<useraccountbase.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / _userWithdrawAccount.pageLimit(undefined))
      if (total) {
        _userWithdrawAccount.setTotalPages(undefined, totalPages)
        _userWithdrawAccount.setTotalRows(undefined, total || 0)
      }
      _userWithdrawAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userWithdrawAccount.loadedPage(undefined, pageIndex)
    _userWithdrawAccount.incrementPageStart(undefined)
    getPageUserWithdrawAccounts(++pageIndex, pageEnd, done)
  })
}

export const getUserWithdrawAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userWithdrawAccount.pageStart(undefined)
  getPageUserWithdrawAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageUserWithdrawAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userWithdrawAccount.totalPages(AppID.value), _userWithdrawAccount.totalRows(AppID.value))
  }
  _userWithdrawAccount.initializePager(AppID.value)
  if (_userWithdrawAccount.pageLoaded(AppID.value, pageIndex) || _userWithdrawAccount.pageLoading(AppID.value, pageIndex)) {
    _userWithdrawAccount.incrementPageStart(AppID.value)
    adminGetPageUserWithdrawAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userWithdrawAccount.loadPage(AppID.value, pageIndex)
  _userWithdrawAccount.getNAppUserAccounts({
    TargetAppID: AppID.value,
    Offset: pageIndex * _userWithdrawAccount.pageLimit(AppID.value),
    Limit: _userWithdrawAccount.pageLimit(AppID.value),
    Message: {
      Error: {
        Title: 'MSG_GET_USER_ACCOUNTS',
        Message: 'MSG_GET_USER_ACCOUNTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, accounts?: Array<useraccountbase.Account>, total?: number) => {
    if (error || !accounts?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / _userWithdrawAccount.pageLimit(AppID.value))
      if (total) {
        _userWithdrawAccount.setTotalPages(AppID.value, totalPages)
        _userWithdrawAccount.setTotalRows(AppID.value, total || 0)
      }
      _userWithdrawAccount.subtractPageStart(AppID.value)
      done?.(error, totalPages, total as number)
      return
    }
    _userWithdrawAccount.loadedPage(AppID.value, pageIndex)
    _userWithdrawAccount.incrementPageStart(AppID.value)
    adminGetPageUserWithdrawAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetUserWithdrawAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userWithdrawAccount.pageStart(AppID.value)
  adminGetPageUserWithdrawAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const userWithdrawAccounts = (userID: string | undefined, coinTypeID: string | undefined) => _userWithdrawAccount.accounts(AppID.value, userID, coinTypeID)

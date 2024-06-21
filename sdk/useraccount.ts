import { useraccount, notify, useraccountbase } from '..'
import { AppID } from './localapp'

const _userAccount = useraccount.useUserAccountStore()

const getPageUserAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userAccount.totalPages(undefined), _userAccount.totalRows(undefined))
  }
  _userAccount.initializePager(undefined)
  if (_userAccount.pageLoaded(undefined, pageIndex) || _userAccount.pageLoading(undefined, pageIndex)) {
    _userAccount.incrementPageStart(undefined)
    getPageUserAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userAccount.loadPage(undefined, pageIndex)
  _userAccount.getAppUserAccounts({
    Offset: pageIndex * _userAccount.pageLimit(undefined),
    Limit: _userAccount.pageLimit(undefined),
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
      const totalPages = Math.ceil(total as number / _userAccount.pageLimit(undefined))
      if (total) {
        _userAccount.setTotalPages(undefined, totalPages)
        _userAccount.setTotalRows(undefined, total || 0)
      }
      _userAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userAccount.loadedPage(undefined, pageIndex)
    _userAccount.incrementPageStart(undefined)
    getPageUserAccounts(++pageIndex, pageEnd, done)
  })
}

export const getUserAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userAccount.pageStart(undefined)
  getPageUserAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageUserAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userAccount.totalPages(AppID.value), _userAccount.totalRows(AppID.value))
  }
  _userAccount.initializePager(AppID.value)
  if (_userAccount.pageLoaded(AppID.value, pageIndex) || _userAccount.pageLoading(AppID.value, pageIndex)) {
    _userAccount.incrementPageStart(AppID.value)
    adminGetPageUserAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userAccount.loadPage(AppID.value, pageIndex)
  _userAccount.getNAppUserAccounts({
    TargetAppID: AppID.value,
    Offset: pageIndex * _userAccount.pageLimit(AppID.value),
    Limit: _userAccount.pageLimit(AppID.value),
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
      const totalPages = Math.ceil(total as number / _userAccount.pageLimit(AppID.value))
      if (total) {
        _userAccount.setTotalPages(AppID.value, totalPages)
        _userAccount.setTotalRows(AppID.value, total || 0)
      }
      _userAccount.subtractPageStart(AppID.value)
      done?.(error, totalPages, total as number)
      return
    }
    _userAccount.loadedPage(AppID.value, pageIndex)
    _userAccount.incrementPageStart(AppID.value)
    adminGetPageUserAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetUserAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userAccount.pageStart(AppID.value)
  adminGetPageUserAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

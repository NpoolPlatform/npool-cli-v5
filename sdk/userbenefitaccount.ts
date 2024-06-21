import { computed } from 'vue'
import { userbenefitaccount, notify, useraccountbase } from '..'
import { AppID } from './localapp'

const _userBenefitAccount = userbenefitaccount.useUserAccountStore()

const getPageMyUserBenefitAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userBenefitAccount.totalPages(undefined), _userBenefitAccount.totalRows(undefined))
  }
  _userBenefitAccount.initializePager(undefined)
  if (_userBenefitAccount.pageLoaded(undefined, pageIndex) || _userBenefitAccount.pageLoading(undefined, pageIndex)) {
    _userBenefitAccount.incrementPageStart(undefined)
    getPageMyUserBenefitAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userBenefitAccount.loadPage(undefined, pageIndex)
  _userBenefitAccount.getUserAccounts({
    Offset: pageIndex * _userBenefitAccount.pageLimit(undefined),
    Limit: _userBenefitAccount.pageLimit(undefined),
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
      const totalPages = Math.ceil(total as number / _userBenefitAccount.pageLimit(undefined))
      if (total) {
        _userBenefitAccount.setTotalPages(undefined, totalPages)
        _userBenefitAccount.setTotalRows(undefined, total || 0)
      }
      _userBenefitAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userBenefitAccount.loadedPage(undefined, pageIndex)
    _userBenefitAccount.incrementPageStart(undefined)
    getPageMyUserBenefitAccounts(++pageIndex, pageEnd, done)
  })
}

export const getMyUserBenefitAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userBenefitAccount.pageStart(undefined)
  getPageMyUserBenefitAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageUserBenefitAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userBenefitAccount.totalPages(undefined), _userBenefitAccount.totalRows(undefined))
  }
  _userBenefitAccount.initializePager(undefined)
  if (_userBenefitAccount.pageLoaded(undefined, pageIndex) || _userBenefitAccount.pageLoading(undefined, pageIndex)) {
    _userBenefitAccount.incrementPageStart(undefined)
    getPageUserBenefitAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userBenefitAccount.loadPage(undefined, pageIndex)
  _userBenefitAccount.getAppUserAccounts({
    Offset: pageIndex * _userBenefitAccount.pageLimit(undefined),
    Limit: _userBenefitAccount.pageLimit(undefined),
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
      const totalPages = Math.ceil(total as number / _userBenefitAccount.pageLimit(undefined))
      if (total) {
        _userBenefitAccount.setTotalPages(undefined, totalPages)
        _userBenefitAccount.setTotalRows(undefined, total || 0)
      }
      _userBenefitAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userBenefitAccount.loadedPage(undefined, pageIndex)
    _userBenefitAccount.incrementPageStart(undefined)
    getPageUserBenefitAccounts(++pageIndex, pageEnd, done)
  })
}

export const getUserBenefitAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userBenefitAccount.pageStart(undefined)
  getPageUserBenefitAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageUserBenefitAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userBenefitAccount.totalPages(AppID.value), _userBenefitAccount.totalRows(AppID.value))
  }
  _userBenefitAccount.initializePager(AppID.value)
  if (_userBenefitAccount.pageLoaded(AppID.value, pageIndex) || _userBenefitAccount.pageLoading(AppID.value, pageIndex)) {
    _userBenefitAccount.incrementPageStart(AppID.value)
    adminGetPageUserBenefitAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userBenefitAccount.loadPage(AppID.value, pageIndex)
  _userBenefitAccount.getNAppUserAccounts({
    TargetAppID: AppID.value,
    Offset: pageIndex * _userBenefitAccount.pageLimit(AppID.value),
    Limit: _userBenefitAccount.pageLimit(AppID.value),
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
      const totalPages = Math.ceil(total as number / _userBenefitAccount.pageLimit(AppID.value))
      if (total) {
        _userBenefitAccount.setTotalPages(AppID.value, totalPages)
        _userBenefitAccount.setTotalRows(AppID.value, total || 0)
      }
      _userBenefitAccount.subtractPageStart(AppID.value)
      done?.(error, totalPages, total as number)
      return
    }
    _userBenefitAccount.loadedPage(AppID.value, pageIndex)
    _userBenefitAccount.incrementPageStart(AppID.value)
    adminGetPageUserBenefitAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetUserBenefitAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userBenefitAccount.pageStart(AppID.value)
  adminGetPageUserBenefitAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const userBenefitAccounts = computed(() => _userBenefitAccount.accounts(AppID.value))

import { computed } from 'vue'
import { userdepositaccount, notify, useraccountbase } from '..'
import { AppID } from './localapp'

const _userDepositAccount = userdepositaccount.useUserAccountStore()

const getPageUserDepositAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userDepositAccount.totalPages(undefined), _userDepositAccount.totalRows(undefined))
  }
  _userDepositAccount.initializePager(undefined)
  if (_userDepositAccount.pageLoaded(undefined, pageIndex) || _userDepositAccount.pageLoading(undefined, pageIndex)) {
    _userDepositAccount.incrementPageStart(undefined)
    getPageUserDepositAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userDepositAccount.loadPage(undefined, pageIndex)
  _userDepositAccount.getDepositAccounts({
    Offset: pageIndex * _userDepositAccount.pageLimit(undefined),
    Limit: _userDepositAccount.pageLimit(undefined),
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
      const totalPages = Math.ceil(total as number / _userDepositAccount.pageLimit(undefined))
      if (total) {
        _userDepositAccount.setTotalPages(undefined, totalPages)
        _userDepositAccount.setTotalRows(undefined, total || 0)
      }
      _userDepositAccount.subtractPageStart(undefined)
      done?.(error, totalPages, total as number)
      return
    }
    _userDepositAccount.loadedPage(undefined, pageIndex)
    _userDepositAccount.incrementPageStart(undefined)
    getPageUserDepositAccounts(++pageIndex, pageEnd, done)
  })
}

export const getUserDepositAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userDepositAccount.pageStart(undefined)
  getPageUserDepositAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageUserDepositAccounts = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _userDepositAccount.totalPages(AppID.value), _userDepositAccount.totalRows(AppID.value))
  }
  _userDepositAccount.initializePager(AppID.value)
  if (_userDepositAccount.pageLoaded(AppID.value, pageIndex) || _userDepositAccount.pageLoading(AppID.value, pageIndex)) {
    _userDepositAccount.incrementPageStart(AppID.value)
    adminGetPageUserDepositAccounts(++pageIndex, pageEnd, done)
    return
  }
  _userDepositAccount.loadPage(AppID.value, pageIndex)
  _userDepositAccount.getAppDepositAccounts({
    TargetAppID: AppID.value,
    Offset: pageIndex * _userDepositAccount.pageLimit(AppID.value),
    Limit: _userDepositAccount.pageLimit(AppID.value),
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
      const totalPages = Math.ceil(total as number / _userDepositAccount.pageLimit(AppID.value))
      if (total) {
        _userDepositAccount.setTotalPages(AppID.value, totalPages)
        _userDepositAccount.setTotalRows(AppID.value, total || 0)
      }
      _userDepositAccount.subtractPageStart(AppID.value)
      done?.(error, totalPages, total as number)
      return
    }
    _userDepositAccount.loadedPage(AppID.value, pageIndex)
    _userDepositAccount.incrementPageStart(AppID.value)
    adminGetPageUserDepositAccounts(++pageIndex, pageEnd, done)
  })
}

export const adminGetUserDepositAccounts = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _userDepositAccount.pageStart(AppID.value)
  adminGetPageUserDepositAccounts(pageStart, pages ? pageStart + pages : pages, done)
}

export const getDepositAccount = (coinTypeID: string, done?: (error: boolean) => void) => {
  _userDepositAccount.getDepositAccount({
    CoinTypeID: coinTypeID,
    Message: {
      Error: {
        Title: 'MSG_GET_DEPOSIT_ACCOUNT',
        Message: 'MSG_GET_DEPOSIT_ACCOUNT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}
export const userDepositAccounts = computed(() => _userDepositAccount.accounts(AppID.value))

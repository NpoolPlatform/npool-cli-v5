import { computed } from 'vue'
import { appuser, constant, notify } from '..'
import { AppID } from './localapp'
import { encryptPassword } from '../utils'

const _appUser = appuser.useUserStore()

const getPageUsers = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appUser.getUsers({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_USERS',
        Message: 'MSG_GET_USERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appuser.User>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageUsers(++pageIndex, pageEnd, done)
  })
}

export const getUsers = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageUsers(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageUsers = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appUser.getAppUsers({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_USERS',
        Message: 'MSG_GET_USERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appuser.User>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageUsers(++pageIndex, pageEnd, done)
  })
}

export const adminGetUsers = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageUsers(pageStart, pages ? pageStart + pages : pages, done)
}

export const appUsers = computed(() => _appUser.appUsers(AppID.value))

export const adminCreateUser = (target: appuser.User, finish: (error: boolean) => void) => {
  const password = '123456789'
  _appUser.createAppUser({
    ...target,
    TargetAppID: target.AppID,
    PasswordHash: encryptPassword(password),
    Message: {
      Error: {
        Title: 'MSG_CREATE_USER',
        Message: 'MSG_CREATE_USER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_USER',
        Message: 'MSG_CREATE_USER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

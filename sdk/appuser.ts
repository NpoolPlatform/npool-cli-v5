import { computed } from 'vue'
import { appuser, appuserbase, constant, notify } from '..'
import { AppID } from './localapp'
import { encryptPassword } from '../utils'

const _appuser = appuser.useUserStore()

const getPageUsers = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appuser.getUsers({
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

export const _appuserMosts = computed(() => _appuser.appUsers(AppID.value))

export const createUser = (target: appuser.User, password: string, done: (error: boolean) => void) => {
  _appuser.createAppUser({
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
    done(error)
  })
}

export const login = (account: string, accountType: appuserbase.SignMethodType, password: string, manMachineSpec: string, envSpec: string, done: (error: boolean) => void) => {
  _appuser.login({
    Account: account,
    AccountType: accountType,
    PasswordHash: encryptPassword(password),
    ManMachineSpec: manMachineSpec,
    EnvironmentSpec: envSpec,
    Message: {
      Error: {
        Title: 'MSG_LOGIN',
        Message: 'MSG_LOGIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_LOGIN',
        Message: 'MSG_LOGIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    done(error)
  })
}

export const signup = (account: string, accountType: appuserbase.SignMethodType, password: string, verificationCode: string, invitationCode?: string, done?: (error: boolean) => void) => {
  _appuser.signup({
    Account: account,
    AccountType: accountType,
    PasswordHash: encryptPassword(password),
    VerificationCode: verificationCode,
    InvitationCode: invitationCode
  }, () => {
    done?.(false)
  })
}

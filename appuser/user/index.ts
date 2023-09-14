import { defineStore } from 'pinia'
import { useLocalUserStore } from './local'
import { doAction, doActionWithError } from '../../request'
import { API } from './const'
import {
  GetLoginHistoriesRequest,
  GetLoginHistoriesResponse,
  LoginRequest,
  LoginResponse,
  LoginVerifyRequest,
  LoginVerifyResponse,
  LogoutRequest,
  LogoutResponse,
  ResetUserRequest,
  ResetUserResponse,
  SignupRequest,
  SignupResponse,
  UpdateUserKolRequest,
  UpdateUserKolResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  CreateAppUserRequest,
  CreateAppUserResponse,
  GetAppUsersRequest,
  GetAppUsersResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpdateAppUserRequest,
  UpdateAppUserResponse
} from './types'
import { LoginHistory, User } from './base'
import { useMyApplicationStore } from '../app'

export const useUserStore = defineStore('users', {
  state: () => ({
    LoginHistories: [] as Array<LoginHistory>,
    Users: new Map<string, Array<User>>()
  }),
  getters: {
    loginHistories (): Array<LoginHistory> {
      return this.LoginHistories.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    appUser (): (appID: string, userID: string) => User | undefined {
      return (appID: string, userID: string) => {
        return this.Users.get(appID)?.find((el) => el.ID === userID)
      }
    },
    appUsers (): (appID: string) => Array<User> | undefined {
      return (appID: string) => {
        return this.Users.get(appID)
      }
    },
    addAppUsers (): (appID: string | undefined, users: Array<User>) => void {
      return (appID: string | undefined, users: Array<User>) => {
        if (!appID) {
          const myApp = useMyApplicationStore()
          if (!myApp.AppID) {
            return
          }
          appID = myApp.AppID
        }
        let _users = this.Users.get(appID)
        if (!_users) {
          _users = []
        }
        _users.push(...users)
        this.Users.set(appID, _users)
      }
    },
    updateAppUser (): (user: User) => void {
      return (user: User) => {
        let users = this.Users.get(user.AppID)
        if (!users) {
          users = []
        }
        const index = users.findIndex((el) => el.ID === user.ID)
        users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, user)
        this.Users.set(user.AppID, users)
      }
    },
    delAppUser (): (user: User) => void {
      return (user: User) => {
        let users = this.Users.get(user.AppID)
        if (!users) {
          users = []
        }
        const index = users.findIndex((el) => el.ID === user.ID)
        users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.Users.set(user.AppID, users)
      }
    }
  },
  actions: {
    login (req: LoginRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          this.updateAppUser(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    loginVerify (req: LoginVerifyRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<LoginVerifyRequest, LoginVerifyResponse>(
        API.LOGIN_VERIFY,
        req,
        req.Message,
        (resp: LoginVerifyResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          this.updateAppUser(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    signup (req: SignupRequest, done: () => void) {
      doAction<SignupRequest, SignupResponse>(
        API.SIGNUP,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    logout (req: LogoutRequest, done: (error: boolean) => void) {
      doActionWithError<LogoutRequest, LogoutResponse>(
        API.LOGOUT,
        req,
        req.Message,
        (): void => {
          const user = useLocalUserStore()
          this.delAppUser(user.User)
          user.restUser()
          done(false)
        }, () => {
          done(true)
        })
    },
    updateUser (req: UpdateUserRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<UpdateUserRequest, UpdateUserResponse>(
        API.UPDATE_USER,
        req,
        req.Message,
        (resp: UpdateUserResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          this.updateAppUser(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    resetUser (req: ResetUserRequest, done: (error: boolean) => void) {
      doActionWithError<ResetUserRequest, ResetUserResponse>(
        API.RESET_USER,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        })
    },
    getLoginHistories (req: GetLoginHistoriesRequest, done: (error: boolean, histories?: Array<LoginHistory>) => void) {
      doActionWithError<GetLoginHistoriesRequest, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.LoginHistories.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateUserKol (req: UpdateUserKolRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<UpdateUserKolRequest, UpdateUserKolResponse>(
        API.UPDATE_USERKOL,
        req,
        req.Message,
        (resp: UpdateUserKolResponse): void => {
          this.updateAppUser(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getAppUsers (req: GetAppUsersRequest, done: (error: boolean, rows?: Array<User>) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          this.addAppUsers(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createAppUser (req: CreateAppUserRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<CreateAppUserRequest, CreateAppUserResponse>(
        API.CREATE_APP_USER,
        req,
        req.Message,
        (resp: CreateAppUserResponse): void => {
          this.addAppUsers(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    getUsers (req: GetUsersRequest, done: (error: boolean, rows?: Array<User>) => void) {
      doActionWithError<GetUsersRequest, GetUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetUsersResponse): void => {
          this.addAppUsers(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppUser (req: UpdateAppUserRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<UpdateAppUserRequest, UpdateAppUserResponse>(
        API.UPDATE_APP_USER,
        req,
        req.Message,
        (resp: UpdateAppUserResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'
export * from './base'
export * from './local'

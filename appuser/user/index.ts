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
    Users: new Map<string, Map<string, User>>()
  }),
  getters: {
    loginHistories (): Array<LoginHistory> {
      return this.LoginHistories.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    getUserByAppUserID (): (appID: string, userID: string) => User | undefined {
      return (appID: string, userID: string) => {
        return this.Users.get(appID)?.get(userID)
      }
    },
    getUsersByAppID () {
      return (appID: string) => {
        return this.Users.get(appID)
      }
    }
  },
  actions: {
    login (req: LoginRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },
    loginVerify (req: LoginVerifyRequest, done: (resp: User, error: boolean) => void) {
      doActionWithError<LoginVerifyRequest, LoginVerifyResponse>(
        API.LOGIN_VERIFY,
        req,
        req.Message,
        (resp: LoginVerifyResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
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
          user.restUser()
          done(false)
        }, () => {
          done(true)
        })
    },
    updateUser (req: UpdateUserRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<UpdateUserRequest, UpdateUserResponse>(
        API.UPDATE_USER,
        req,
        req.Message,
        (resp: UpdateUserResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
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
    getLoginHistories (req: GetLoginHistoriesRequest, done: (histories: Array<LoginHistory>, error: boolean) => void) {
      doActionWithError<GetLoginHistoriesRequest, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.LoginHistories.push(...resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done(undefined as unknown as Array<LoginHistory>, true)
        }
      )
    },
    updateUserKol (req: UpdateUserKolRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<UpdateUserKolRequest, UpdateUserKolResponse>(
        API.UPDATE_USERKOL,
        req,
        req.Message,
        (resp: UpdateUserKolResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    },

    getAppUsers (req: GetAppUsersRequest, done: (users: Array<User>, error: boolean) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          let data = this.getUsersByAppID(req.TargetAppID) as Map<string, User>
          if (!data) {
            data = new Map<string, User>()
          }
          resp.Infos.forEach((user) => {
            data.set(user.ID, user)
          })
          this.Users.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    createAppUser (req: CreateAppUserRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<CreateAppUserRequest, CreateAppUserResponse>(
        API.CREATE_APP_USER,
        req,
        req.Message,
        (resp: CreateAppUserResponse): void => {
          let data = this.getUsersByAppID(req.TargetAppID)
          if (!data) {
            data = new Map<string, User>()
          }
          data.set(resp.Info.ID, resp.Info)
          this.Users.set(req.TargetAppID, data)
          done(resp.Info, false)
        }, () => {
          done({} as User, true)
        })
    },

    getUsers (req: GetUsersRequest, done: (user: Array<User>, error: boolean) => void) {
      doActionWithError<GetUsersRequest, GetUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetUsersResponse): void => {
          const myApp = useMyApplicationStore()
          if (!myApp.AppID) {
            done(resp.Infos, false)
            return
          }
          let data = this.getUsersByAppID(myApp.AppID) as Map<string, User>
          if (!data) {
            data = new Map<string, User>()
          }
          resp.Infos.forEach((user) => {
            data.set(user.ID, user)
          })
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppUser (req: UpdateAppUserRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<UpdateAppUserRequest, UpdateAppUserResponse>(
        API.UPDATE_APP_USER,
        req,
        req.Message,
        (resp: UpdateAppUserResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    }
  }
})

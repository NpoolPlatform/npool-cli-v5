import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import { User } from '../user'
import { App } from '../app'
import { Role } from '../role'
import { Auth } from '../authing'
import {
  CreateAdminAppsRequest,
  CreateAdminAppsResponse,
  CreateGenesisRolesRequest,
  CreateGenesisRolesResponse,
  CreateGenesisUserRequest,
  CreateGenesisUserResponse,
  GetAdminAppsRequest,
  GetAdminAppsResponse,
  GetGenesisRolesRequest,
  GetGenesisRolesResponse,
  GetGenesisUsersRequest,
  GetGenesisUsersResponse,
  AuthorizeGenesisRequest,
  AuthorizeGenesisResponse
} from './types'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    Apps: [] as Array<App>,
    Roles: [] as Array<Role>,
    Auths: [] as Array<Auth>,
    Users: [] as Array<User>
  }),
  getters: {},
  actions: {
    addApps (apps: Array<App>) {
      apps.forEach((app) => {
        const index = this.Apps.findIndex((el) => el.EntID === app.EntID)
        this.Apps.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, app)
      })
    },
    addRoles (roles: Array<Role>) {
      roles.forEach((role) => {
        const index = this.Roles.findIndex((el) => el.EntID === role.EntID)
        this.Roles.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, role)
      })
    },
    addAuths (auths: Array<Auth>) {
      auths.forEach((auth) => {
        const index = this.Auths.findIndex((el) => el.EntID === auth.EntID)
        this.Auths.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, auth)
      })
    },
    addUsers (users: Array<User>) {
      users.forEach((user) => {
        const index = this.Users.findIndex((el) => el.EntID === user.EntID)
        this.Users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, user)
      })
    },
    createAdminApps (req: CreateAdminAppsRequest, done: (error: boolean, apps?: Array<App>) => void) {
      doActionWithError<CreateAdminAppsRequest, CreateAdminAppsResponse>(
        API.CREATE_ADMIN_APPS,
        req,
        req.Message,
        (resp: CreateAdminAppsResponse): void => {
          this.addApps(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createGenesisRoles (req: CreateGenesisRolesRequest, done: (error: boolean, roles?: Array<Role>) => void) {
      doActionWithError<CreateGenesisRolesRequest, CreateGenesisRolesResponse>(
        API.CREATE_GENESIS_ROLES,
        req,
        req.Message,
        (resp: CreateGenesisRolesResponse): void => {
          this.addRoles(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createGenesisUser (req: CreateGenesisUserRequest, done: (error: boolean, user?: User) => void) {
      doActionWithError<CreateGenesisUserRequest, CreateGenesisUserResponse>(
        API.CREATE_GENESIS_USER,
        req,
        req.Message,
        (resp: CreateGenesisUserResponse): void => {
          this.addUsers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAdminApps (req: GetAdminAppsRequest, done: (error: boolean, apps?: Array<App>) => void) {
      doActionWithError<GetAdminAppsRequest, GetAdminAppsResponse>(
        API.GET_ADMIN_APPS,
        req,
        req.Message,
        (resp: GetAdminAppsResponse): void => {
          this.addApps(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getGenesisRoles (req: GetGenesisRolesRequest, done: (error: boolean, roles?: Array<Role>) => void) {
      doActionWithError<GetGenesisRolesRequest, GetGenesisRolesResponse>(
        API.GET_GENESIS_ROLES,
        req,
        req.Message,
        (resp: GetGenesisRolesResponse): void => {
          this.addRoles(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getGenesisUsers (req: GetGenesisUsersRequest, done: (error: boolean, users?: Array<User>) => void) {
      doActionWithError<GetGenesisUsersRequest, GetGenesisUsersResponse>(
        API.GET_GENESIS_USERS,
        req,
        req.Message,
        (resp: GetGenesisUsersResponse): void => {
          this.addUsers(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    authorizeGenesis (req: AuthorizeGenesisRequest, done: (error: boolean, auths?: Array<Auth>) => void) {
      doActionWithError<AuthorizeGenesisRequest, AuthorizeGenesisResponse>(
        API.AUTHORIZE_GENESIS,
        req,
        req.Message,
        (resp: AuthorizeGenesisResponse): void => {
          this.addAuths(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

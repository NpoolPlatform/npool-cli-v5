import { defineStore } from 'pinia'
import { API } from './const'
import {
  Role,
  AppRoleUser,
  RoleUser,
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  GetRolesRequest,
  GetRolesResponse,
  GetRoleUsersRequest,
  GetRoleUsersResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  CreateAppRoleUserRequest,
  CreateAppRoleUserResponse,
  DeleteAppRoleUserRequest,
  DeleteAppRoleUserResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../app/local'

export const useRoleStore = defineStore('roles', {
  state: () => ({
    Roles: new Map<string, Array<Role>>(),
    RoleUsers: new Map<string, Map<string, Array<AppRoleUser>>>()
  }),
  getters: {
    roles (): (appID: string | undefined) => Array<Role> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Roles.get(appID) || []
      }
    },
    roleUsers (): (appID: string | undefined, roleID: string) => Array<AppRoleUser> {
      return (appID: string | undefined, roleID: string) => {
        appID = formalizeAppID(appID)
        const roleUsers = this.RoleUsers.get(appID)
        return roleUsers?.get(roleID) || []
      }
    },
    addRoleUsers (): (appID: string | undefined, roleID: string, users: Array<AppRoleUser>) => void {
      return (appID: string | undefined, roleID: string, users: Array<AppRoleUser>) => {
        appID = formalizeAppID(appID)
        let roleUsers = this.RoleUsers.get(appID)
        if (!roleUsers) {
          roleUsers = new Map<string, Array<AppRoleUser>>()
        }
        let _users = roleUsers.get(roleID) as Array<AppRoleUser>
        if (!_users) {
          _users = []
        }
        _users.push(...users)
        roleUsers.set(roleID, _users)
        this.RoleUsers.set(appID, roleUsers)
      }
    },
    delRoleUser (): (appID: string | undefined, roleID: string, userID: string) => void {
      return (appID: string | undefined, roleID: string, userID: string) => {
        appID = formalizeAppID(appID)
        const roleUsers = this.RoleUsers.get(appID)
        if (!roleUsers) {
          return
        }
        const _users = roleUsers.get(roleID) as Array<AppRoleUser>
        if (!_users) {
          return
        }
        const index = _users.findIndex((el) => el.UserID === userID)
        _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        roleUsers.set(roleID, _users)
        this.RoleUsers.set(appID, roleUsers)
      }
    },
    addRoles (): (appID: string | undefined, roles: Array<Role>) => void {
      return (appID: string | undefined, roles: Array<Role>) => {
        appID = formalizeAppID(appID)
        let _roles = this.Roles.get(appID) as Array<Role>
        if (!_roles) {
          _roles = []
        }
        roles.forEach((role) => {
          const index = _roles.findIndex((el) => el.ID === role.ID)
          _roles.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, role)
        })
        this.Roles.set(appID, _roles)
      }
    }
  },
  actions: {
    getRoles (req: GetRolesRequest, done: (error: boolean, rows?: Array<Role>) => void) {
      doActionWithError<GetRolesRequest, GetRolesResponse>(
        API.GET_ROLES,
        req,
        req.Message,
        (resp: GetRolesResponse): void => {
          this.addRoles(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateRole (req: UpdateRoleRequest, done: (error: boolean, row?: Role) => void) {
      doActionWithError<UpdateRoleRequest, UpdateRoleResponse>(
        API.UPDATE_ROLE,
        req,
        req.Message,
        (resp: UpdateRoleResponse): void => {
          this.addRoles(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getRoleUsers (req: GetRoleUsersRequest, done: (error: boolean, rows?: Array<AppRoleUser>) => void) {
      doActionWithError<GetRoleUsersRequest, GetRoleUsersResponse>(
        API.GET_ROLEUSERS,
        req,
        req.Message,
        (resp: GetRoleUsersResponse): void => {
          this.addRoleUsers(undefined, req.RoleID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createRoleUser (req: CreateRoleUserRequest, done: (error: boolean, row?: AppRoleUser) => void) {
      doActionWithError<CreateRoleUserRequest, CreateRoleUserResponse>(
        API.CREATE_ROLEUSER,
        req,
        req.Message,
        (resp: CreateRoleUserResponse): void => {
          this.addRoleUsers(undefined, req.RoleID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteRoleUser (req: DeleteRoleUserRequest, done: (error: boolean, row?: RoleUser) => void) {
      doActionWithError<DeleteRoleUserRequest, DeleteRoleUserResponse>(
        API.DELETE_ROLEUSER,
        req,
        req.Message,
        (resp: DeleteRoleUserResponse): void => {
          this.delRoleUser(undefined, resp.Info.RoleID, resp.Info.UserID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    getAppRoles (req: GetAppRolesRequest, done: (error: boolean, rows?: Array<Role>) => void) {
      doActionWithError<GetAppRolesRequest, GetAppRolesResponse>(
        API.GET_APP_ROLES,
        req,
        req.Message,
        (resp: GetAppRolesResponse): void => {
          this.addRoles(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createAppRole (req: CreateAppRoleRequest, done: (error: boolean, row?: Role) => void) {
      doActionWithError<CreateAppRoleRequest, CreateAppRoleResponse>(
        API.CREATE_APP_ROLE,
        req,
        req.Message,
        (resp: CreateAppRoleResponse): void => {
          this.addRoles(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppRoleUsers (req: GetAppRoleUsersRequest, done: (error: boolean, rows?: Array<AppRoleUser>) => void) {
      doActionWithError<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
        API.GET_APP_ROLE_USERS,
        req,
        req.Message,
        (resp: GetAppRoleUsersResponse): void => {
          this.addRoleUsers(req.TargetAppID, req.RoleID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createAppRoleUser (req: CreateAppRoleUserRequest, done: (error: boolean, row?: AppRoleUser) => void) {
      doActionWithError<CreateAppRoleUserRequest, CreateAppRoleUserResponse>(
        API.CREATE_APP_ROLE_USER,
        req,
        req.Message,
        (resp: CreateAppRoleUserResponse): void => {
          this.addRoleUsers(req.TargetAppID, req.RoleID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteAppRoleUser (req: DeleteAppRoleUserRequest, done: (error: boolean, row?: RoleUser) => void) {
      doActionWithError<DeleteAppRoleUserRequest, DeleteAppRoleUserResponse>(
        API.DELETE_APP_ROLE_USER,
        req,
        req.Message,
        (resp: DeleteAppRoleUserResponse): void => {
          this.delRoleUser(undefined, resp.Info.RoleID, resp.Info.UserID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

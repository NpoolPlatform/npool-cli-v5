import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppNotifUsersRequest,
  GetAppNotifUsersResponse,
  CreateNotifUserRequest,
  CreateNotifUserResponse,
  DeleteNotifUserRequest,
  DeleteNotifUserResponse,
  User
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useNotifUserStore = defineStore('notif-users', {
  state: () => ({
    NotifUsers: new Map<string, Array<User>>()
  }),
  getters: {
    addUsers (): (appID: string | undefined, users: Array<User>) => void {
      return (appID: string | undefined, users: Array<User>) => {
        appID = formalizeAppID(appID)
        let _users = this.NotifUsers.get(appID) as Array<User>
        if (!_users) {
          _users = []
        }
        users.forEach((channel) => {
          const index = _users.findIndex((el) => el.ID === channel.ID)
          _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, channel)
        })
        this.NotifUsers.set(appID, _users)
      }
    },
    delUser (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const _users = this.NotifUsers.get(appID) as Array<User>
        if (!_users) {
          return
        }
        const index = _users.findIndex((el) => el.ID === id)
        _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.NotifUsers.set(appID, _users)
      }
    },
    users (): (appID?: string, userID?: string) => Array<User> {
      return (appID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        let _users = this.NotifUsers.get(appID) as Array<User>
        if (!_users) {
          _users = []
        }
        return _users?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    getAppNotifUsers (req: GetAppNotifUsersRequest, done: (error: boolean, rows: Array<User>) => void) {
      doActionWithError<GetAppNotifUsersRequest, GetAppNotifUsersResponse>(
        API.GET_NOTIFUSERS,
        req,
        req.Message,
        (resp: GetAppNotifUsersResponse): void => {
          this.addUsers(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<User>)
        }
      )
    },
    deleteNotifUser (req: DeleteNotifUserRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<DeleteNotifUserRequest, DeleteNotifUserResponse>(
        API.DELETE_NOTIFUSER,
        req,
        req.Message,
        (resp: DeleteNotifUserResponse): void => {
          this.delUser(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    },
    createNotifUser (req: CreateNotifUserRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<CreateNotifUserRequest, CreateNotifUserResponse>(
        API.CREATE_NOTIFUSER,
        req,
        req.Message,
        (resp: CreateNotifUserResponse): void => {
          this.addUsers(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

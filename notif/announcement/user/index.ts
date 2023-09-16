import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppAnnouncementUsersRequest,
  GetAppAnnouncementUsersResponse,
  CreateAnnouncementUserRequest,
  CreateAnnouncementUserResponse,
  DeleteAnnouncementUserRequest,
  DeleteAnnouncementUserResponse,
  GetNAppAnnouncementUsersRequest,
  GetNAppAnnouncementUsersResponse,
  User
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAnnouncementUserStore = defineStore('announcement-users', {
  state: () => ({
    AnnouncementUsers: new Map<string, Array<User>>()
  }),
  getters: {
    users (): (appID?: string) => Array<User> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AnnouncementUsers.get(appID) || []
      }
    },
    addUsers (): (appID: string | undefined, users: Array<User>) => void {
      return (appID: string | undefined, users: Array<User>) => {
        appID = formalizeAppID(appID)
        let _users = this.AnnouncementUsers.get(appID) as Array<User>
        if (!_users) {
          _users = []
        }
        users.forEach((channel) => {
          const index = _users.findIndex((el) => el.ID === channel.ID)
          _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, channel)
        })
        this.AnnouncementUsers.set(appID, _users)
      }
    },
    delUser (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const _users = this.AnnouncementUsers.get(appID) as Array<User>
        if (!_users) {
          return
        }
        const index = _users.findIndex((el) => el.ID === id)
        _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.AnnouncementUsers.set(appID, _users)
      }
    }
  },
  actions: {
    getAppAnnouncementUsers (req: GetAppAnnouncementUsersRequest, done: (error: boolean, rows: Array<User>) => void) {
      doActionWithError<GetAppAnnouncementUsersRequest, GetAppAnnouncementUsersResponse>(
        API.GET_ANNOUNCEMENTUSERS,
        req,
        req.Message,
        (resp: GetAppAnnouncementUsersResponse): void => {
          this.addUsers(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<User>)
        }
      )
    },
    deleteAnnouncementUser (req: DeleteAnnouncementUserRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<DeleteAnnouncementUserRequest, DeleteAnnouncementUserResponse>(
        API.DELETE_ANNOUNCEMENTUSER,
        req,
        req.Message,
        (resp: DeleteAnnouncementUserResponse): void => {
          this.delUser(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    },
    createAnnouncementUser (req: CreateAnnouncementUserRequest, done: (error: boolean, row?: User) => void) {
      doActionWithError<CreateAnnouncementUserRequest, CreateAnnouncementUserResponse>(
        API.CREATE_ANNOUNCEMENTUSER,
        req,
        req.Message,
        (resp: CreateAnnouncementUserResponse): void => {
          this.addUsers(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getNAppAnnouncementUsers (req: GetNAppAnnouncementUsersRequest, done: (error: boolean, rows: Array<User>) => void) {
      doActionWithError<GetNAppAnnouncementUsersRequest, GetNAppAnnouncementUsersResponse>(
        API.GET_N_APP_ANNOUNCEMENTUSERS,
        req,
        req.Message,
        (resp: GetNAppAnnouncementUsersResponse): void => {
          this.addUsers(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<User>)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

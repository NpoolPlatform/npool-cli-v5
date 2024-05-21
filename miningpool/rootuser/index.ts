import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  RootUser,
  AdminCreateRootUserRequest,
  AdminCreateRootUserResponse,
  AdminUpdateRootUserRequest,
  AdminUpdateRootUserResponse,
  AdminGetRootUsersRequest,
  AdminGetRootUsersResponse
} from './types'

export const useMiningpoolRootUserStore = defineStore('miningpool-rootusers', {
  state: () => ({
    RootUsers: [] as Array<RootUser>
  }),
  getters: {
    rootuser (): (id: string) => RootUser | undefined {
      return (id: string) => {
        return this.RootUsers.find((el: RootUser) => el.EntID === id)
      }
    },
    rootusers () {
      return () => {
        return this.RootUsers
      }
    }
  },
  actions: {
    addRootUsers (goods: Array<RootUser>) {
      goods.forEach((good) => {
        const index = this.RootUsers.findIndex((el: RootUser) => el.EntID === good.EntID)
        this.RootUsers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
    getRootUsers (req: AdminGetRootUsersRequest, done: (error: boolean, row?: Array<RootUser>) => void) {
      doActionWithError<AdminGetRootUsersRequest, AdminGetRootUsersResponse>(
        API.ADMIN_GET_ROOTUSERS,
        req,
        req.Message,
        (resp: AdminGetRootUsersResponse): void => {
          this.addRootUsers(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateRootUser (req: AdminUpdateRootUserRequest, done: (error: boolean, row?: RootUser) => void) {
      doActionWithError<AdminUpdateRootUserRequest, AdminUpdateRootUserResponse>(
        API.ADMIN_UPDATE_ROOTUSER,
        req,
        req.Message,
        (resp: AdminUpdateRootUserResponse): void => {
          this.addRootUsers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createRootUser (req: AdminCreateRootUserRequest, done: (error: boolean, row?: RootUser) => void) {
      doActionWithError<AdminCreateRootUserRequest, AdminCreateRootUserResponse>(
        API.ADMIN_CREATE_ROOTUSER,
        req,
        req.Message,
        (resp: AdminCreateRootUserResponse): void => {
          this.addRootUsers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

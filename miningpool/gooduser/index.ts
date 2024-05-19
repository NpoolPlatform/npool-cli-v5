import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  GoodUser,
  AdminCreateGoodUserRequest,
  AdminCreateGoodUserResponse,
  AdminGetGoodUsersRequest,
  AdminGetGoodUsersResponse
} from './types'

export const useMiningpoolGoodUserStore = defineStore('miningpool-goodusers', {
  state: () => ({
    GoodUsers: [] as Array<GoodUser>
  }),
  getters: {
    gooduser (): (id: string) => GoodUser | undefined {
      return (id: string) => {
        return this.GoodUsers.find((el: GoodUser) => el.EntID === id)
      }
    },
    goodusers () {
      return () => {
        return this.GoodUsers
      }
    }
  },
  actions: {
    addGoodUsers (goods: Array<GoodUser>) {
      goods.forEach((good) => {
        const index = this.GoodUsers.findIndex((el: GoodUser) => el.EntID === good.EntID)
        this.GoodUsers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
    getGoodUsers (req: AdminGetGoodUsersRequest, done: (error: boolean, row?: Array<GoodUser>) => void) {
      doActionWithError<AdminGetGoodUsersRequest, AdminGetGoodUsersResponse>(
        API.ADMIN_GET_GOODUSERS,
        req,
        req.Message,
        (resp: AdminGetGoodUsersResponse): void => {
          this.addGoodUsers(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createGoodUser (req: AdminCreateGoodUserRequest, done: (error: boolean, row?: GoodUser) => void) {
      doActionWithError<AdminCreateGoodUserRequest, AdminCreateGoodUserResponse>(
        API.ADMIN_CREATE_GOODUSER,
        req,
        req.Message,
        (resp: AdminCreateGoodUserResponse): void => {
          this.addGoodUsers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

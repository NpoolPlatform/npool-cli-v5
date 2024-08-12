import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Pool,
  AdminCreatePoolRequest,
  AdminCreatePoolResponse,
  AdminUpdatePoolRequest,
  AdminUpdatePoolResponse,
  AdminGetPoolsRequest,
  AdminGetPoolsResponse
} from './types'

export const useMiningpoolPoolStore = defineStore('miningPoolPools', {
  state: () => ({
    Pools: [] as Array<Pool>
  }),
  getters: {
    pool (): (id: string) => Pool | undefined {
      return (id: string) => {
        return this.Pools.find((el: Pool) => el.EntID === id)
      }
    },
    pools (): Array<Pool> {
      return this.Pools
    }
  },
  actions: {
    addPools (goods: Array<Pool>) {
      goods.forEach((good) => {
        const index = this.Pools.findIndex((el: Pool) => el.EntID === good.EntID)
        this.Pools.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
    getPools (req: AdminGetPoolsRequest, done: (error: boolean, row?: Array<Pool>) => void) {
      doActionWithError<AdminGetPoolsRequest, AdminGetPoolsResponse>(
        API.ADMIN_GET_POOLS,
        req,
        req.Message,
        (resp: AdminGetPoolsResponse): void => {
          this.addPools(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminUpdatePool (req: AdminUpdatePoolRequest, done?: (error: boolean, row?: Pool) => void) {
      doActionWithError<AdminUpdatePoolRequest, AdminUpdatePoolResponse>(
        API.ADMIN_UPDATE_POOL,
        req,
        req.Message,
        (resp: AdminUpdatePoolResponse): void => {
          this.addPools([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreatePool (req: AdminCreatePoolRequest, done?: (error: boolean, row?: Pool) => void) {
      doActionWithError<AdminCreatePoolRequest, AdminCreatePoolResponse>(
        API.ADMIN_CREATE_POOL,
        req,
        req.Message,
        (resp: AdminCreatePoolResponse): void => {
          this.addPools([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

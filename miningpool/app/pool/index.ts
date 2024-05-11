import { doActionWithError } from '../../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Pool,
  AdminCreatePoolRequest,
  AdminCreatePoolResponse,
  GetPoolRequest,
  GetPoolResponse,
  GetPoolsRequest,
  GetPoolsResponse,
  AdminGetPoolsRequest,
  AdminGetPoolsResponse,
  AdminDeletePoolRequest,
  AdminDeletePoolResponse
} from './types'

export const useMiningpoolAppPoolStore = defineStore('miningpool-app-pools', {
  state: () => ({
    Pools: [] as Array<Pool>
  }),
  getters: {
    pools () {
      return () => {
        return this.Pools
      }
    }
  },
  actions: {
    addPools (pools: Array<Pool>) {
      const _pools = this.Pools
      pools.forEach((pool) => {
        if (!pool) return
        const index = _pools?.findIndex((el) => el.ID === pool.ID)
        _pools.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, pool)
      })
    },
    adminCreatePool (req: AdminCreatePoolRequest, done: (error: boolean, row: Pool) => void) {
      doActionWithError<AdminCreatePoolRequest, AdminCreatePoolResponse>(
        API.ADMIN_GET_POOLS,
        req,
        req.Message,
        (resp: AdminCreatePoolResponse): void => {
          this.addPools([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Pool)
        })
    },
    getPool (req: GetPoolRequest, done: (error: boolean, row: Pool) => void) {
      doActionWithError<GetPoolRequest, GetPoolResponse>(
        API.GET_POOL,
        req,
        req.Message,
        (resp: GetPoolResponse): void => {
          this.addPools([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Pool)
        })
    },
    getPools (req: GetPoolsRequest, done: (error: boolean, rows?: Array<Pool>) => void) {
      doActionWithError<GetPoolsRequest, GetPoolsResponse>(
        API.ADMIN_GET_POOLS,
        req,
        req.Message,
        (resp: GetPoolsResponse): void => {
          this.addPools(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminGetPools (req: AdminGetPoolsRequest, done: (error: boolean, rows?: Array<Pool>) => void) {
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
    adminDeletePool (req: AdminDeletePoolRequest, done: (error: boolean, row: Pool) => void) {
      doActionWithError<AdminDeletePoolRequest, AdminDeletePoolResponse>(
        API.ADMIN_GET_POOLS,
        req,
        req.Message,
        (resp: AdminDeletePoolResponse): void => {
          this.addPools([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Pool)
        })
    }
  }
})

export * from './const'
export * from './types'

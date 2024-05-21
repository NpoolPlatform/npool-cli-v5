import { doActionWithError } from '../../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import { formalizeAppID } from '../../../appuser/app/local'
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
    Pools: new Map<string, Array<Pool>>()
  }),
  getters: {
    pools (): (appID?: string) => Array<Pool> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Pools.get(appID) || []
      }
    }
  },
  actions: {
    addPools (appID: string | undefined, pools: Array<Pool>) {
      appID = formalizeAppID(appID)
      let _pools = this.Pools.get(appID) as Array<Pool>
      if (!_pools) {
        _pools = []
      }
      pools.forEach((pool) => {
        const index = _pools.findIndex((el) => el.ID === pool.ID)
        _pools.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, pool)
      })
      this.Pools.set(appID, _pools)
    },
    delAppPool (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      let _pools = this.Pools.get(appID) as Array<Pool>
      if (!_pools) {
        _pools = []
      }
      const index = _pools.findIndex((el) => el.EntID === id)
      console.log('sssssssss', index)
      console.log('sssssssss', _pools)
      _pools.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      console.log('sssssssss', _pools)
      this.Pools.set(appID, _pools)
    },
    adminCreatePool (req: AdminCreatePoolRequest, done: (error: boolean, row: Pool) => void) {
      doActionWithError<AdminCreatePoolRequest, AdminCreatePoolResponse>(
        API.ADMIN_CREATE_POOL,
        req,
        req.Message,
        (resp: AdminCreatePoolResponse): void => {
          this.addPools(req.TargetAppID, [resp.Info])
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
          this.addPools(req.AppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Pool)
        })
    },
    getPools (req: GetPoolsRequest, done: (error: boolean, rows?: Array<Pool>) => void) {
      doActionWithError<GetPoolsRequest, GetPoolsResponse>(
        API.GET_POOLS,
        req,
        req.Message,
        (resp: GetPoolsResponse): void => {
          this.addPools(req.AppID, resp.Infos)
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
          this.addPools(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminDeletePool (req: AdminDeletePoolRequest, done: (error: boolean, row: Pool) => void) {
      doActionWithError<AdminDeletePoolRequest, AdminDeletePoolResponse>(
        API.ADMIN_DELETE_POOL,
        req,
        req.Message,
        (resp: AdminDeletePoolResponse): void => {
          this.delAppPool(req.TargetAppID, req.EntID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Pool)
        })
    }
  }
})

export * from './const'
export * from './types'

import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Pool,
  AdminGetPoolsRequest,
  AdminGetPoolsResponse
} from './types'

export const useMiningpoolPoolStore = defineStore('miningpool-pools', {
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
    getPools (req: AdminGetPoolsRequest, done: (error: boolean, rows?: Array<Pool>) => void) {
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
    }
  }
})

export * from './const'
export * from './types'

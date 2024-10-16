import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetCoinAllocatedsRequest,
  AdminGetCoinAllocatedsResponse,
  GetMyCoinAllocatedsRequest,
  GetMyCoinAllocatedsResponse,
  CoinAllocated
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCoinAllocatedStore = defineStore('coin-allocateds', {
  state: () => ({
    CoinAllocateds: new Map<string, Array<CoinAllocated>>()
  }),
  getters: {
    coinAllocateds (): (appID?: string) => Array<CoinAllocated> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.CoinAllocateds.get(appID) || []
      }
    }
  },
  actions: {
    addCoinAllocateds (appID: string | undefined, UserTasks: Array<CoinAllocated>) {
      appID = formalizeAppID(appID)
      let _userTasks = this.CoinAllocateds.get(appID) as Array<CoinAllocated>
      if (!_userTasks) {
        _userTasks = []
      }
      UserTasks.forEach((UserTask) => {
        const index = _userTasks.findIndex((el) => el.ID === UserTask.ID)
        _userTasks.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, UserTask)
      })
      this.CoinAllocateds.set(appID, _userTasks)
    },
    adminGetCoinAllocateds (req: AdminGetCoinAllocatedsRequest, done: (error: boolean, rows?: Array<CoinAllocated>) => void) {
      doActionWithError<AdminGetCoinAllocatedsRequest, AdminGetCoinAllocatedsResponse>(
        API.ADMIN_GET_ALLOCATEDCOINS,
        req,
        req.Message,
        (resp: AdminGetCoinAllocatedsResponse): void => {
          this.addCoinAllocateds(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getMyCoinAllocateds (req: GetMyCoinAllocatedsRequest, done: (error: boolean, rows?: Array<CoinAllocated>) => void) {
      doActionWithError<GetMyCoinAllocatedsRequest, GetMyCoinAllocatedsResponse>(
        API.GET_MY_ALLOCATEDCOINS,
        req,
        req.Message,
        (resp: GetMyCoinAllocatedsResponse): void => {
          this.addCoinAllocateds(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetCoinAllocatedsRequest,
  AdminGetCoinAllocatedsResponse,
  UserGetCoinAllocatedsRequest,
  UserGetCoinAllocatedsResponse,
  CoinAllocated
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCoinAllocatedStore = defineStore('CoinAllocateds', {
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
    addCoinAllocateds (appID: string | undefined, coinAllocateds: Array<CoinAllocated>) {
      appID = formalizeAppID(appID)
      let _coinAllocateds = this.CoinAllocateds.get(appID) as Array<CoinAllocated>
      if (!_coinAllocateds) {
        _coinAllocateds = []
      }
      coinAllocateds.forEach((coinAllocated) => {
        const index = _coinAllocateds.findIndex((el) => el.ID === coinAllocated.ID)
        _coinAllocateds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coinAllocated)
      })
      this.CoinAllocateds.set(appID, _coinAllocateds)
    },
    adminGetCoinAllocateds (req: AdminGetCoinAllocatedsRequest, done: (error: boolean, rows?: Array<CoinAllocated>) => void) {
      doActionWithError<AdminGetCoinAllocatedsRequest, AdminGetCoinAllocatedsResponse>(
        API.ADMIN_GET_APP_COIN_ALLOCATEDS,
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
    userGetCoinAllocateds (req: UserGetCoinAllocatedsRequest, done: (error: boolean, rows?: Array<CoinAllocated>) => void) {
      doActionWithError<UserGetCoinAllocatedsRequest, UserGetCoinAllocatedsResponse>(
        API.USER_GET_COIN_ALLOCATEDS,
        req,
        req.Message,
        (resp: UserGetCoinAllocatedsResponse): void => {
          this.addCoinAllocateds(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

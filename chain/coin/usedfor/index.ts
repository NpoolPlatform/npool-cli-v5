import { defineStore } from 'pinia'
import { API } from './const'
import {
  CoinUsedFor,
  GetCoinUsedForsRequest,
  GetCoinUsedForsResponse,
  CreateCoinUsedForRequest,
  CreateCoinUsedForResponse,
  DeleteCoinUsedForRequest,
  DeleteCoinUsedForResponse
} from './types'
import { doActionWithError } from '../../../request'

export const useCoinUsedForStore = defineStore('coinusedfor', {
  state: () => ({
    CoinUsedFors: [] as Array<CoinUsedFor>
  }),
  getters: {
    coin (): (id: number) => CoinUsedFor | undefined {
      return (id: number) => {
        return this.CoinUsedFors.find((el) => el.ID === id)
      }
    },
    coinByEntID (): (id: string) => CoinUsedFor | undefined {
      return (id: string) => {
        return this.CoinUsedFors.find((el) => el.EntID === id)
      }
    },
    coins () {
      return () => {
        return this.CoinUsedFors
      }
    },
    addCoinUsedFors (): (coins: Array<CoinUsedFor>) => void {
      return (coins: Array<CoinUsedFor>) => {
        coins.forEach((coin) => {
          const index = this.CoinUsedFors.findIndex((el) => el.ID === coin.ID)
          this.CoinUsedFors.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coin)
        })
      }
    }
  },
  actions: {
    getCoinUsedFors (req: GetCoinUsedForsRequest, done: (error: boolean, coins?: Array<CoinUsedFor>) => void) {
      doActionWithError<GetCoinUsedForsRequest, GetCoinUsedForsResponse>(
        API.GET_COIN_USED_FORS,
        req,
        req.Message,
        (resp: GetCoinUsedForsResponse): void => {
          this.addCoinUsedFors(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    deleteCoinUsedFor (req: DeleteCoinUsedForRequest, done: (error: boolean, coin?: CoinUsedFor) => void) {
      doActionWithError<DeleteCoinUsedForRequest, DeleteCoinUsedForResponse>(
        API.DELETE_COIN_USED_FOR,
        req,
        req.Message,
        (resp: DeleteCoinUsedForResponse): void => {
          this.addCoinUsedFors([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createCoinUsedFor (req: CreateCoinUsedForRequest, done: (error: boolean, coin?: CoinUsedFor) => void) {
      doActionWithError<CreateCoinUsedForRequest, CreateCoinUsedForResponse>(
        API.CREATE_COIN_USED_FOR,
        req,
        req.Message,
        (resp: CreateCoinUsedForResponse): void => {
          this.addCoinUsedFors([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'

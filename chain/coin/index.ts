import { defineStore } from 'pinia'
import { API } from './const'
import {
  Coin,
  GetCoinsRequest,
  GetCoinsResponse,
  CreateCoinRequest,
  CreateCoinResponse,
  UpdateCoinRequest,
  UpdateCoinResponse
} from './types'
import { doActionWithError } from '../../request'

export const useCoinStore = defineStore('coins', {
  state: () => ({
    Coins: [] as Array<Coin>
  }),
  getters: {
    coin (): (id: string) => Coin | undefined {
      return (id: string) => {
        return this.Coins.find((el) => el.ID === id)
      }
    },
    coins () {
      return () => {
        return this.Coins
      }
    },
    addCoins (): (coins: Array<Coin>) => void {
      return (coins: Array<Coin>) => {
        coins.forEach((coin) => {
          const index = this.Coins.findIndex((el) => el.ID === coin.ID)
          this.Coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coin)
        })
      }
    }
  },
  actions: {
    getCoins (req: GetCoinsRequest, done: (error: boolean, coins?: Array<Coin>) => void) {
      doActionWithError<GetCoinsRequest, GetCoinsResponse>(
        API.GET_COINS,
        req,
        req.Message,
        (resp: GetCoinsResponse): void => {
          this.addCoins(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateCoin (req: UpdateCoinRequest, done: (error: boolean, coin?: Coin) => void) {
      doActionWithError<UpdateCoinRequest, UpdateCoinResponse>(
        API.UPDATE_COIN,
        req,
        req.Message,
        (resp: UpdateCoinResponse): void => {
          this.addCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createCoin (req: CreateCoinRequest, done: (error: boolean, coin?: Coin) => void) {
      doActionWithError<CreateCoinRequest, CreateCoinResponse>(
        API.CREATE_COIN,
        req,
        req.Message,
        (resp: CreateCoinResponse): void => {
          this.addCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'

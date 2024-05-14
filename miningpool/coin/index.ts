import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  Coin,
  AdminCreateCoinRequest,
  AdminCreateCoinResponse,
  AdminUpdateCoinRequest,
  AdminUpdateCoinResponse,
  AdminGetCoinsRequest,
  AdminGetCoinsResponse
} from './types'

export const useMiningpoolCoinStore = defineStore('miningpool-coins', {
  state: () => ({
    Coins: [] as Array<Coin>
  }),
  getters: {
    coin (): (id: string) => Coin | undefined {
      return (id: string) => {
        return this.Coins.find((el: Coin) => el.EntID === id)
      }
    },
    coins () {
      return () => {
        return this.Coins
      }
    }
  },
  actions: {
    addCoins (goods: Array<Coin>) {
      goods.forEach((good) => {
        const index = this.Coins.findIndex((el: Coin) => el.EntID === good.EntID)
        this.Coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
    getCoins (req: AdminGetCoinsRequest, done: (error: boolean, row?: Array<Coin>) => void) {
      doActionWithError<AdminGetCoinsRequest, AdminGetCoinsResponse>(
        API.ADMIN_GET_COINS,
        req,
        req.Message,
        (resp: AdminGetCoinsResponse): void => {
          this.addCoins(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateCoin (req: AdminUpdateCoinRequest, done: (error: boolean, row?: Coin) => void) {
      doActionWithError<AdminUpdateCoinRequest, AdminUpdateCoinResponse>(
        API.ADMIN_UPDATE_COIN,
        req,
        req.Message,
        (resp: AdminUpdateCoinResponse): void => {
          this.addCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createCoin (req: AdminCreateCoinRequest, done: (error: boolean, row?: Coin) => void) {
      doActionWithError<AdminCreateCoinRequest, AdminCreateCoinResponse>(
        API.ADMIN_CREATE_COIN,
        req,
        req.Message,
        (resp: AdminCreateCoinResponse): void => {
          this.addCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

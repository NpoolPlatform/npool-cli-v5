
import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  GoodCoin,
  AdminCreateGoodCoinRequest,
  AdminCreateGoodCoinResponse,
  GetGoodCoinsRequest,
  GetGoodCoinsResponse,
  AdminUpdateGoodCoinRequest,
  AdminUpdateGoodCoinResponse,
  AdminDeleteGoodCoinRequest,
  AdminDeleteGoodCoinResponse
} from './types'

export const useGoodCoinStore = defineStore('goodCoins', {
  state: () => ({
    GoodCoins: [] as Array<GoodCoin>
  }),
  getters: {
    goodCoin (): (id: string) => GoodCoin | undefined {
      return (id: string) => {
        return this.GoodCoins.find((el: GoodCoin) => el.EntID === id)
      }
    },
    goodCoins (): Array<GoodCoin> {
      return this.GoodCoins
    }
  },
  actions: {
    addGoodCoins (goodCoins: Array<GoodCoin>) {
      goodCoins.forEach((goodCoin) => {
        const index = this.GoodCoins.findIndex((el: GoodCoin) => el.EntID === goodCoin.EntID)
        this.GoodCoins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, goodCoin)
      })
    },
    getGoodCoins (req: GetGoodCoinsRequest, done?: (error: boolean, goodCoins?: Array<GoodCoin>) => void) {
      doActionWithError<GetGoodCoinsRequest, GetGoodCoinsResponse>(
        API.GET_GOOD_COINS,
        req,
        req.Message,
        (resp: GetGoodCoinsResponse): void => {
          this.addGoodCoins(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateGoodCoin (req: AdminUpdateGoodCoinRequest, done?: (error: boolean, goodCoin?: GoodCoin) => void) {
      doActionWithError<AdminUpdateGoodCoinRequest, AdminUpdateGoodCoinResponse>(
        API.ADMIN_UPDATE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminUpdateGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateGoodCoin (req: AdminCreateGoodCoinRequest, done?: (error: boolean, goodCoin?: GoodCoin) => void) {
      doActionWithError<AdminCreateGoodCoinRequest, AdminCreateGoodCoinResponse>(
        API.ADMIN_CREATE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminCreateGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteGoodCoin (req: AdminDeleteGoodCoinRequest, done?: (error: boolean, goodCoin?: GoodCoin) => void) {
      doActionWithError<AdminDeleteGoodCoinRequest, AdminDeleteGoodCoinResponse>(
        API.ADMIN_DELETE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminDeleteGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

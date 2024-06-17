
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

export const useGoodCoinStore = defineStore('device-manufacturers', {
  state: () => ({
    GoodCoins: [] as Array<GoodCoin>
  }),
  getters: {
    GoodCoin (): (id: string) => GoodCoin | undefined {
      return (id: string) => {
        return this.GoodCoins.find((el: GoodCoin) => el.EntID === id)
      }
    },
    GoodCoins () {
      return () => this.GoodCoins
    }
  },
  actions: {
    addGoodCoins (devices: Array<GoodCoin>) {
      devices.forEach((device) => {
        const index = this.GoodCoins.findIndex((el: GoodCoin) => el.EntID === device.EntID)
        this.GoodCoins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
      })
    },
    getGoodCoins (req: GetGoodCoinsRequest, done: (error: boolean, devices?: Array<GoodCoin>) => void) {
      doActionWithError<GetGoodCoinsRequest, GetGoodCoinsResponse>(
        API.GET_GOOD_COINS,
        req,
        req.Message,
        (resp: GetGoodCoinsResponse): void => {
          this.addGoodCoins(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminUpdateGoodCoin (req: AdminUpdateGoodCoinRequest, done: (error: boolean, device?: GoodCoin) => void) {
      doActionWithError<AdminUpdateGoodCoinRequest, AdminUpdateGoodCoinResponse>(
        API.ADMIN_UPDATE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminUpdateGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createGoodCoin (req: AdminCreateGoodCoinRequest, done: (error: boolean, device?: GoodCoin) => void) {
      doActionWithError<AdminCreateGoodCoinRequest, AdminCreateGoodCoinResponse>(
        API.ADMIN_CREATE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminCreateGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteGoodCoin (req: AdminDeleteGoodCoinRequest, done: (error: boolean, device?: GoodCoin) => void) {
      doActionWithError<AdminDeleteGoodCoinRequest, AdminDeleteGoodCoinResponse>(
        API.ADMIN_DELETE_GOOD_COIN,
        req,
        req.Message,
        (resp: AdminDeleteGoodCoinResponse): void => {
          this.addGoodCoins([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

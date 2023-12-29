import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateCouponCoinRequest,
  CreateCouponCoinResponse,
  GetCouponCoinsRequest,
  GetCouponCoinsResponse,
  DeleteCouponCoinRequest,
  DeleteCouponCoinResponse,
  CouponCoin
} from './types'
import { doActionWithError } from '../../../../request/action'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useCouponCoinStore = defineStore('coupon-coin', {
  state: () => ({
    CouponCoins: new Map<string, Array<CouponCoin>>()
  }),
  getters: {
    couponCoins (): (appID: string | undefined, id: number | undefined) => CouponCoin | undefined {
      return (appID: string | undefined, id: number | undefined) => {
        if (!id) return undefined
        appID = formalizeAppID(appID)
        return this.CouponCoins.get(appID)?.find((el) => el.ID === id)
      }
    },
    addCouponCoins (): (appID: string | undefined, scopes: Array<CouponCoin>) => void {
      return (appID: string | undefined, scopes: Array<CouponCoin>) => {
        appID = formalizeAppID(appID)
        let _couponCoins = this.CouponCoins.get(appID) as Array<CouponCoin>
        if (!_couponCoins) {
          _couponCoins = []
        }
        scopes.forEach((coupon) => {
          const index = _couponCoins.findIndex((el) => el.ID === coupon.ID)
          _couponCoins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coupon)
        })
        this.CouponCoins.set(appID, _couponCoins)
      }
    },
    delCouponCoin (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _couponCoins = this.CouponCoins.get(appID)
        if (!_couponCoins) {
          _couponCoins = []
        }
        const index = _couponCoins.findIndex((el) => el.ID === id)
        _couponCoins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.CouponCoins.set(appID, _couponCoins)
      }
    },
    couponcoins (): (appID?: string) => Array<CouponCoin> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.CouponCoins.get(appID)?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    getCouponCoins (req: GetCouponCoinsRequest, done: (error: boolean, rows?: Array<CouponCoin>) => void) {
      doActionWithError<GetCouponCoinsRequest, GetCouponCoinsResponse>(
        API.GET_COUPONCOINS,
        req,
        req.Message,
        (resp: GetCouponCoinsResponse): void => {
          this.addCouponCoins(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createCouponCoin (req: CreateCouponCoinRequest, done: (error: boolean, row?: CouponCoin) => void) {
      doActionWithError<CreateCouponCoinRequest, CreateCouponCoinResponse>(
        API.CREATE_COUPONCOIN,
        req,
        req.Message,
        (resp: CreateCouponCoinResponse): void => {
          this.addCouponCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteCouponCoin (req: DeleteCouponCoinRequest, done: (error: boolean, row?: CouponCoin) => void) {
      doActionWithError<DeleteCouponCoinRequest, DeleteCouponCoinResponse>(
        API.DELETE_COUPONCOIN,
        req,
        req.Message,
        (resp: DeleteCouponCoinResponse): void => {
          this.delCouponCoin(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  AppPowerRental,
  GetAppPowerRentalRequest,
  GetAppPowerRentalResponse,
  GetAppPowerRentalsRequest,
  GetAppPowerRentalsResponse,
  AdminGetAppPowerRentalsRequest,
  AdminGetAppPowerRentalsResponse,
  UpdateAppPowerRentalRequest,
  UpdateAppPowerRentalResponse,
  AdminCreateAppPowerRentalRequest,
  AdminCreateAppPowerRentalResponse,
  AdminUpdateAppPowerRentalRequest,
  AdminUpdateAppPowerRentalResponse,
  AdminDeleteAppPowerRentalRequest,
  AdminDeleteAppPowerRentalResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppPowerRentalStore = defineStore('appPowerRentals', {
  state: () => ({
    AppPowerRentals: new Map<string, Array<AppPowerRental>>()
  }),
  getters: {
    appPowerRental (): (appID: string | undefined, id: string) => AppPowerRental | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppPowerRentals.get(appID)?.find((el: AppPowerRental) => el.EntID === id)
      }
    },
    appPowerRentals (): (appID?: string) => Array<AppPowerRental> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppPowerRentals.get(appID) || []
      }
    },
    purchaseLimit (): (appID: string | undefined, id: string) => number {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const appPowerRental = this.appPowerRental(appID, id)
        let min = Math.min(Number(appPowerRental?.MaxOrderAmount) || 0, Number(appPowerRental?.GoodSpotQuantity) + Number(appPowerRental?.AppGoodSpotQuantity))
        min = Math.min(min, Number(appPowerRental?.MaxUserAmount) || 0)
        return Math.floor(min)
      }
    }
  },
  actions: {
    addAppPowerRentals (appID: string | undefined, goods: Array<AppPowerRental>) {
      appID = formalizeAppID(appID)
      let _goods = this.AppPowerRentals.get(appID) as Array<AppPowerRental>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((good) => {
        if (!good) return
        const index = _goods.findIndex((el) => el.EntID === good.EntID)
        good.GoodCoins.forEach((el) => {
          if (el.Main) {
            good.CoinTypeID = el.CoinTypeID
            good.CoinName = el.CoinName
            good.CoinLogo = el.CoinLogo
            good.CoinUnit = el.CoinUnit
            good.CoinEnv = el.CoinENV
          }
        })
        good.DurationDays = 0
        if (good.MinOrderDurationSeconds > 0) {
          good.DurationDays = good.MinOrderDurationSeconds / 60 / 60 / 24
        }
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.AppPowerRentals.set(appID, _goods)
    },
    delAppPowerRental (appID: string | undefined, good: AppPowerRental) {
      appID = formalizeAppID(appID)
      let _goods = this.AppPowerRentals.get(appID) as Array<AppPowerRental>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppPowerRentals.set(appID, _goods)
    },
    getAppPowerRental (req: GetAppPowerRentalRequest, done?: (error: boolean, row?: AppPowerRental) => void) {
      doActionWithError<GetAppPowerRentalRequest, GetAppPowerRentalResponse>(
        API.GET_APP_POWERRENTAL,
        req,
        req.Message,
        (resp: GetAppPowerRentalResponse): void => {
          this.addAppPowerRentals(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    getAppPowerRentals (req: GetAppPowerRentalsRequest, done?: (error: boolean, rows?: Array<AppPowerRental>, total?: number) => void) {
      doActionWithError<GetAppPowerRentalsRequest, GetAppPowerRentalsResponse>(
        API.GET_APP_POWERRENTALS,
        req,
        req.Message,
        (resp: GetAppPowerRentalsResponse): void => {
          this.addAppPowerRentals(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    updateAppPowerRental (req: UpdateAppPowerRentalRequest, done?: (error: boolean, row?: AppPowerRental) => void) {
      doActionWithError<UpdateAppPowerRentalRequest, UpdateAppPowerRentalResponse>(
        API.UPDATE_APP_POWERRENTAL,
        req,
        req.Message,
        (resp: UpdateAppPowerRentalResponse): void => {
          this.addAppPowerRentals(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateAppPowerRental (req: AdminCreateAppPowerRentalRequest, done?: (error: boolean, row?: AppPowerRental) => void) {
      doActionWithError<AdminCreateAppPowerRentalRequest, AdminCreateAppPowerRentalResponse>(
        API.ADMIN_CREATE_APP_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminCreateAppPowerRentalResponse): void => {
          this.addAppPowerRentals(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetAppPowerRentals (req: AdminGetAppPowerRentalsRequest, done?: (error: boolean, rows?: Array<AppPowerRental>, total?: number) => void) {
      doActionWithError<AdminGetAppPowerRentalsRequest, AdminGetAppPowerRentalsResponse>(
        API.ADMIN_GET_APP_POWERRENTALS,
        req,
        req.Message,
        (resp: AdminGetAppPowerRentalsResponse): void => {
          this.addAppPowerRentals(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateAppPowerRental (req: AdminUpdateAppPowerRentalRequest, done?: (error: boolean, row?: AppPowerRental) => void) {
      doActionWithError<AdminUpdateAppPowerRentalRequest, AdminUpdateAppPowerRentalResponse>(
        API.ADMIN_UPDATE_APP_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminUpdateAppPowerRentalResponse): void => {
          this.addAppPowerRentals(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteAppPowerRental (req: AdminDeleteAppPowerRentalRequest, done?: (error: boolean, row?: AppPowerRental) => void) {
      doActionWithError<AdminDeleteAppPowerRentalRequest, AdminDeleteAppPowerRentalResponse>(
        API.ADMIN_DELETE_APP_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminDeleteAppPowerRentalResponse): void => {
          this.delAppPowerRental(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

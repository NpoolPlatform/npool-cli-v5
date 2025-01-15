import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  AppDelegatedStaking,
  GetAppDelegatedStakingRequest,
  GetAppDelegatedStakingResponse,
  GetAppDelegatedStakingsRequest,
  GetAppDelegatedStakingsResponse,
  AdminGetAppDelegatedStakingsRequest,
  AdminGetAppDelegatedStakingsResponse,
  UpdateAppDelegatedStakingRequest,
  UpdateAppDelegatedStakingResponse,
  AdminCreateAppDelegatedStakingRequest,
  AdminCreateAppDelegatedStakingResponse,
  AdminUpdateAppDelegatedStakingRequest,
  AdminUpdateAppDelegatedStakingResponse,
  AdminDeleteAppDelegatedStakingRequest,
  AdminDeleteAppDelegatedStakingResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppDelegatedStakingStore = defineStore('appDelegatedStakings', {
  state: () => ({
    AppDelegatedStakings: new Map<string, Array<AppDelegatedStaking>>()
  }),
  getters: {
    appDelegatedStaking (): (appID: string | undefined, id: string) => AppDelegatedStaking | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppDelegatedStakings.get(appID)?.find((el: AppDelegatedStaking) => el.EntID === id)
      }
    },
    getAppDelegatedStakingByAppGoodID (): (appID: string | undefined, appGoodID: string) => AppDelegatedStaking | undefined {
      return (appID: string | undefined, appGoodID: string) => {
        appID = formalizeAppID(appID)
        return this.AppDelegatedStakings.get(appID)?.find((el: AppDelegatedStaking) => el.AppGoodID === appGoodID)
      }
    },
    appDelegatedStakings (): (appID?: string) => Array<AppDelegatedStaking> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppDelegatedStakings.get(appID) || []
      }
    }
  },
  actions: {
    addAppDelegatedStakings (appID: string | undefined, goods: Array<AppDelegatedStaking>) {
      appID = formalizeAppID(appID)
      let _goods = this.AppDelegatedStakings.get(appID) as Array<AppDelegatedStaking>
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
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.AppDelegatedStakings.set(appID, _goods)
    },
    delAppDelegatedStaking (appID: string | undefined, good: AppDelegatedStaking) {
      appID = formalizeAppID(appID)
      let _goods = this.AppDelegatedStakings.get(appID) as Array<AppDelegatedStaking>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppDelegatedStakings.set(appID, _goods)
    },
    getAppDelegatedStaking (req: GetAppDelegatedStakingRequest, done?: (error: boolean, row?: AppDelegatedStaking) => void) {
      doActionWithError<GetAppDelegatedStakingRequest, GetAppDelegatedStakingResponse>(
        API.GET_APP_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: GetAppDelegatedStakingResponse): void => {
          this.addAppDelegatedStakings(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    getAppDelegatedStakings (req: GetAppDelegatedStakingsRequest, done?: (error: boolean, rows?: Array<AppDelegatedStaking>, total?: number) => void) {
      doActionWithError<GetAppDelegatedStakingsRequest, GetAppDelegatedStakingsResponse>(
        API.GET_APP_DELEGATEDSTAKINGS,
        req,
        req.Message,
        (resp: GetAppDelegatedStakingsResponse): void => {
          this.addAppDelegatedStakings(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    updateAppDelegatedStaking (req: UpdateAppDelegatedStakingRequest, done?: (error: boolean, row?: AppDelegatedStaking) => void) {
      doActionWithError<UpdateAppDelegatedStakingRequest, UpdateAppDelegatedStakingResponse>(
        API.UPDATE_APP_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: UpdateAppDelegatedStakingResponse): void => {
          this.addAppDelegatedStakings(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateAppDelegatedStaking (req: AdminCreateAppDelegatedStakingRequest, done?: (error: boolean, row?: AppDelegatedStaking) => void) {
      doActionWithError<AdminCreateAppDelegatedStakingRequest, AdminCreateAppDelegatedStakingResponse>(
        API.ADMIN_CREATE_APP_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminCreateAppDelegatedStakingResponse): void => {
          this.addAppDelegatedStakings(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetAppDelegatedStakings (req: AdminGetAppDelegatedStakingsRequest, done?: (error: boolean, rows?: Array<AppDelegatedStaking>, total?: number) => void) {
      doActionWithError<AdminGetAppDelegatedStakingsRequest, AdminGetAppDelegatedStakingsResponse>(
        API.ADMIN_GET_APP_DELEGATEDSTAKINGS,
        req,
        req.Message,
        (resp: AdminGetAppDelegatedStakingsResponse): void => {
          this.addAppDelegatedStakings(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateAppDelegatedStaking (req: AdminUpdateAppDelegatedStakingRequest, done?: (error: boolean, row?: AppDelegatedStaking) => void) {
      doActionWithError<AdminUpdateAppDelegatedStakingRequest, AdminUpdateAppDelegatedStakingResponse>(
        API.ADMIN_UPDATE_APP_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminUpdateAppDelegatedStakingResponse): void => {
          this.addAppDelegatedStakings(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteAppDelegatedStaking (req: AdminDeleteAppDelegatedStakingRequest, done?: (error: boolean, row?: AppDelegatedStaking) => void) {
      doActionWithError<AdminDeleteAppDelegatedStakingRequest, AdminDeleteAppDelegatedStakingResponse>(
        API.ADMIN_DELETE_APP_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminDeleteAppDelegatedStakingResponse): void => {
          this.delAppDelegatedStaking(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  AppPledge,
  GetAppPledgeRequest,
  GetAppPledgeResponse,
  GetAppPledgesRequest,
  GetAppPledgesResponse,
  AdminGetAppPledgesRequest,
  AdminGetAppPledgesResponse,
  UpdateAppPledgeRequest,
  UpdateAppPledgeResponse,
  AdminCreateAppPledgeRequest,
  AdminCreateAppPledgeResponse,
  AdminUpdateAppPledgeRequest,
  AdminUpdateAppPledgeResponse,
  AdminDeleteAppPledgeRequest,
  AdminDeleteAppPledgeResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppPledgeStore = defineStore('appPledges', {
  state: () => ({
    AppPledges: new Map<string, Array<AppPledge>>()
  }),
  getters: {
    appPledge (): (appID: string | undefined, id: string) => AppPledge | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppPledges.get(appID)?.find((el: AppPledge) => el.EntID === id)
      }
    },
    getAppPledgeByAppGoodID (): (appID: string | undefined, appGoodID: string) => AppPledge | undefined {
      return (appID: string | undefined, appGoodID: string) => {
        appID = formalizeAppID(appID)
        return this.AppPledges.get(appID)?.find((el: AppPledge) => el.AppGoodID === appGoodID)
      }
    },
    appPledges (): (appID?: string) => Array<AppPledge> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppPledges.get(appID) || []
      }
    }
  },
  actions: {
    addAppPledges (appID: string | undefined, goods: Array<AppPledge>) {
      appID = formalizeAppID(appID)
      let _goods = this.AppPledges.get(appID) as Array<AppPledge>
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
      this.AppPledges.set(appID, _goods)
    },
    delAppPledge (appID: string | undefined, good: AppPledge) {
      appID = formalizeAppID(appID)
      let _goods = this.AppPledges.get(appID) as Array<AppPledge>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppPledges.set(appID, _goods)
    },
    getAppPledge (req: GetAppPledgeRequest, done?: (error: boolean, row?: AppPledge) => void) {
      doActionWithError<GetAppPledgeRequest, GetAppPledgeResponse>(
        API.GET_APP_PLEDGE,
        req,
        req.Message,
        (resp: GetAppPledgeResponse): void => {
          this.addAppPledges(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    getAppPledges (req: GetAppPledgesRequest, done?: (error: boolean, rows?: Array<AppPledge>, total?: number) => void) {
      doActionWithError<GetAppPledgesRequest, GetAppPledgesResponse>(
        API.GET_APP_PLEDGES,
        req,
        req.Message,
        (resp: GetAppPledgesResponse): void => {
          this.addAppPledges(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    updateAppPledge (req: UpdateAppPledgeRequest, done?: (error: boolean, row?: AppPledge) => void) {
      doActionWithError<UpdateAppPledgeRequest, UpdateAppPledgeResponse>(
        API.UPDATE_APP_PLEDGE,
        req,
        req.Message,
        (resp: UpdateAppPledgeResponse): void => {
          this.addAppPledges(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateAppPledge (req: AdminCreateAppPledgeRequest, done?: (error: boolean, row?: AppPledge) => void) {
      doActionWithError<AdminCreateAppPledgeRequest, AdminCreateAppPledgeResponse>(
        API.ADMIN_CREATE_APP_PLEDGE,
        req,
        req.Message,
        (resp: AdminCreateAppPledgeResponse): void => {
          this.addAppPledges(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetAppPledges (req: AdminGetAppPledgesRequest, done?: (error: boolean, rows?: Array<AppPledge>, total?: number) => void) {
      doActionWithError<AdminGetAppPledgesRequest, AdminGetAppPledgesResponse>(
        API.ADMIN_GET_APP_PLEDGES,
        req,
        req.Message,
        (resp: AdminGetAppPledgesResponse): void => {
          this.addAppPledges(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateAppPledge (req: AdminUpdateAppPledgeRequest, done?: (error: boolean, row?: AppPledge) => void) {
      doActionWithError<AdminUpdateAppPledgeRequest, AdminUpdateAppPledgeResponse>(
        API.ADMIN_UPDATE_APP_PLEDGE,
        req,
        req.Message,
        (resp: AdminUpdateAppPledgeResponse): void => {
          this.addAppPledges(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteAppPledge (req: AdminDeleteAppPledgeRequest, done?: (error: boolean, row?: AppPledge) => void) {
      doActionWithError<AdminDeleteAppPledgeRequest, AdminDeleteAppPledgeResponse>(
        API.ADMIN_DELETE_APP_PLEDGE,
        req,
        req.Message,
        (resp: AdminDeleteAppPledgeResponse): void => {
          this.delAppPledge(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

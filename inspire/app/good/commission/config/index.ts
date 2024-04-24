import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateAppGoodCommissionConfigRequest,
  UpdateAppGoodCommissionConfigResponse,
  AdminUpdateAppGoodCommissionConfigRequest,
  AdminUpdateAppGoodCommissionConfigResponse,
  GetAppGoodCommissionConfigsRequest,
  GetAppGoodCommissionConfigsResponse,
  CreateAppGoodCommissionConfigRequest,
  CreateAppGoodCommissionConfigResponse,
  AdminCreateAppGoodCommissionConfigRequest,
  AdminCreateAppGoodCommissionConfigResponse,
  AppGoodCommissionConfig,
  AdminGetAppGoodCommissionConfigsRequest,
  AdminGetAppGoodCommissionConfigsResponse
} from './types'
import { doActionWithError } from '../../../../../request/action'
import { formalizeAppID } from '../../../../../appuser/app/local'

export const useAppGoodCommissionConfigStore = defineStore('appgoodcommissionconfigs', {
  state: () => ({
    AppGoodCommissionConfigs: new Map<string, Array<AppGoodCommissionConfig>>()
  }),
  getters: {
    appGoodCommissionConfigs (): (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, current?: boolean) => Array<AppGoodCommissionConfig> {
      return (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, current?: boolean) => {
        appID = formalizeAppID(appID)
        return this.AppGoodCommissionConfigs.get(appID)?.filter((el) => {
          let ok = true
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          if (current) ok &&= el.EndAt === 0
          return ok
        })?.sort((a, b) => {
          if (a.GoodName !== b.GoodName) return a.GoodName.localeCompare(b.GoodName)
          return a.StartAt < b.StartAt ? 1 : -1
        }) || []
      }
    }
  },
  actions: {
    addCommissionConfigs (appID: string | undefined, commissions: Array<AppGoodCommissionConfig>) {
      appID = formalizeAppID(appID)
      let _commissions = this.AppGoodCommissionConfigs.get(appID) as Array<AppGoodCommissionConfig>
      if (!_commissions) {
        _commissions = []
      }
      commissions.forEach((commission) => {
        const index = _commissions.findIndex((el) => el.ID === commission.ID)
        _commissions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, commission)
      })
      this.AppGoodCommissionConfigs.set(appID, _commissions)
    },
    getAppGoodCommissionConfigs (req: GetAppGoodCommissionConfigsRequest, done: (error: boolean, rows?: Array<AppGoodCommissionConfig>) => void) {
      doActionWithError<GetAppGoodCommissionConfigsRequest, GetAppGoodCommissionConfigsResponse>(
        API.GET_APP_GOOD_COMMISSION_CONFIGS,
        req,
        req.Message,
        (resp: GetAppGoodCommissionConfigsResponse): void => {
          this.addCommissionConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateAppGoodCommissionConfig (req: UpdateAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<UpdateAppGoodCommissionConfigRequest, UpdateAppGoodCommissionConfigResponse>(
        API.UPDATE_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: UpdateAppGoodCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateAppGoodCommissionConfig (req: AdminUpdateAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<AdminUpdateAppGoodCommissionConfigRequest, AdminUpdateAppGoodCommissionConfigResponse>(
        API.ADMIN_UPDATE_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: AdminUpdateAppGoodCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createAppGoodCommissionConfig (req: CreateAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<CreateAppGoodCommissionConfigRequest, CreateAppGoodCommissionConfigResponse>(
        API.CREATE_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: CreateAppGoodCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateAppGoodCommissionConfig (req: AdminCreateAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<AdminCreateAppGoodCommissionConfigRequest, AdminCreateAppGoodCommissionConfigResponse>(
        API.ADMIN_CREATE_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: AdminCreateAppGoodCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetAppGoodCommissionConfigs (req: AdminGetAppGoodCommissionConfigsRequest, done: (error: boolean, rows?: Array<AppGoodCommissionConfig>) => void) {
      doActionWithError<AdminGetAppGoodCommissionConfigsRequest, AdminGetAppGoodCommissionConfigsResponse>(
        API.ADMIN_GET_APP_GOOD_COMMISSION_CONFIGS,
        req,
        req.Message,
        (resp: AdminGetAppGoodCommissionConfigsResponse): void => {
          this.addCommissionConfigs(undefined, resp.Infos)
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

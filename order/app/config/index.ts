import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  AppConfig,
  CreateAppConfigRequest,
  CreateAppConfigResponse,
  UpdateAppConfigRequest,
  UpdateAppConfigResponse,
  GetAppConfigRequest,
  GetAppConfigResponse,
  AdminCreateAppConfigRequest,
  AdminCreateAppConfigResponse,
  AdminUpdateAppConfigRequest,
  AdminUpdateAppConfigResponse,
  AdminGetAppConfigsRequest,
  AdminGetAppConfigsResponse,
  AdminDeleteAppConfigRequest,
  AdminDeleteAppConfigResponse
} from './types'

import { formalizeAppID } from '../../../appuser/app/local'

export const useAppConfigStore = defineStore('app-order-configs', {
  state: () => ({
    AppConfigs: new Map<string, Array<AppConfig>>()
  }),
  getters: {
    appConfig (): (appID: string | undefined, id: string) => AppConfig | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppConfigs.get(appID)?.find((el) => el.EntID === id)
      }
    },
    appConfigs (): (appID?: string) => Array<AppConfig> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppConfigs.get(appID) || []
      }
    }
  },
  actions: {
    addAppConfigs (appID: string | undefined, appConfigs: Array<AppConfig>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.AppConfigs.get(appID) as Array<AppConfig>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      appConfigs.forEach((appConfig) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === appConfig.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, appConfig)
      })
      this.AppConfigs.set(appID, _simulateConfigs)
    },
    delAppConfig (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.AppConfigs.get(appID) as Array<AppConfig>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppConfigs.set(appID, _coins)
    },
    adminGetAppConfigs (req: AdminGetAppConfigsRequest, done: (error: boolean, rows?: Array<AppConfig>, total?: number) => void) {
      doActionWithError<AdminGetAppConfigsRequest, AdminGetAppConfigsResponse>(
        API.ADMIN_GET_APP_CONFIGS,
        req,
        req.Message,
        (resp: AdminGetAppConfigsResponse): void => {
          this.addAppConfigs(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getAppConfig (req: GetAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<GetAppConfigRequest, GetAppConfigResponse>(
        API.GET_APP_CONFIG,
        req,
        req.Message,
        (resp: GetAppConfigResponse): void => {
          this.addAppConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateAppConfig (req: UpdateAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<UpdateAppConfigRequest, UpdateAppConfigResponse>(
        API.UPDATE_APP_CONFIG,
        req,
        req.Message,
        (resp: UpdateAppConfigResponse): void => {
          this.addAppConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createAppConfig (req: CreateAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<CreateAppConfigRequest, CreateAppConfigResponse>(
        API.CREATE_APP_CONFIG,
        req,
        req.Message,
        (resp: CreateAppConfigResponse): void => {
          this.addAppConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminCreateAppConfig (req: AdminCreateAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<AdminCreateAppConfigRequest, AdminCreateAppConfigResponse>(
        API.ADMIN_CREATE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminCreateAppConfigResponse): void => {
          this.addAppConfigs(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminUpdateAppConfig (req: AdminUpdateAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<AdminUpdateAppConfigRequest, AdminUpdateAppConfigResponse>(
        API.ADMIN_UPDATE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminUpdateAppConfigResponse): void => {
          this.addAppConfigs(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeleteAppConfig (req: AdminDeleteAppConfigRequest, done: (error: boolean, appCoin?: AppConfig) => void) {
      doActionWithError<AdminDeleteAppConfigRequest, AdminDeleteAppConfigResponse>(
        API.ADMIN_DELETE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminDeleteAppConfigResponse): void => {
          this.delAppConfig(req.TargetAppID, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

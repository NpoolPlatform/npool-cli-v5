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

export const useAppConfigStore = defineStore('appOrderConfigs', {
  state: () => ({
    AppConfigs: new Map<string, AppConfig>()
  }),
  getters: {
    appConfig (): (appID: string | undefined) => AppConfig | undefined {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.AppConfigs.get(appID)
      }
    },
    appConfigs (): Array<AppConfig> {
      return Array.from(this.AppConfigs.values())
    }
  },
  actions: {
    addAppConfigs (appConfigs: Array<AppConfig>) {
      appConfigs.forEach((appConfig) => {
        this.AppConfigs.set(appConfig.AppID, appConfig)
      })
    },
    delAppConfig (appID: string | undefined) {
      appID = formalizeAppID(appID)
      this.AppConfigs.delete(appID)
    },
    adminGetAppConfigs (req: AdminGetAppConfigsRequest, done: (error: boolean, rows?: Array<AppConfig>, total?: number) => void) {
      doActionWithError<AdminGetAppConfigsRequest, AdminGetAppConfigsResponse>(
        API.ADMIN_GET_APP_CONFIGS,
        req,
        req.Message,
        (resp: AdminGetAppConfigsResponse): void => {
          this.addAppConfigs(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getAppConfig (req: GetAppConfigRequest, done?: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<GetAppConfigRequest, GetAppConfigResponse>(
        API.GET_APP_CONFIG,
        req,
        req.Message,
        (resp: GetAppConfigResponse): void => {
          this.addAppConfigs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    updateAppConfig (req: UpdateAppConfigRequest, done?: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<UpdateAppConfigRequest, UpdateAppConfigResponse>(
        API.UPDATE_APP_CONFIG,
        req,
        req.Message,
        (resp: UpdateAppConfigResponse): void => {
          this.addAppConfigs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    createAppConfig (req: CreateAppConfigRequest, done?: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<CreateAppConfigRequest, CreateAppConfigResponse>(
        API.CREATE_APP_CONFIG,
        req,
        req.Message,
        (resp: CreateAppConfigResponse): void => {
          this.addAppConfigs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateAppConfig (req: AdminCreateAppConfigRequest, done?: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<AdminCreateAppConfigRequest, AdminCreateAppConfigResponse>(
        API.ADMIN_CREATE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminCreateAppConfigResponse): void => {
          this.addAppConfigs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateAppConfig (req: AdminUpdateAppConfigRequest, done?: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<AdminUpdateAppConfigRequest, AdminUpdateAppConfigResponse>(
        API.ADMIN_UPDATE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminUpdateAppConfigResponse): void => {
          this.addAppConfigs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteAppConfig (req: AdminDeleteAppConfigRequest, done?: (error: boolean, appCoin?: AppConfig) => void) {
      doActionWithError<AdminDeleteAppConfigRequest, AdminDeleteAppConfigResponse>(
        API.ADMIN_DELETE_APP_CONFIG,
        req,
        req.Message,
        (resp: AdminDeleteAppConfigResponse): void => {
          this.delAppConfig(req.TargetAppID)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

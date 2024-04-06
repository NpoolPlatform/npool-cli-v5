import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateAppConfigRequest,
  UpdateAppConfigResponse,
  UpdateNAppConfigRequest,
  UpdateNAppConfigResponse,
  GetAppConfigsRequest,
  GetAppConfigsResponse,
  CreateAppConfigRequest,
  CreateAppConfigResponse,
  CreateNAppConfigRequest,
  CreateNAppConfigResponse,
  AppConfig,
  GetNAppConfigsRequest,
  GetNAppConfigsResponse
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppConfigStore = defineStore('appconfigs', {
  state: () => ({
    AppConfigs: new Map<string, Array<AppConfig>>()
  }),
  getters: {
    appConfigs (): (appID?: string, current?: boolean) => Array<AppConfig> {
      return (appID?: string, current?: boolean) => {
        appID = formalizeAppID(appID)
        return this.AppConfigs.get(appID)?.filter((el) => {
          let ok = true
          if (current) ok &&= el.EndAt === 0
          return ok
        })?.sort((a, b) => {
          return a.StartAt < b.StartAt ? 1 : -1
        }) || []
      }
    }
  },
  actions: {
    addAppConfigs (appID: string | undefined, commissions: Array<AppConfig>) {
      appID = formalizeAppID(appID)
      let _commissions = this.AppConfigs.get(appID) as Array<AppConfig>
      if (!_commissions) {
        _commissions = []
      }
      commissions.forEach((commission) => {
        const index = _commissions.findIndex((el) => el.ID === commission.ID)
        _commissions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, commission)
      })
      this.AppConfigs.set(appID, _commissions)
    },
    getAppConfigs (req: GetAppConfigsRequest, done: (error: boolean, rows?: Array<AppConfig>) => void) {
      doActionWithError<GetAppConfigsRequest, GetAppConfigsResponse>(
        API.GET_APP_CONFIGS,
        req,
        req.Message,
        (resp: GetAppConfigsResponse): void => {
          this.addAppConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
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
        }
      )
    },
    updateNAppConfig (req: UpdateNAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<UpdateNAppConfigRequest, UpdateNAppConfigResponse>(
        API.UPDATE_N_APP_CONFIG,
        req,
        req.Message,
        (resp: UpdateNAppConfigResponse): void => {
          this.addAppConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
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
        }
      )
    },
    createNAppConfig (req: CreateNAppConfigRequest, done: (error: boolean, row?: AppConfig) => void) {
      doActionWithError<CreateNAppConfigRequest, CreateNAppConfigResponse>(
        API.CREATE_N_APP_CONFIG,
        req,
        req.Message,
        (resp: CreateNAppConfigResponse): void => {
          this.addAppConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getNAppConfigs (req: GetNAppConfigsRequest, done: (error: boolean, rows?: Array<AppConfig>) => void) {
      doActionWithError<GetNAppConfigsRequest, GetNAppConfigsResponse>(
        API.GET_N_APP_CONFIGS,
        req,
        req.Message,
        (resp: GetNAppConfigsResponse): void => {
          this.addAppConfigs(undefined, resp.Infos)
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

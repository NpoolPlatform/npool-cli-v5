import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateAppCommissionConfigRequest,
  UpdateAppCommissionConfigResponse,
  UpdateNAppCommissionConfigRequest,
  UpdateNAppCommissionConfigResponse,
  GetAppCommissionConfigsRequest,
  GetAppCommissionConfigsResponse,
  CreateAppCommissionConfigRequest,
  CreateAppCommissionConfigResponse,
  CreateNAppCommissionConfigRequest,
  CreateNAppCommissionConfigResponse,
  AppCommissionConfig,
  GetNAppCommissionConfigsRequest,
  GetNAppCommissionConfigsResponse
} from './types'
import { doActionWithError } from '../../../../request/action'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useAppCommissionConfigStore = defineStore('appcommissionconfigs', {
  state: () => ({
    AppCommissionConfigs: new Map<string, Array<AppCommissionConfig>>()
  }),
  getters: {
    appCommissionConfigs (): (appID?: string, current?: boolean) => Array<AppCommissionConfig> {
      return (appID?: string, current?: boolean) => {
        appID = formalizeAppID(appID)
        return this.AppCommissionConfigs.get(appID)?.filter((el) => {
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
    addCommissionConfigs (appID: string | undefined, commissions: Array<AppCommissionConfig>) {
      appID = formalizeAppID(appID)
      let _commissions = this.AppCommissionConfigs.get(appID) as Array<AppCommissionConfig>
      if (!_commissions) {
        _commissions = []
      }
      commissions.forEach((commission) => {
        const index = _commissions.findIndex((el) => el.ID === commission.ID)
        _commissions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, commission)
      })
      this.AppCommissionConfigs.set(appID, _commissions)
    },
    getAppCommissionConfigs (req: GetAppCommissionConfigsRequest, done: (error: boolean, rows?: Array<AppCommissionConfig>) => void) {
      doActionWithError<GetAppCommissionConfigsRequest, GetAppCommissionConfigsResponse>(
        API.GET_APP_COMMISSION_CONFIGS,
        req,
        req.Message,
        (resp: GetAppCommissionConfigsResponse): void => {
          this.addCommissionConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateAppCommissionConfig (req: UpdateAppCommissionConfigRequest, done: (error: boolean, row?: AppCommissionConfig) => void) {
      doActionWithError<UpdateAppCommissionConfigRequest, UpdateAppCommissionConfigResponse>(
        API.UPDATE_APP_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: UpdateAppCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateNAppCommissionConfig (req: UpdateNAppCommissionConfigRequest, done: (error: boolean, row?: AppCommissionConfig) => void) {
      doActionWithError<UpdateNAppCommissionConfigRequest, UpdateNAppCommissionConfigResponse>(
        API.UPDATE_N_APP_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: UpdateNAppCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createAppCommissionConfig (req: CreateAppCommissionConfigRequest, done: (error: boolean, row?: AppCommissionConfig) => void) {
      doActionWithError<CreateAppCommissionConfigRequest, CreateAppCommissionConfigResponse>(
        API.CREATE_APP_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: CreateAppCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createNAppCommissionConfig (req: CreateNAppCommissionConfigRequest, done: (error: boolean, row?: AppCommissionConfig) => void) {
      doActionWithError<CreateNAppCommissionConfigRequest, CreateNAppCommissionConfigResponse>(
        API.CREATE_N_APP_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: CreateNAppCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getNAppCommissionConfigs (req: GetNAppCommissionConfigsRequest, done: (error: boolean, rows?: Array<AppCommissionConfig>) => void) {
      doActionWithError<GetNAppCommissionConfigsRequest, GetNAppCommissionConfigsResponse>(
        API.GET_N_APP_COMMISSION_CONFIGS,
        req,
        req.Message,
        (resp: GetNAppCommissionConfigsResponse): void => {
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

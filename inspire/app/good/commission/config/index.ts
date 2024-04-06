import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateAppGoodCommissionConfigRequest,
  UpdateAppGoodCommissionConfigResponse,
  UpdateNAppGoodCommissionConfigRequest,
  UpdateNAppGoodCommissionConfigResponse,
  GetAppGoodCommissionConfigsRequest,
  GetAppGoodCommissionConfigsResponse,
  CreateAppGoodCommissionConfigRequest,
  CreateAppGoodCommissionConfigResponse,
  CreateNAppGoodCommissionConfigRequest,
  CreateNAppGoodCommissionConfigResponse,
  CloneAppGoodCommissionConfigsRequest,
  CloneAppGoodCommissionConfigsResponse,
  AppGoodCommissionConfig,
  CloneNAppGoodCommissionConfigsRequest,
  CloneNAppGoodCommissionConfigsResponse,
  GetNAppGoodCommissionConfigsRequest,
  GetNAppGoodCommissionConfigsResponse
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
    updateNAppGoodCommissionConfig (req: UpdateNAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<UpdateNAppGoodCommissionConfigRequest, UpdateNAppGoodCommissionConfigResponse>(
        API.UPDATE_N_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: UpdateNAppGoodCommissionConfigResponse): void => {
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
    createNAppGoodCommissionConfig (req: CreateNAppGoodCommissionConfigRequest, done: (error: boolean, row?: AppGoodCommissionConfig) => void) {
      doActionWithError<CreateNAppGoodCommissionConfigRequest, CreateNAppGoodCommissionConfigResponse>(
        API.CREATE_N_APP_GOOD_COMMISSION_CONFIG,
        req,
        req.Message,
        (resp: CreateNAppGoodCommissionConfigResponse): void => {
          this.addCommissionConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    cloneAppGoodCommissionConfigs (req: CloneAppGoodCommissionConfigsRequest, done: (error: boolean) => void) {
      doActionWithError<CloneAppGoodCommissionConfigsRequest, CloneAppGoodCommissionConfigsResponse>(
        API.CLONE_APP_GOOD_COMMISSION_CONFIGS,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        }
      )
    },
    cloneNAppGoodCommissionConfigs (req: CloneNAppGoodCommissionConfigsRequest, done: (error: boolean) => void) {
      doActionWithError<CloneNAppGoodCommissionConfigsRequest, CloneNAppGoodCommissionConfigsResponse>(
        API.CLONE_N_APP_GOOD_COMMISSION_CONFIGS,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        }
      )
    },
    getNAppGoodCommissionConfigs (req: GetNAppGoodCommissionConfigsRequest, done: (error: boolean, rows?: Array<AppGoodCommissionConfig>) => void) {
      doActionWithError<GetNAppGoodCommissionConfigsRequest, GetNAppGoodCommissionConfigsResponse>(
        API.GET_N_APP_GOOD_COMMISSION_CONFIGS,
        req,
        req.Message,
        (resp: GetNAppGoodCommissionConfigsResponse): void => {
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

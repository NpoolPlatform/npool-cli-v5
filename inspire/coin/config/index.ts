import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminCreateCoinConfigRequest,
  AdminCreateCoinConfigResponse,
  AdminUpdateCoinConfigRequest,
  AdminUpdateCoinConfigResponse,
  AdminGetCoinConfigsRequest,
  AdminGetCoinConfigsResponse,
  AdminDeleteCoinConfigRequest,
  AdminDeleteCoinConfigResponse,
  CoinConfig
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCoinConfigStore = defineStore('coin-configs', {
  state: () => ({
    CoinConfigs: new Map<string, Array<CoinConfig>>()
  }),
  getters: {
    coinConfigs (): (appID?: string) => Array<CoinConfig> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.CoinConfigs.get(appID) || []
      }
    },
    delCoinConfig (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _taskConfigs = this.CoinConfigs.get(appID) as Array<CoinConfig>
        if (!_taskConfigs) {
          _taskConfigs = []
        }
        const index = _taskConfigs.findIndex((el) => el.ID === id)
        _taskConfigs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.CoinConfigs.set(appID, _taskConfigs)
      }
    }
  },
  actions: {
    addCoinConfigs (appID: string | undefined, CoinConfigs: Array<CoinConfig>) {
      appID = formalizeAppID(appID)
      let _taskConfigs = this.CoinConfigs.get(appID) as Array<CoinConfig>
      if (!_taskConfigs) {
        _taskConfigs = []
      }
      CoinConfigs.forEach((CoinConfig) => {
        const index = _taskConfigs.findIndex((el) => el.ID === CoinConfig.ID)
        _taskConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, CoinConfig)
      })
      this.CoinConfigs.set(appID, _taskConfigs)
    },
    adminUpdateCoinConfig (req: AdminUpdateCoinConfigRequest, done: (error: boolean, row?: CoinConfig) => void) {
      doActionWithError<AdminUpdateCoinConfigRequest, AdminUpdateCoinConfigResponse>(
        API.ADMIN_UPDATE_COINCONFIG,
        req,
        req.Message,
        (resp: AdminUpdateCoinConfigResponse): void => {
          this.addCoinConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetCoinConfigs (req: AdminGetCoinConfigsRequest, done: (error: boolean, rows?: Array<CoinConfig>) => void) {
      doActionWithError<AdminGetCoinConfigsRequest, AdminGetCoinConfigsResponse>(
        API.ADMIN_GET_COINCONFIGS,
        req,
        req.Message,
        (resp: AdminGetCoinConfigsResponse): void => {
          this.addCoinConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteCoinConfig (req: AdminDeleteCoinConfigRequest, done: (error: boolean, row?: CoinConfig) => void) {
      doActionWithError<AdminDeleteCoinConfigRequest, AdminDeleteCoinConfigResponse>(
        API.ADMIN_DELETE_COINCONFIG,
        req,
        req.Message,
        (resp: AdminDeleteCoinConfigResponse): void => {
          this.delCoinConfig(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateCoinConfig (req: AdminCreateCoinConfigRequest, done: (error: boolean, row?: CoinConfig) => void) {
      doActionWithError<AdminCreateCoinConfigRequest, AdminCreateCoinConfigResponse>(
        API.ADMIN_CREATE_COINCONFIG,
        req,
        req.Message,
        (resp: AdminCreateCoinConfigResponse): void => {
          this.addCoinConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

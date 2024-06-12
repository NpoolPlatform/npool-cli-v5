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

export const useCoinConfigStore = defineStore('CoinConfigs', {
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
        let _coinConfigs = this.CoinConfigs.get(appID) as Array<CoinConfig>
        if (!_coinConfigs) {
          _coinConfigs = []
        }
        const index = _coinConfigs.findIndex((el) => el.ID === id)
        _coinConfigs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.CoinConfigs.set(appID, _coinConfigs)
      }
    }
  },
  actions: {
    addCoinConfigs (appID: string | undefined, coinConfigs: Array<CoinConfig>) {
      appID = formalizeAppID(appID)
      let _coinConfigs = this.CoinConfigs.get(appID) as Array<CoinConfig>
      if (!_coinConfigs) {
        _coinConfigs = []
      }
      coinConfigs.forEach((coinConfig) => {
        const index = _coinConfigs.findIndex((el) => el.ID === coinConfig.ID)
        _coinConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coinConfig)
      })
      this.CoinConfigs.set(appID, _coinConfigs)
    },
    adminCreateCoinConfig (req: AdminCreateCoinConfigRequest, done: (error: boolean, row?: CoinConfig) => void) {
      doActionWithError<AdminCreateCoinConfigRequest, AdminCreateCoinConfigResponse>(
        API.ADMIN_CREATE_COIN_CONFIG,
        req,
        req.Message,
        (resp: AdminCreateCoinConfigResponse): void => {
          this.addCoinConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateCoinConfig (req: AdminUpdateCoinConfigRequest, done: (error: boolean, row?: CoinConfig) => void) {
      doActionWithError<AdminUpdateCoinConfigRequest, AdminUpdateCoinConfigResponse>(
        API.ADMIN_UPDATE_COIN_CONFIG,
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
        API.ADMIN_GET_COIN_CONFIGS,
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
        API.ADMIN_DELETE_COIN_CONFIG,
        req,
        req.Message,
        (resp: AdminDeleteCoinConfigResponse): void => {
          this.delCoinConfig(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  SimulateConfig,
  CreateSimulateConfigRequest,
  CreateSimulateConfigResponse,
  UpdateSimulateConfigRequest,
  UpdateSimulateConfigResponse,
  GetSimulateConfigRequest,
  GetSimulateConfigResponse,
  GetSimulateConfigsRequest,
  GetSimulateConfigsResponse,
  CreateAppSimulateConfigRequest,
  CreateAppSimulateConfigResponse,
  UpdateAppSimulateConfigRequest,
  UpdateAppSimulateConfigResponse,
  GetAppSimulateConfigsRequest,
  GetAppSimulateConfigsResponse,
  DeleteAppSimulateConfigRequest,
  DeleteAppSimulateConfigResponse
} from './types'

import { formalizeAppID } from '../../../appuser/app/local'

export const useSimulateConfigStore = defineStore('simulateconfigs', {
  state: () => ({
    SimulateConfigs: new Map<string, Array<SimulateConfig>>()
  }),
  getters: {
    simulateconfig (): (appID: string | undefined, id: string) => SimulateConfig | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.SimulateConfigs.get(appID)?.find((el) => el.EntID === id)
      }
    },
    simulateconfigs (): (appID?: string) => Array<SimulateConfig> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.SimulateConfigs.get(appID) || []
      }
    },
    addSimulateConfigs (): (appID: string | undefined, simulateconfigs: Array<SimulateConfig>) => void {
      return (appID: string | undefined, simulateconfigs: Array<SimulateConfig>) => {
        appID = formalizeAppID(appID)
        let _simulateConfigs = this.SimulateConfigs.get(appID) as Array<SimulateConfig>
        if (!_simulateConfigs) {
          _simulateConfigs = []
        }
        simulateconfigs.forEach((simulateconfig) => {
          const index = _simulateConfigs.findIndex((el) => el.ID === simulateconfig.ID)
          _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, simulateconfig)
        })
        this.SimulateConfigs.set(appID, _simulateConfigs)
      }
    }
  },
  actions: {
    delSimulateConfig (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.SimulateConfigs.get(appID) as Array<SimulateConfig>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.SimulateConfigs.set(appID, _coins)
    },
    getSimulateConfigs (req: GetSimulateConfigsRequest, done: (error: boolean, row?: Array<SimulateConfig>) => void) {
      doActionWithError<GetSimulateConfigsRequest, GetSimulateConfigsResponse>(
        API.GET_SIMULATE_CONFIGS,
        req,
        req.Message,
        (resp: GetSimulateConfigsResponse): void => {
          this.addSimulateConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getAppSimulateConfigs (req: GetAppSimulateConfigsRequest, done: (error: boolean, rows?: Array<SimulateConfig>, total?: number) => void) {
      doActionWithError<GetAppSimulateConfigsRequest, GetAppSimulateConfigsResponse>(
        API.GET_APP_SIMULATE_CONFIGS,
        req,
        req.Message,
        (resp: GetAppSimulateConfigsResponse): void => {
          this.addSimulateConfigs(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getSimulateConfig (req: GetSimulateConfigRequest, done: (error: boolean, row?: SimulateConfig) => void) {
      doActionWithError<GetSimulateConfigRequest, GetSimulateConfigResponse>(
        API.GET_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: GetSimulateConfigResponse): void => {
          this.addSimulateConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateSimulateConfig (req: UpdateSimulateConfigRequest, done: (error: boolean, row?: SimulateConfig) => void) {
      doActionWithError<UpdateSimulateConfigRequest, UpdateSimulateConfigResponse>(
        API.UPDATE_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: UpdateSimulateConfigResponse): void => {
          this.addSimulateConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createSimulateConfig (req: CreateSimulateConfigRequest, done: (error: boolean, row?: SimulateConfig) => void) {
      doActionWithError<CreateSimulateConfigRequest, CreateSimulateConfigResponse>(
        API.CREATE_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: CreateSimulateConfigResponse): void => {
          this.addSimulateConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createAppSimulateConfig (req: CreateAppSimulateConfigRequest, done: (error: boolean, row?: SimulateConfig) => void) {
      doActionWithError<CreateAppSimulateConfigRequest, CreateAppSimulateConfigResponse>(
        API.CREATE_APP_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: CreateAppSimulateConfigResponse): void => {
          this.addSimulateConfigs(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateAppSimulateConfig (req: UpdateAppSimulateConfigRequest, done: (error: boolean, row?: SimulateConfig) => void) {
      doActionWithError<UpdateAppSimulateConfigRequest, UpdateAppSimulateConfigResponse>(
        API.UPDATE_APP_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: UpdateAppSimulateConfigResponse): void => {
          this.addSimulateConfigs(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteAppSimulateConfig (req: DeleteAppSimulateConfigRequest, done: (error: boolean, appCoin?: SimulateConfig) => void) {
      doActionWithError<DeleteAppSimulateConfigRequest, DeleteAppSimulateConfigResponse>(
        API.DELETE_APP_SIMULATE_CONFIG,
        req,
        req.Message,
        (resp: DeleteAppSimulateConfigResponse): void => {
          this.delSimulateConfig(req.TargetAppID, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

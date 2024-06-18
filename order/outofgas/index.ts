import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  OutOfGas,
  GetOutOfGasesRequest,
  GetOutOfGasesResponse,
  GetMyOutOfGasesRequest,
  GetMyOutOfGasesResponse,
  AdminGetOutOfGasesRequest,
  AdminGetOutOfGasesResponse
} from './types'

import { formalizeAppID } from '../../appuser/app/local'

export const useOutOfGasStore = defineStore('outOfGass', {
  state: () => ({
    OutOfGases: new Map<string, Array<OutOfGas>>()
  }),
  getters: {
    outOfGas (): (appID: string | undefined, id: string) => OutOfGas | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.OutOfGases.get(appID)?.find((el) => el.EntID === id)
      }
    },
    outOfGass (): (appID?: string) => Array<OutOfGas> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.OutOfGases.get(appID) || []
      }
    }
  },
  actions: {
    addOutOfGases (appID: string | undefined, outOfGass: Array<OutOfGas>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.OutOfGases.get(appID) as Array<OutOfGas>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      outOfGass.forEach((outOfGas) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === outOfGas.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, outOfGas)
      })
      this.OutOfGases.set(appID, _simulateConfigs)
    },
    delOutOfGas (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.OutOfGases.get(appID) as Array<OutOfGas>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.OutOfGases.set(appID, _coins)
    },
    adminGetOutOfGases (req: AdminGetOutOfGasesRequest, done: (error: boolean, rows?: Array<OutOfGas>, total?: number) => void) {
      doActionWithError<AdminGetOutOfGasesRequest, AdminGetOutOfGasesResponse>(
        API.ADMIN_GET_OUTOFGASES,
        req,
        req.Message,
        (resp: AdminGetOutOfGasesResponse): void => {
          this.addOutOfGases(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getOutOfGases (req: GetOutOfGasesRequest, done: (error: boolean, rows?: Array<OutOfGas>, total?: number) => void) {
      doActionWithError<GetOutOfGasesRequest, GetOutOfGasesResponse>(
        API.GET_OUTOFGASES,
        req,
        req.Message,
        (resp: GetOutOfGasesResponse): void => {
          this.addOutOfGases(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getMyOutOfGases (req: GetMyOutOfGasesRequest, done: (error: boolean, rows?: Array<OutOfGas>, total?: number) => void) {
      doActionWithError<GetMyOutOfGasesRequest, GetMyOutOfGasesResponse>(
        API.GET_MY_OUTOFGASES,
        req,
        req.Message,
        (resp: GetMyOutOfGasesResponse): void => {
          this.addOutOfGases(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

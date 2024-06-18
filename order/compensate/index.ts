import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  Compensate,
  GetCompensatesRequest,
  GetCompensatesResponse,
  GetMyCompensatesRequest,
  GetMyCompensatesResponse,
  AdminGetCompensatesRequest,
  AdminGetCompensatesResponse
} from './types'

import { formalizeAppID } from '../../appuser/app/local'

export const useCompensateStore = defineStore('compensates', {
  state: () => ({
    Compensates: new Map<string, Array<Compensate>>()
  }),
  getters: {
    compensate (): (appID: string | undefined, id: string) => Compensate | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Compensates.get(appID)?.find((el) => el.EntID === id)
      }
    },
    compensates (): (appID?: string) => Array<Compensate> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Compensates.get(appID) || []
      }
    }
  },
  actions: {
    addCompensates (appID: string | undefined, compensates: Array<Compensate>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.Compensates.get(appID) as Array<Compensate>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      compensates.forEach((compensate) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === compensate.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, compensate)
      })
      this.Compensates.set(appID, _simulateConfigs)
    },
    delCompensate (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.Compensates.get(appID) as Array<Compensate>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Compensates.set(appID, _coins)
    },
    adminGetCompensates (req: AdminGetCompensatesRequest, done: (error: boolean, rows?: Array<Compensate>, total?: number) => void) {
      doActionWithError<AdminGetCompensatesRequest, AdminGetCompensatesResponse>(
        API.ADMIN_GET_COMPENSATES,
        req,
        req.Message,
        (resp: AdminGetCompensatesResponse): void => {
          this.addCompensates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getCompensates (req: GetCompensatesRequest, done: (error: boolean, rows?: Array<Compensate>, total?: number) => void) {
      doActionWithError<GetCompensatesRequest, GetCompensatesResponse>(
        API.GET_COMPENSATES,
        req,
        req.Message,
        (resp: GetCompensatesResponse): void => {
          this.addCompensates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getMyCompensates (req: GetMyCompensatesRequest, done: (error: boolean, rows?: Array<Compensate>, total?: number) => void) {
      doActionWithError<GetMyCompensatesRequest, GetMyCompensatesResponse>(
        API.GET_MY_COMPENSATES,
        req,
        req.Message,
        (resp: GetMyCompensatesResponse): void => {
          this.addCompensates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

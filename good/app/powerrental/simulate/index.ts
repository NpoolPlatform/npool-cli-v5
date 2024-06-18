import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Simulate,
  GetSimulatesRequest,
  GetSimulatesResponse,
  CreateSimulateRequest,
  CreateSimulateResponse,
  DeleteSimulateRequest,
  DeleteSimulateResponse,
  UpdateSimulateRequest,
  UpdateSimulateResponse,
  AdminCreateSimulateRequest,
  AdminCreateSimulateResponse,
  AdminGetSimulatesRequest,
  AdminGetSimulatesResponse,
  AdminDeleteSimulateRequest,
  AdminDeleteSimulateResponse,
  AdminUpdateSimulateRequest,
  AdminUpdateSimulateResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useSimulateStore = defineStore('app-simulate-goods', {
  state: () => ({
    Simulates: new Map<string, Array<Simulate>>()
  }),
  getters: {
    simulate (): (appID: string | undefined, id: string) => Simulate | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Simulates.get(appID)?.find((el: Simulate) => el.EntID === id)
      }
    },
    simulates (): (appID: string | undefined) => Array<Simulate> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Simulates.get(appID) || []
      }
    }
  },
  actions: {
    addSimulates (appID: string | undefined, simulates: Array<Simulate>) {
      appID = formalizeAppID(appID)
      let _simulates = this.Simulates.get(appID) as Array<Simulate>
      if (!_simulates) {
        _simulates = []
      }
      simulates.forEach((def) => {
        const index = _simulates?.findIndex((el) => el.EntID === def.EntID)
        _simulates?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, def)
      })
      this.Simulates.set(appID, _simulates)
    },
    delSimulate (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      let _simulates = this.Simulates.get(appID) as Array<Simulate>
      if (!_simulates) {
        _simulates = []
      }
      const index = _simulates?.findIndex((el) => el.EntID === id)
      _simulates?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Simulates.set(appID, _simulates)
    },
    getSimulates (req: GetSimulatesRequest, done: (error: boolean, rows?: Array<Simulate>) => void) {
      doActionWithError<GetSimulatesRequest, GetSimulatesResponse>(
        API.GET_APP_POWERRENTAL_SIMULATES,
        req,
        req.Message,
        (resp: GetSimulatesResponse): void => {
          this.addSimulates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createSimulate (req: CreateSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<CreateSimulateRequest, CreateSimulateResponse>(
        API.CREATE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: CreateSimulateResponse): void => {
          this.addSimulates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteSimulate (req: DeleteSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<DeleteSimulateRequest, DeleteSimulateResponse>(
        API.DELETE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: DeleteSimulateResponse): void => {
          this.delSimulate(undefined, resp.Info.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateSimulate (req: UpdateSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<UpdateSimulateRequest, UpdateSimulateResponse>(
        API.UPDATE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: UpdateSimulateResponse): void => {
          this.addSimulates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getNSimulates (req: AdminGetSimulatesRequest, done: (error: boolean, rows?: Array<Simulate>) => void) {
      doActionWithError<AdminGetSimulatesRequest, AdminGetSimulatesResponse>(
        API.ADMIN_GET_APP_POWERRENTAL_SIMULATES,
        req,
        req.Message,
        (resp: AdminGetSimulatesResponse): void => {
          this.addSimulates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteNSimulate (req: AdminDeleteSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<AdminDeleteSimulateRequest, AdminDeleteSimulateResponse>(
        API.ADMIN_DELETE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: AdminDeleteSimulateResponse): void => {
          this.delSimulate(req.TargetAppID, req.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createNSimulate (req: AdminCreateSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<AdminCreateSimulateRequest, AdminCreateSimulateResponse>(
        API.ADMIN_CREATE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: AdminCreateSimulateResponse): void => {
          this.addSimulates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateNSimulate (req: AdminUpdateSimulateRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<AdminUpdateSimulateRequest, AdminUpdateSimulateResponse>(
        API.ADMIN_UPDATE_APP_POWERRENTAL_SIMULATE,
        req,
        req.Message,
        (resp: AdminUpdateSimulateResponse): void => {
          this.addSimulates(req.TargetAppID, [resp.Info])
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

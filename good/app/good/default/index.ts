import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Default,
  GetDefaultsRequest,
  GetDefaultsResponse,
  CreateDefaultRequest,
  CreateDefaultResponse,
  DeleteDefaultRequest,
  DeleteDefaultResponse,
  UpdateDefaultRequest,
  UpdateDefaultResponse,
  AdminCreateDefaultRequest,
  AdminCreateDefaultResponse,
  AdminGetDefaultsRequest,
  AdminGetDefaultsResponse,
  AdminDeleteDefaultRequest,
  AdminDeleteDefaultResponse,
  AdminUpdateDefaultRequest,
  AdminUpdateDefaultResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useDefaultStore = defineStore('app-default-goods', {
  state: () => ({
    Defaults: new Map<string, Array<Default>>()
  }),
  getters: {
    default (): (appID: string | undefined, id: string) => Default | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Defaults.get(appID)?.find((el: Default) => el.EntID === id)
      }
    },
    defaults (): (appID: string | undefined) => Array<Default> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Defaults.get(appID) || []
      }
    },
    coinUnitDefaultGoodID (): (appID: string | undefined, coinUnit: string) => string | undefined {
      return (appID: string | undefined, coinUnit: string) => {
        appID = formalizeAppID(appID)
        return this.Defaults.get(appID)?.find((el) => el.CoinUnit === coinUnit)?.GoodID
      }
    }
  },
  actions: {
    addDefaults (appID: string | undefined, defaults: Array<Default>) {
      appID = formalizeAppID(appID)
      let _defaults = this.Defaults.get(appID) as Array<Default>
      if (!_defaults) {
        _defaults = []
      }
      defaults.forEach((def) => {
        const index = _defaults?.findIndex((el) => el.EntID === def.EntID)
        _defaults?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, def)
      })
      this.Defaults.set(appID, _defaults)
    },
    delDefault (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      let _defaults = this.Defaults.get(appID) as Array<Default>
      if (!_defaults) {
        _defaults = []
      }
      const index = _defaults?.findIndex((el) => el.EntID === id)
      _defaults?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Defaults.set(appID, _defaults)
    },
    getDefaults (req: GetDefaultsRequest, done: (error: boolean, rows?: Array<Default>) => void) {
      doActionWithError<GetDefaultsRequest, GetDefaultsResponse>(
        API.GET_DEFAULT_APP_GOODS,
        req,
        req.Message,
        (resp: GetDefaultsResponse): void => {
          this.addDefaults(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createDefault (req: CreateDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<CreateDefaultRequest, CreateDefaultResponse>(
        API.CREATE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: CreateDefaultResponse): void => {
          this.addDefaults(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteDefault (req: DeleteDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<DeleteDefaultRequest, DeleteDefaultResponse>(
        API.DELETE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: DeleteDefaultResponse): void => {
          this.delDefault(undefined, resp.Info.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateDefault (req: UpdateDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<UpdateDefaultRequest, UpdateDefaultResponse>(
        API.UPDATE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: UpdateDefaultResponse): void => {
          this.addDefaults(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    adminGetDefaults (req: AdminGetDefaultsRequest, done: (error: boolean, rows?: Array<Default>) => void) {
      doActionWithError<AdminGetDefaultsRequest, AdminGetDefaultsResponse>(
        API.ADMIN_GET_DEFAULT_APP_GOODS,
        req,
        req.Message,
        (resp: AdminGetDefaultsResponse): void => {
          this.addDefaults(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    adminDeleteDefault (req: AdminDeleteDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<AdminDeleteDefaultRequest, AdminDeleteDefaultResponse>(
        API.ADMIN_DELETE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: AdminDeleteDefaultResponse): void => {
          this.delDefault(req.TargetAppID, req.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateDefault (req: AdminCreateDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<AdminCreateDefaultRequest, AdminCreateDefaultResponse>(
        API.ADMIN_CREATE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: AdminCreateDefaultResponse): void => {
          this.addDefaults(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateDefault (req: AdminUpdateDefaultRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<AdminUpdateDefaultRequest, AdminUpdateDefaultResponse>(
        API.ADMIN_UPDATE_DEFAULT_APP_GOOD,
        req,
        req.Message,
        (resp: AdminUpdateDefaultResponse): void => {
          this.addDefaults(req.TargetAppID, [resp.Info])
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

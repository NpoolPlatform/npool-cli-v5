import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Default,
  GetAppDefaultGoodsRequest,
  GetAppDefaultGoodsResponse,
  CreateAppDefaultGoodRequest,
  CreateAppDefaultGoodResponse,
  DeleteAppDefaultGoodRequest,
  DeleteAppDefaultGoodResponse,
  UpdateAppDefaultGoodRequest,
  UpdateAppDefaultGoodResponse,
  CreateNAppDefaultGoodRequest,
  CreateNAppDefaultGoodResponse,
  GetNAppDefaultGoodsRequest,
  GetNAppDefaultGoodsResponse,
  DeleteNAppDefaultGoodRequest,
  DeleteNAppDefaultGoodResponse,
  UpdateNAppDefaultGoodRequest,
  UpdateNAppDefaultGoodResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useAppDefaultGoodStore = defineStore('app-default-goods', {
  state: () => ({
    AppDefaultGoods: new Map<string, Array<Default>>()
  }),
  getters: {
    default (): (appID: string | undefined, id: string) => Default | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppDefaultGoods.get(appID)?.find((el) => el.ID === id)
      }
    },
    coinUnitDefaultGoodID (): (appID: string | undefined, coinUnit: string) => string | undefined {
      return (appID: string | undefined, coinUnit: string) => {
        appID = formalizeAppID(appID)
        return this.AppDefaultGoods.get(appID)?.find((el) => el.CoinUnit === coinUnit)?.GoodID
      }
    },
    addDefaults (): (appID: string | undefined, defaults: Array<Default>) => void {
      return (appID: string | undefined, defaults: Array<Default>) => {
        appID = formalizeAppID(appID)
        let _defaults = this.AppDefaultGoods.get(appID) as Array<Default>
        if (!_defaults) {
          _defaults = []
        }
        defaults.forEach((def) => {
          const index = _defaults?.findIndex((el) => el.ID === def.ID)
          _defaults?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, def)
        })
        this.AppDefaultGoods.set(appID, _defaults)
      }
    },
    delDefault (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        let _defaults = this.AppDefaultGoods.get(appID) as Array<Default>
        if (!_defaults) {
          _defaults = []
        }
        const index = _defaults?.findIndex((el) => el.ID === id)
        _defaults?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.AppDefaultGoods.set(appID, _defaults)
      }
    }
  },
  actions: {
    getAppDefaultGoods (req: GetAppDefaultGoodsRequest, done: (error: boolean, rows?: Array<Default>) => void) {
      doActionWithError<GetAppDefaultGoodsRequest, GetAppDefaultGoodsResponse>(
        API.GET_APP_DEFAULT_GOODS,
        req,
        req.Message,
        (resp: GetAppDefaultGoodsResponse): void => {
          this.addDefaults(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createAppDefaultGood (req: CreateAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<CreateAppDefaultGoodRequest, CreateAppDefaultGoodResponse>(
        API.CREATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: CreateAppDefaultGoodResponse): void => {
          this.addDefaults(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppDefaultGood (req: DeleteAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<DeleteAppDefaultGoodRequest, DeleteAppDefaultGoodResponse>(
        API.DELETE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: DeleteAppDefaultGoodResponse): void => {
          this.delDefault(undefined, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateAppDefaultGood (req: UpdateAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<UpdateAppDefaultGoodRequest, UpdateAppDefaultGoodResponse>(
        API.UPDATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: UpdateAppDefaultGoodResponse): void => {
          this.addDefaults(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getNAppDefaultGoods (req: GetNAppDefaultGoodsRequest, done: (error: boolean, rows?: Array<Default>) => void) {
      doActionWithError<GetNAppDefaultGoodsRequest, GetNAppDefaultGoodsResponse>(
        API.GET_APP_DEFAULT_GOODS,
        req,
        req.Message,
        (resp: GetNAppDefaultGoodsResponse): void => {
          this.addDefaults(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteNAppDefaultGood (req: DeleteNAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<DeleteNAppDefaultGoodRequest, DeleteNAppDefaultGoodResponse>(
        API.DELETE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: DeleteNAppDefaultGoodResponse): void => {
          this.delDefault(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createNAppDefaultGood (req: CreateNAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<CreateNAppDefaultGoodRequest, CreateNAppDefaultGoodResponse>(
        API.CREATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: CreateNAppDefaultGoodResponse): void => {
          this.addDefaults(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateNAppDefaultGood (req: UpdateNAppDefaultGoodRequest, done: (error: boolean, row?: Default) => void) {
      doActionWithError<UpdateNAppDefaultGoodRequest, UpdateNAppDefaultGoodResponse>(
        API.UPDATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: UpdateNAppDefaultGoodResponse): void => {
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

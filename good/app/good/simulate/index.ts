import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Simulate,
  GetAppSimulateGoodsRequest,
  GetAppSimulateGoodsResponse,
  CreateAppSimulateGoodRequest,
  CreateAppSimulateGoodResponse,
  DeleteAppSimulateGoodRequest,
  DeleteAppSimulateGoodResponse,
  UpdateAppSimulateGoodRequest,
  UpdateAppSimulateGoodResponse,
  CreateNAppSimulateGoodRequest,
  CreateNAppSimulateGoodResponse,
  GetNAppSimulateGoodsRequest,
  GetNAppSimulateGoodsResponse,
  DeleteNAppSimulateGoodRequest,
  DeleteNAppSimulateGoodResponse,
  UpdateNAppSimulateGoodRequest,
  UpdateNAppSimulateGoodResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useAppSimulateGoodStore = defineStore('app-simulate-goods', {
  state: () => ({
    AppSimulateGoods: new Map<string, Array<Simulate>>()
  }),
  getters: {
    simulate (): (appID: string | undefined, id: string) => Simulate | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppSimulateGoods.get(appID)?.find((el: Simulate) => el.EntID === id)
      }
    },
    simulates (): (appID: string | undefined) => Array<Simulate> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.AppSimulateGoods.get(appID) || []
      }
    },
    coinUnitSimulateGoodID (): (appID: string | undefined, coinUnit: string) => string | undefined {
      return (appID: string | undefined, coinUnit: string) => {
        appID = formalizeAppID(appID)
        return this.AppSimulateGoods.get(appID)?.find((el) => el.CoinUnit === coinUnit)?.GoodID
      }
    }
  },
  actions: {
    addSimulates (appID: string | undefined, simulates: Array<Simulate>) {
      appID = formalizeAppID(appID)
      let _simulates = this.AppSimulateGoods.get(appID) as Array<Simulate>
      if (!_simulates) {
        _simulates = []
      }
      simulates.forEach((def) => {
        const index = _simulates?.findIndex((el) => el.EntID === def.EntID)
        _simulates?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, def)
      })
      this.AppSimulateGoods.set(appID, _simulates)
    },
    delSimulate (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      let _simulates = this.AppSimulateGoods.get(appID) as Array<Simulate>
      if (!_simulates) {
        _simulates = []
      }
      const index = _simulates?.findIndex((el) => el.EntID === id)
      _simulates?.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppSimulateGoods.set(appID, _simulates)
    },
    getAppSimulateGoods (req: GetAppSimulateGoodsRequest, done: (error: boolean, rows?: Array<Simulate>) => void) {
      doActionWithError<GetAppSimulateGoodsRequest, GetAppSimulateGoodsResponse>(
        API.GET_APP_SIMULATE_GOODS,
        req,
        req.Message,
        (resp: GetAppSimulateGoodsResponse): void => {
          this.addSimulates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createAppSimulateGood (req: CreateAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<CreateAppSimulateGoodRequest, CreateAppSimulateGoodResponse>(
        API.CREATE_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: CreateAppSimulateGoodResponse): void => {
          this.addSimulates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppSimulateGood (req: DeleteAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<DeleteAppSimulateGoodRequest, DeleteAppSimulateGoodResponse>(
        API.DELETE_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: DeleteAppSimulateGoodResponse): void => {
          this.delSimulate(undefined, resp.Info.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateAppSimulateGood (req: UpdateAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<UpdateAppSimulateGoodRequest, UpdateAppSimulateGoodResponse>(
        API.UPDATE_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: UpdateAppSimulateGoodResponse): void => {
          this.addSimulates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getNAppSimulateGoods (req: GetNAppSimulateGoodsRequest, done: (error: boolean, rows?: Array<Simulate>) => void) {
      doActionWithError<GetNAppSimulateGoodsRequest, GetNAppSimulateGoodsResponse>(
        API.GET_N_APP_SIMULATE_GOODS,
        req,
        req.Message,
        (resp: GetNAppSimulateGoodsResponse): void => {
          this.addSimulates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteNAppSimulateGood (req: DeleteNAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<DeleteNAppSimulateGoodRequest, DeleteNAppSimulateGoodResponse>(
        API.DELETE_N_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: DeleteNAppSimulateGoodResponse): void => {
          this.delSimulate(req.TargetAppID, req.EntID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createNAppSimulateGood (req: CreateNAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<CreateNAppSimulateGoodRequest, CreateNAppSimulateGoodResponse>(
        API.CREATE_N_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: CreateNAppSimulateGoodResponse): void => {
          this.addSimulates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateNAppSimulateGood (req: UpdateNAppSimulateGoodRequest, done: (error: boolean, row?: Simulate) => void) {
      doActionWithError<UpdateNAppSimulateGoodRequest, UpdateNAppSimulateGoodResponse>(
        API.UPDATE_N_APP_SIMULATE_GOOD,
        req,
        req.Message,
        (resp: UpdateNAppSimulateGoodResponse): void => {
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

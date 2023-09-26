import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  TopMostGood,
  GetTopMostGoodsRequest,
  GetTopMostGoodsResponse,
  UpdateTopMostGoodRequest,
  UpdateTopMostGoodResponse,
  CreateTopMostGoodRequest,
  CreateTopMostGoodResponse,
  GetNTopMostGoodsRequest,
  GetNTopMostGoodsResponse,
  UpdateNTopMostGoodRequest,
  UpdateNTopMostGoodResponse,
  DeleteTopMostGoodRequest,
  DeleteTopMostGoodResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useTopMostGoodStore = defineStore('topmostgood', {
  state: () => ({
    TopMostGoods: new Map<string, Array<TopMostGood>>()
  }),
  getters: {
    topmostgood (): (appID: string | undefined, id: string) => TopMostGood | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoods.get(appID)?.find((el) => {
          return el.ID === id
        })
      }
    },
    topmostgoods (): (appID?: string) => Array<TopMostGood> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoods.get(appID) || []
      }
    },
    addTopMostGoods (): (appID: string | undefined, goods: Array<TopMostGood>) => void {
      return (appID: string | undefined, goods: Array<TopMostGood>) => {
        appID = formalizeAppID(appID)
        let _goods = this.TopMostGoods.get(appID) as Array<TopMostGood>
        if (!_goods) {
          _goods = []
        }
        goods.forEach((topmost) => {
          if (!topmost) return
          const index = _goods.findIndex((el) => el.ID === topmost.ID)
          _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topmost)
        })
        this.TopMostGoods.set(appID, _goods)
      }
    },
    deleteTopMostGoods (): (tops: Array<TopMostGood>) => void {
      return (tops: Array<TopMostGood>) => {
        tops.forEach((top) => {
          const _tops = this.topmostgoods(top.AppID) || []
          const index = _tops.findIndex((el) => el.ID === top.ID)
          _tops.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
          this.TopMostGoods.set(top.AppID, _tops)
        })
      }
    }
  },
  actions: {
    createTopMostGood (req: CreateTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<CreateTopMostGoodRequest, CreateTopMostGoodResponse>(
        API.CREATE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: CreateTopMostGoodResponse): void => {
          this.addTopMostGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getTopMostGoods (req: GetTopMostGoodsRequest, done: (error: boolean, rows?: Array<TopMostGood>, total?: number) => void) {
      doActionWithError<GetTopMostGoodsRequest, GetTopMostGoodsResponse>(
        API.GET_TOPMOST_GOODS,
        req,
        req.Message,
        (resp: GetTopMostGoodsResponse): void => {
          this.addTopMostGoods(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateTopMostGood (req: UpdateTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<UpdateTopMostGoodRequest, UpdateTopMostGoodResponse>(
        API.UPDATE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: UpdateTopMostGoodResponse): void => {
          this.addTopMostGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteTopMostGood (req: DeleteTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<DeleteTopMostGoodRequest, DeleteTopMostGoodResponse>(
        API.DELETE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: DeleteTopMostGoodResponse): void => {
          this.deleteTopMostGoods([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getNTopMostGoods (req: GetNTopMostGoodsRequest, done: (error: boolean, rows?: Array<TopMostGood>, total?: number) => void) {
      doActionWithError<GetNTopMostGoodsRequest, GetNTopMostGoodsResponse>(
        API.GET_N_TOPMOST_GOODS,
        req,
        req.Message,
        (resp: GetNTopMostGoodsResponse): void => {
          this.addTopMostGoods(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateNTopMostGood (req: UpdateNTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<UpdateNTopMostGoodRequest, UpdateNTopMostGoodResponse>(
        API.UPDATE_N_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: UpdateNTopMostGoodResponse): void => {
          this.addTopMostGoods(req.TargetAppID, [resp.Info])
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

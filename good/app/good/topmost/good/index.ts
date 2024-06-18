import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../../request'
import { API } from './const'
import {
  TopMostGood,
  GetTopMostGoodsRequest,
  GetTopMostGoodsResponse,
  UpdateTopMostGoodRequest,
  UpdateTopMostGoodResponse,
  CreateTopMostGoodRequest,
  CreateTopMostGoodResponse,
  DeleteTopMostGoodRequest,
  DeleteTopMostGoodResponse,
  AdminCreateTopMostGoodRequest,
  AdminCreateTopMostGoodResponse,
  AdminGetTopMostGoodsRequest,
  AdminGetTopMostGoodsResponse,
  AdminUpdateTopMostGoodRequest,
  AdminUpdateTopMostGoodResponse,
  AdminDeleteTopMostGoodRequest,
  AdminDeleteTopMostGoodResponse
} from './types'
import { formalizeAppID } from '../../../../../appuser/app/local'

export const useTopMostGoodStore = defineStore('topMostGood', {
  state: () => ({
    TopMostGoods: new Map<string, Array<TopMostGood>>()
  }),
  getters: {
    topMostGood (): (appID: string | undefined, id: string) => TopMostGood | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoods.get(appID)?.find((el: TopMostGood) => el.EntID === id)
      }
    },
    topMostGoods (): (appID?: string) => Array<TopMostGood> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoods.get(appID) || []
      }
    }
  },
  actions: {
    addTopMostGoods (appID: string | undefined, goods: Array<TopMostGood>) {
      appID = formalizeAppID(appID)
      let _goods = this.TopMostGoods.get(appID) as Array<TopMostGood>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((topmost) => {
        if (!topmost) return
        const index = _goods.findIndex((el) => el.EntID === topmost.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topmost)
      })
      this.TopMostGoods.set(appID, _goods)
    },
    deleteTopMostGoods (tops: Array<TopMostGood>) {
      tops.forEach((top) => {
        const _tops = this.topMostGoods(top.AppID) || []
        const index = _tops.findIndex((el: TopMostGood) => el.EntID === top.EntID)
        _tops.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.TopMostGoods.set(top.AppID, _tops)
      })
    },
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
    adminCreateTopMostGood (req: AdminCreateTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<AdminCreateTopMostGoodRequest, AdminCreateTopMostGoodResponse>(
        API.ADMIN_CREATE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: AdminCreateTopMostGoodResponse): void => {
          this.addTopMostGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetTopMostGoods (req: AdminGetTopMostGoodsRequest, done: (error: boolean, rows?: Array<TopMostGood>, total?: number) => void) {
      doActionWithError<AdminGetTopMostGoodsRequest, AdminGetTopMostGoodsResponse>(
        API.ADMIN_GET_TOPMOST_GOODS,
        req,
        req.Message,
        (resp: AdminGetTopMostGoodsResponse): void => {
          this.addTopMostGoods(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateTopMostGood (req: AdminUpdateTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<AdminUpdateTopMostGoodRequest, AdminUpdateTopMostGoodResponse>(
        API.ADMIN_UPDATE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: AdminUpdateTopMostGoodResponse): void => {
          this.addTopMostGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteTopMostGood (req: AdminDeleteTopMostGoodRequest, done: (error: boolean, row?: TopMostGood) => void) {
      doActionWithError<AdminDeleteTopMostGoodRequest, AdminDeleteTopMostGoodResponse>(
        API.ADMIN_DELETE_TOPMOST_GOOD,
        req,
        req.Message,
        (resp: AdminDeleteTopMostGoodResponse): void => {
          this.deleteTopMostGoods([resp.Info])
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

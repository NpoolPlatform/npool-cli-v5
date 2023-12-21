import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  TopMost,
  GetTopMostsRequest,
  GetTopMostsResponse,
  UpdateTopMostRequest,
  UpdateTopMostResponse,
  CreateTopMostRequest,
  CreateTopMostResponse,
  GetNTopMostsRequest,
  GetNTopMostsResponse,
  UpdateNTopMostRequest,
  UpdateNTopMostResponse,
  DeleteTopMostRequest,
  DeleteTopMostResponse,
  CreateNTopMostRequest,
  CreateNTopMostResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useTopMostStore = defineStore('topmost', {
  state: () => ({
    TopMosts: new Map<string, Array<TopMost>>()
  }),
  getters: {
    topmost (): (appID: string | undefined, id: string) => TopMost | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.TopMosts.get(appID)?.find((el: TopMost) => el.EntID === id)
      }
    },
    topmosts (): (appID?: string) => Array<TopMost> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TopMosts.get(appID) || []
      }
    }
  },
  actions: {
    addTopMosts (appID: string | undefined, goods: Array<TopMost>) {
      appID = formalizeAppID(appID)
      let _goods = this.TopMosts.get(appID) as Array<TopMost>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((topmost) => {
        if (!topmost) return
        const index = _goods.findIndex((el) => el.EntID === topmost.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topmost)
      })
      this.TopMosts.set(appID, _goods)
    },
    deleteTopMosts (tops: Array<TopMost>) {
      tops.forEach((top) => {
        const _tops = this.topmosts(top.AppID) || []
        const index = _tops.findIndex((el: TopMost) => el.EntID === top.EntID)
        _tops.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.TopMosts.set(top.AppID, _tops)
      })
    },
    createTopMost (req: CreateTopMostRequest, done: (error: boolean, row?: TopMost) => void) {
      doActionWithError<CreateTopMostRequest, CreateTopMostResponse>(
        API.CREATE_TOPMOST,
        req,
        req.NotifyMessage,
        (resp: CreateTopMostResponse): void => {
          this.addTopMosts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getTopMosts (req: GetTopMostsRequest, done: (error: boolean, rows?: Array<TopMost>, total?: number) => void) {
      doActionWithError<GetTopMostsRequest, GetTopMostsResponse>(
        API.GET_TOPMOSTS,
        req,
        req.Message,
        (resp: GetTopMostsResponse): void => {
          this.addTopMosts(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateTopMost (req: UpdateTopMostRequest, done: (error: boolean, row?: TopMost) => void) {
      doActionWithError<UpdateTopMostRequest, UpdateTopMostResponse>(
        API.UPDATE_TOPMOST,
        req,
        req.NotifyMessage,
        (resp: UpdateTopMostResponse): void => {
          this.addTopMosts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteTopMost (req: DeleteTopMostRequest, done: (error: boolean, row?: TopMost) => void) {
      doActionWithError<DeleteTopMostRequest, DeleteTopMostResponse>(
        API.DELETE_TOPMOST,
        req,
        req.Message,
        (resp: DeleteTopMostResponse): void => {
          this.deleteTopMosts([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getNTopMosts (req: GetNTopMostsRequest, done: (error: boolean, rows?: Array<TopMost>, total?: number) => void) {
      doActionWithError<GetNTopMostsRequest, GetNTopMostsResponse>(
        API.GET_N_TOPMOSTS,
        req,
        req.Message,
        (resp: GetNTopMostsResponse): void => {
          this.addTopMosts(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    createNTopMost (req: CreateNTopMostRequest, done: (error: boolean, row?: TopMost) => void) {
      doActionWithError<CreateNTopMostRequest, CreateNTopMostResponse>(
        API.CREATE_N_TOPMOST,
        req,
        req.NotifyMessage,
        (resp: CreateTopMostResponse): void => {
          this.addTopMosts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateNTopMost (req: UpdateNTopMostRequest, done: (error: boolean, row?: TopMost) => void) {
      doActionWithError<UpdateNTopMostRequest, UpdateNTopMostResponse>(
        API.UPDATE_N_TOPMOST,
        req,
        req.NotifyMessage,
        (resp: UpdateNTopMostResponse): void => {
          this.addTopMosts(req.TargetAppID, [resp.Info])
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

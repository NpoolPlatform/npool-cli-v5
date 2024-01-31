import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  Recommend,
  GetRecommendsRequest,
  GetRecommendsResponse,
  GetMyRecommendsRequest,
  GetMyRecommendsResponse,
  UpdateRecommendRequest,
  UpdateRecommendResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  DeleteRecommendRequest,
  DeleteRecommendResponse,
  DeleteAppRecommendRequest,
  DeleteAppRecommendResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useRecommendStore = defineStore('recommends', {
  state: () => ({
    Recommends: new Map<string, Array<Recommend>>()
  }),
  getters: {
    recommend (): (appID: string | undefined, id: string) => Recommend | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Recommends.get(appID)?.find((el: Recommend) => el.EntID === id)
      }
    },
    recommends (): (appID?: string, goodID?: string, appGoodID?: string) => Array<Recommend> {
      return (appID?: string, goodID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        return this.Recommends.get(appID)?.filter((el) => {
          let ok = true
          if (goodID) ok &&= el.GoodID === goodID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          return ok
        }) || []
      }
    }
  },
  actions: {
    addRecommends (appID: string | undefined, recommends: Array<Recommend>) {
      appID = formalizeAppID(appID)
      let _recommends = this.Recommends.get(appID) as Array<Recommend>
      if (!_recommends) {
        _recommends = []
      }
      recommends.forEach((recommend) => {
        if (!recommend) return
        const index = _recommends.findIndex((el) => el.EntID === recommend.EntID)
        _recommends.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, recommend)
      })
      this.Recommends.set(appID, _recommends)
    },
    deleteRecommends (recommends: Array<Recommend>) {
      recommends.forEach((recommend) => {
        const _recommends = this.recommends(recommend.AppID) || []
        const index = _recommends.findIndex((el: Recommend) => el.EntID === recommend.EntID)
        _recommends.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.Recommends.set(recommend.AppID, _recommends)
      })
    },
    createRecommend (req: CreateRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<CreateRecommendRequest, CreateRecommendResponse>(
        API.CREATE_GOODRECOMMEND,
        req,
        req.NotifyMessage,
        (resp: CreateRecommendResponse): void => {
          this.addRecommends(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getRecommends (req: GetRecommendsRequest, done: (error: boolean, rows?: Array<Recommend>, total?: number) => void) {
      doActionWithError<GetRecommendsRequest, GetRecommendsResponse>(
        API.GET_GOODRECOMMENDS,
        req,
        req.Message,
        (resp: GetRecommendsResponse): void => {
          this.addRecommends(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateRecommend (req: UpdateRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<UpdateRecommendRequest, UpdateRecommendResponse>(
        API.UPDATE_GOODRECOMMEND,
        req,
        req.NotifyMessage,
        (resp: UpdateRecommendResponse): void => {
          this.addRecommends(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteRecommend (req: DeleteRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<DeleteRecommendRequest, DeleteRecommendResponse>(
        API.DELETE_GOODRECOMMEND,
        req,
        req.Message,
        (resp: DeleteRecommendResponse): void => {
          this.deleteRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppGoodRecommend (req: DeleteAppRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<DeleteAppRecommendRequest, DeleteAppRecommendResponse>(
        API.DELETE_APP_GOODRECOMMEND,
        req,
        req.Message,
        (resp: DeleteAppRecommendResponse): void => {
          this.deleteRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getMyRecommends (req: GetMyRecommendsRequest, done: (error: boolean, rows?: Array<Recommend>, total?: number) => void) {
      doActionWithError<GetMyRecommendsRequest, GetMyRecommendsResponse>(
        API.GET_MY_GOODRECOMMENDS,
        req,
        req.Message,
        (resp: GetMyRecommendsResponse): void => {
          this.addRecommends(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

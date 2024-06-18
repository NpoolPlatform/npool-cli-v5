import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
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
  UpdateUserRecommendRequest,
  UpdateUserRecommendResponse,
  AdminUpdateRecommendRequest,
  AdminUpdateRecommendResponse,
  AdminGetRecommendsRequest,
  AdminGetRecommendsResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useRecommendStore = defineStore('app-good-recommends', {
  state: () => ({
    Recommends: new Map<string, Array<Recommend>>()
  }),
  getters: {
    comment (): (appID: string | undefined, id: string) => Recommend | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Recommends.get(appID)?.find((el: Recommend) => el.EntID === id)
      }
    },
    comments (): (appID?: string) => Array<Recommend> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Recommends.get(appID) || []
      }
    }
  },
  actions: {
    addRecommends (goods: Array<Recommend>) {
      goods.forEach((comment) => {
        if (!comment) return
        const _goods = this.Recommends.get(comment.AppID) as Array<Recommend> || []
        const index = _goods.findIndex((el) => el.EntID === comment.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, comment)
        this.Recommends.set(comment.AppID, _goods)
      })
    },
    _deleteRecommend (comment: Recommend) {
      const _comments = this.comments(comment.AppID) || []
      const index = _comments.findIndex((el: Recommend) => el.EntID === comment.EntID)
      _comments.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Recommends.set(comment.AppID, _comments)
    },
    createRecommend (req: CreateRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<CreateRecommendRequest, CreateRecommendResponse>(
        API.CREATE_GOOD_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: CreateRecommendResponse): void => {
          this.addRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getRecommends (req: GetRecommendsRequest, done: (error: boolean, rows?: Array<Recommend>, total?: number) => void) {
      doActionWithError<GetRecommendsRequest, GetRecommendsResponse>(
        API.GET_GOOD_RECOMMENDS,
        req,
        req.Message,
        (resp: GetRecommendsResponse): void => {
          this.addRecommends(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateRecommend (req: UpdateRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<UpdateRecommendRequest, UpdateRecommendResponse>(
        API.UPDATE_GOOD_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: UpdateRecommendResponse): void => {
          this.addRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteRecommend (req: DeleteRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<DeleteRecommendRequest, DeleteRecommendResponse>(
        API.DELETE_GOOD_RECOMMEND,
        req,
        req.Message,
        (resp: DeleteRecommendResponse): void => {
          this._deleteRecommend(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getMyRecommends (req: GetMyRecommendsRequest, done: (error: boolean, rows?: Array<Recommend>, total?: number) => void) {
      doActionWithError<GetMyRecommendsRequest, GetMyRecommendsResponse>(
        API.GET_MY_GOOD_RECOMMENDS,
        req,
        req.Message,
        (resp: GetMyRecommendsResponse): void => {
          this.addRecommends(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateUserRecommend (req: UpdateUserRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<UpdateUserRecommendRequest, UpdateUserRecommendResponse>(
        API.UPDATE_USER_GOOD_RECOMMEND,
        req,
        req.Message,
        (resp: UpdateUserRecommendResponse): void => {
          this.addRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateRecommend (req: AdminUpdateRecommendRequest, done: (error: boolean, row?: Recommend) => void) {
      doActionWithError<AdminUpdateRecommendRequest, AdminUpdateRecommendResponse>(
        API.ADMIN_UPDATE_GOOD_RECOMMEND,
        req,
        req.Message,
        (resp: AdminUpdateRecommendResponse): void => {
          this.addRecommends([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetRecommends (req: AdminGetRecommendsRequest, done: (error: boolean, rows?: Array<Recommend>, total?: number) => void) {
      doActionWithError<AdminGetRecommendsRequest, AdminGetRecommendsResponse>(
        API.ADMIN_GET_GOOD_RECOMMENDS,
        req,
        req.Message,
        (resp: AdminGetRecommendsResponse): void => {
          this.addRecommends(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

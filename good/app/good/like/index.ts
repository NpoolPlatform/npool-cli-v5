import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Like,
  GetLikesRequest,
  GetLikesResponse,
  GetMyLikesRequest,
  GetMyLikesResponse,
  CreateLikeRequest,
  CreateLikeResponse,
  DeleteLikeRequest,
  DeleteLikeResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useLikeStore = defineStore('app-good-likes', {
  state: () => ({
    Likes: new Map<string, Array<Like>>()
  }),
  getters: {
    like (): (appID: string | undefined, id: string) => Like | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Likes.get(appID)?.find((el: Like) => el.EntID === id)
      }
    },
    likes (): (appID?: string) => Array<Like> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Likes.get(appID) || []
      }
    }
  },
  actions: {
    addLikes (goods: Array<Like>) {
      goods.forEach((like) => {
        if (!like) return
        const _goods = this.Likes.get(like.AppID) as Array<Like> || []
        const index = _goods.findIndex((el) => el.EntID === like.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, like)
        this.Likes.set(like.AppID, _goods)
      })
    },
    _deleteLike (like: Like) {
      const _likes = this.likes(like.AppID) || []
      const index = _likes.findIndex((el: Like) => el.EntID === like.EntID)
      _likes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Likes.set(like.AppID, _likes)
    },
    createLike (req: CreateLikeRequest, done: (error: boolean, row?: Like) => void) {
      doActionWithError<CreateLikeRequest, CreateLikeResponse>(
        API.CREATE_GOOD_LIKE,
        req,
        req.Message,
        (resp: CreateLikeResponse): void => {
          this.addLikes([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getLikes (req: GetLikesRequest, done: (error: boolean, rows?: Array<Like>, total?: number) => void) {
      doActionWithError<GetLikesRequest, GetLikesResponse>(
        API.GET_GOOD_LIKES,
        req,
        req.Message,
        (resp: GetLikesResponse): void => {
          this.addLikes(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    deleteLike (req: DeleteLikeRequest, done: (error: boolean, row?: Like) => void) {
      doActionWithError<DeleteLikeRequest, DeleteLikeResponse>(
        API.DELETE_GOOD_LIKE,
        req,
        req.Message,
        (resp: DeleteLikeResponse): void => {
          this._deleteLike(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getMyLikes (req: GetMyLikesRequest, done: (error: boolean, rows?: Array<Like>, total?: number) => void) {
      doActionWithError<GetMyLikesRequest, GetMyLikesResponse>(
        API.GET_MY_GOOD_LIKES,
        req,
        req.Message,
        (resp: GetMyLikesResponse): void => {
          this.addLikes(resp.Infos)
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

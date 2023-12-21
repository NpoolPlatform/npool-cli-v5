import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  Comment,
  GetCommentsRequest,
  GetCommentsResponse,
  GetMyCommentsRequest,
  GetMyCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  DeleteAppCommentRequest,
  DeleteAppCommentResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    Comments: new Map<string, Array<Comment>>()
  }),
  getters: {
    comment (): (appID: string | undefined, id: string) => Comment | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Comments.get(appID)?.find((el: Comment) => el.EntID === id)
      }
    },
    comments (): (appID?: string) => Array<Comment> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Comments.get(appID) || []
      }
    }
  },
  actions: {
    addComments (appID: string | undefined, goods: Array<Comment>) {
      appID = formalizeAppID(appID)
      let _goods = this.Comments.get(appID) as Array<Comment>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((topmost) => {
        if (!topmost) return
        const index = _goods.findIndex((el) => el.EntID === topmost.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topmost)
      })
      this.Comments.set(appID, _goods)
    },
    deleteComments (tops: Array<Comment>) {
      tops.forEach((top) => {
        const _tops = this.comments(top.AppID) || []
        const index = _tops.findIndex((el: Comment) => el.EntID === top.EntID)
        _tops.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.Comments.set(top.AppID, _tops)
      })
    },
    createComment (req: CreateCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<CreateCommentRequest, CreateCommentResponse>(
        API.CREATE_GOODCOMMENT,
        req,
        req.Message,
        (resp: CreateCommentResponse): void => {
          this.addComments(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getComments (req: GetCommentsRequest, done: (error: boolean, rows?: Array<Comment>, total?: number) => void) {
      doActionWithError<GetCommentsRequest, GetCommentsResponse>(
        API.GET_GOODCOMMENTS,
        req,
        req.Message,
        (resp: GetCommentsResponse): void => {
          this.addComments(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateComment (req: UpdateCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<UpdateCommentRequest, UpdateCommentResponse>(
        API.UPDATE_GOODCOMMENT,
        req,
        req.Message,
        (resp: UpdateCommentResponse): void => {
          this.addComments(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteComment (req: DeleteCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<DeleteCommentRequest, DeleteCommentResponse>(
        API.DELETE_GOODCOMMENT,
        req,
        req.Message,
        (resp: DeleteCommentResponse): void => {
          this.deleteComments([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppGoodComment (req: DeleteAppCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<DeleteAppCommentRequest, DeleteAppCommentResponse>(
        API.DELETE_APP_GOODCOMMENT,
        req,
        req.Message,
        (resp: DeleteAppCommentResponse): void => {
          this.deleteComments([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getMyComments (req: GetMyCommentsRequest, done: (error: boolean, rows?: Array<Comment>, total?: number) => void) {
      doActionWithError<GetMyCommentsRequest, GetMyCommentsResponse>(
        API.GET_MY_GOODCOMMENTS,
        req,
        req.Message,
        (resp: GetMyCommentsResponse): void => {
          this.addComments(undefined, resp.Infos)
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

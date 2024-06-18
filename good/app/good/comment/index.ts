import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
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
  UpdateUserCommentRequest,
  UpdateUserCommentResponse,
  DeleteUserCommentRequest,
  DeleteUserCommentResponse,
  AdminUpdateCommentRequest,
  AdminUpdateCommentResponse,
  AdminDeleteCommentRequest,
  AdminDeleteCommentResponse,
  AdminGetCommentsRequest,
  AdminGetCommentsResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useCommentStore = defineStore('app-good-comments', {
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
    addComments (goods: Array<Comment>) {
      goods.forEach((comment) => {
        if (!comment) return
        const _goods = this.Comments.get(comment.AppID) as Array<Comment> || []
        const index = _goods.findIndex((el) => el.EntID === comment.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, comment)
        this.Comments.set(comment.AppID, _goods)
      })
    },
    _deleteComment (comment: Comment) {
      const _comments = this.comments(comment.AppID) || []
      const index = _comments.findIndex((el: Comment) => el.EntID === comment.EntID)
      _comments.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Comments.set(comment.AppID, _comments)
    },
    createComment (req: CreateCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<CreateCommentRequest, CreateCommentResponse>(
        API.CREATE_GOODCOMMENT,
        req,
        req.Message,
        (resp: CreateCommentResponse): void => {
          this.addComments([resp.Info])
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
          this.addComments(resp.Infos)
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
          this.addComments([resp.Info])
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
          this._deleteComment(resp.Info)
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
          this.addComments(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateUserComment (req: UpdateUserCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<UpdateUserCommentRequest, UpdateUserCommentResponse>(
        API.UPDATE_USER_GOODCOMMENT,
        req,
        req.Message,
        (resp: UpdateUserCommentResponse): void => {
          this.addComments([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteUserComment (req: DeleteUserCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<DeleteUserCommentRequest, DeleteUserCommentResponse>(
        API.DELETE_USER_GOODCOMMENT,
        req,
        req.Message,
        (resp: DeleteUserCommentResponse): void => {
          this._deleteComment(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateComment (req: AdminUpdateCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<AdminUpdateCommentRequest, AdminUpdateCommentResponse>(
        API.ADMIN_UPDATE_GOODCOMMENT,
        req,
        req.Message,
        (resp: AdminUpdateCommentResponse): void => {
          this.addComments([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteComment (req: AdminDeleteCommentRequest, done: (error: boolean, row?: Comment) => void) {
      doActionWithError<AdminDeleteCommentRequest, AdminDeleteCommentResponse>(
        API.ADMIN_DELETE_GOODCOMMENT,
        req,
        req.Message,
        (resp: AdminDeleteCommentResponse): void => {
          this._deleteComment(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetComments (req: AdminGetCommentsRequest, done: (error: boolean, rows?: Array<Comment>, total?: number) => void) {
      doActionWithError<AdminGetCommentsRequest, AdminGetCommentsResponse>(
        API.ADMIN_GET_GOODCOMMENTS,
        req,
        req.Message,
        (resp: AdminGetCommentsResponse): void => {
          this.addComments(resp.Infos)
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

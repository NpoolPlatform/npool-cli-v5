import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Required,
  GetRequiredsRequest,
  GetRequiredsResponse,
  UpdateRequiredRequest,
  UpdateRequiredResponse,
  CreateRequiredRequest,
  CreateRequiredResponse,
  DeleteRequiredRequest,
  DeleteRequiredResponse,
  AdminUpdateRequiredRequest,
  AdminUpdateRequiredResponse,
  AdminGetRequiredsRequest,
  AdminGetRequiredsResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useRequiredStore = defineStore('app-good-requireds', {
  state: () => ({
    Requireds: new Map<string, Array<Required>>()
  }),
  getters: {
    comment (): (appID: string | undefined, id: string) => Required | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Requireds.get(appID)?.find((el: Required) => el.EntID === id)
      }
    },
    comments (): (appID?: string) => Array<Required> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Requireds.get(appID) || []
      }
    }
  },
  actions: {
    addRequireds (goods: Array<Required>) {
      goods.forEach((comment) => {
        if (!comment) return
        const _goods = this.Requireds.get(comment.AppID) as Array<Required> || []
        const index = _goods.findIndex((el) => el.EntID === comment.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, comment)
        this.Requireds.set(comment.AppID, _goods)
      })
    },
    _deleteRequired (comment: Required) {
      const _comments = this.comments(comment.AppID) || []
      const index = _comments.findIndex((el: Required) => el.EntID === comment.EntID)
      _comments.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Requireds.set(comment.AppID, _comments)
    },
    createRequired (req: CreateRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<CreateRequiredRequest, CreateRequiredResponse>(
        API.CREATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: CreateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getRequireds (req: GetRequiredsRequest, done: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<GetRequiredsRequest, GetRequiredsResponse>(
        API.GET_REQUIRED_APP_GOODS,
        req,
        req.Message,
        (resp: GetRequiredsResponse): void => {
          this.addRequireds(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateRequired (req: UpdateRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<UpdateRequiredRequest, UpdateRequiredResponse>(
        API.UPDATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: UpdateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteRequired (req: DeleteRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<DeleteRequiredRequest, DeleteRequiredResponse>(
        API.DELETE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: DeleteRequiredResponse): void => {
          this._deleteRequired(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateRequired (req: AdminUpdateRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminUpdateRequiredRequest, AdminUpdateRequiredResponse>(
        API.ADMIN_UPDATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: AdminUpdateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetRequireds (req: AdminGetRequiredsRequest, done: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<AdminGetRequiredsRequest, AdminGetRequiredsResponse>(
        API.ADMIN_GET_REQUIRED_APP_GOODS,
        req,
        req.Message,
        (resp: AdminGetRequiredsResponse): void => {
          this.addRequireds(resp.Infos)
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

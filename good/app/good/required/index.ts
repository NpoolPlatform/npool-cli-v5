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
  AdminGetRequiredsResponse,
  AdminCreateRequiredRequest,
  AdminCreateRequiredResponse,
  AdminDeleteRequiredRequest,
  AdminDeleteRequiredResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useRequiredStore = defineStore('appGoodRrequireds', {
  state: () => ({
    Requireds: new Map<string, Array<Required>>()
  }),
  getters: {
    required (): (appID: string | undefined, id: string) => Required | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Requireds.get(appID)?.find((el: Required) => el.EntID === id)
      }
    },
    requireds (): (appID?: string) => Array<Required> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Requireds.get(appID) || []
      }
    }
  },
  actions: {
    addRequireds (goods: Array<Required>) {
      goods.forEach((required) => {
        if (!required) return
        const _goods = this.Requireds.get(required.AppID) as Array<Required> || []
        const index = _goods.findIndex((el) => el.EntID === required.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, required)
        this.Requireds.set(required.AppID, _goods)
      })
    },
    _deleteRequired (required: Required) {
      const _requireds = this.requireds(required.AppID) || []
      const index = _requireds.findIndex((el: Required) => el.EntID === required.EntID)
      _requireds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Requireds.set(required.AppID, _requireds)
    },
    createRequired (req: CreateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<CreateRequiredRequest, CreateRequiredResponse>(
        API.CREATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: CreateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getRequireds (req: GetRequiredsRequest, done?: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<GetRequiredsRequest, GetRequiredsResponse>(
        API.GET_REQUIRED_APP_GOODS,
        req,
        req.Message,
        (resp: GetRequiredsResponse): void => {
          this.addRequireds(resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        }
      )
    },
    updateRequired (req: UpdateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<UpdateRequiredRequest, UpdateRequiredResponse>(
        API.UPDATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: UpdateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    deleteRequired (req: DeleteRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<DeleteRequiredRequest, DeleteRequiredResponse>(
        API.DELETE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: DeleteRequiredResponse): void => {
          this._deleteRequired(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreateRequired (req: AdminCreateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminCreateRequiredRequest, AdminCreateRequiredResponse>(
        API.ADMIN_CREATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: AdminCreateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateRequired (req: AdminUpdateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminUpdateRequiredRequest, AdminUpdateRequiredResponse>(
        API.ADMIN_UPDATE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: AdminUpdateRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminGetRequireds (req: AdminGetRequiredsRequest, done?: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<AdminGetRequiredsRequest, AdminGetRequiredsResponse>(
        API.ADMIN_GET_REQUIRED_APP_GOODS,
        req,
        req.Message,
        (resp: AdminGetRequiredsResponse): void => {
          this.addRequireds(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteRequired (req: AdminDeleteRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminDeleteRequiredRequest, AdminDeleteRequiredResponse>(
        API.ADMIN_DELETE_REQUIRED_APP_GOOD,
        req,
        req.Message,
        (resp: AdminDeleteRequiredResponse): void => {
          this.addRequireds([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

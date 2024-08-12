import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../../request'
import { API } from './const'
import {
  TopMostConstraint,
  GetTopMostConstraintsRequest,
  GetTopMostConstraintsResponse,
  UpdateTopMostConstraintRequest,
  UpdateTopMostConstraintResponse,
  CreateTopMostConstraintRequest,
  CreateTopMostConstraintResponse,
  DeleteTopMostConstraintRequest,
  DeleteTopMostConstraintResponse,
  AdminUpdateTopMostConstraintRequest,
  AdminUpdateTopMostConstraintResponse,
  AdminDeleteTopMostConstraintRequest,
  AdminDeleteTopMostConstraintResponse,
  AdminGetTopMostConstraintsRequest,
  AdminGetTopMostConstraintsResponse,
  AdminCreateTopMostConstraintRequest,
  AdminCreateTopMostConstraintResponse
} from './types'
import { formalizeAppID } from '../../../../../appuser/app/local'

export const useTopMostConstraintStore = defineStore('topmost-constraints', {
  state: () => ({
    TopMostConstraints: new Map<string, Array<TopMostConstraint>>()
  }),
  getters: {
    topMostConstraint (): (appID: string | undefined, id: string) => TopMostConstraint | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostConstraints.get(appID)?.find((el: TopMostConstraint) => el.EntID === id)
      }
    },
    topMostConstraints (): (appID?: string) => Array<TopMostConstraint> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostConstraints.get(appID) || []
      }
    }
  },
  actions: {
    addTopMostConstraints (goods: Array<TopMostConstraint>) {
      goods.forEach((topMostConstraint) => {
        if (!topMostConstraint) return
        const _goods = this.TopMostConstraints.get(topMostConstraint.AppID) as Array<TopMostConstraint> || []
        const index = _goods.findIndex((el) => el.EntID === topMostConstraint.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topMostConstraint)
        this.TopMostConstraints.set(topMostConstraint.AppID, _goods)
      })
    },
    _deleteTopMostConstraint (topMostConstraint: TopMostConstraint) {
      const _topMostConstraints = this.topMostConstraints(topMostConstraint.AppID) || []
      const index = _topMostConstraints.findIndex((el: TopMostConstraint) => el.EntID === topMostConstraint.EntID)
      _topMostConstraints.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.TopMostConstraints.set(topMostConstraint.AppID, _topMostConstraints)
    },
    createTopMostConstraint (req: CreateTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<CreateTopMostConstraintRequest, CreateTopMostConstraintResponse>(
        API.CREATE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: CreateTopMostConstraintResponse): void => {
          this.addTopMostConstraints([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getTopMostConstraints (req: GetTopMostConstraintsRequest, done?: (error: boolean, rows?: Array<TopMostConstraint>, total?: number) => void) {
      doActionWithError<GetTopMostConstraintsRequest, GetTopMostConstraintsResponse>(
        API.GET_TOPMOST_CONSTRAINTS,
        req,
        req.Message,
        (resp: GetTopMostConstraintsResponse): void => {
          this.addTopMostConstraints(resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        }
      )
    },
    updateTopMostConstraint (req: UpdateTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<UpdateTopMostConstraintRequest, UpdateTopMostConstraintResponse>(
        API.UPDATE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: UpdateTopMostConstraintResponse): void => {
          this.addTopMostConstraints([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    deleteTopMostConstraint (req: DeleteTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<DeleteTopMostConstraintRequest, DeleteTopMostConstraintResponse>(
        API.DELETE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: DeleteTopMostConstraintResponse): void => {
          this._deleteTopMostConstraint(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreateTopMostConstraint (req: AdminCreateTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<AdminCreateTopMostConstraintRequest, AdminCreateTopMostConstraintResponse>(
        API.ADMIN_CREATE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminCreateTopMostConstraintResponse): void => {
          this.addTopMostConstraints([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateTopMostConstraint (req: AdminUpdateTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<AdminUpdateTopMostConstraintRequest, AdminUpdateTopMostConstraintResponse>(
        API.ADMIN_UPDATE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminUpdateTopMostConstraintResponse): void => {
          this.addTopMostConstraints([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteTopMostConstraint (req: AdminDeleteTopMostConstraintRequest, done?: (error: boolean, row?: TopMostConstraint) => void) {
      doActionWithError<AdminDeleteTopMostConstraintRequest, AdminDeleteTopMostConstraintResponse>(
        API.ADMIN_DELETE_TOPMOST_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminDeleteTopMostConstraintResponse): void => {
          this._deleteTopMostConstraint(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminGetTopMostConstraints (req: AdminGetTopMostConstraintsRequest, done?: (error: boolean, rows?: Array<TopMostConstraint>, total?: number) => void) {
      doActionWithError<AdminGetTopMostConstraintsRequest, AdminGetTopMostConstraintsResponse>(
        API.ADMIN_GET_TOPMOST_CONSTRAINTS,
        req,
        req.Message,
        (resp: AdminGetTopMostConstraintsResponse): void => {
          this.addTopMostConstraints(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

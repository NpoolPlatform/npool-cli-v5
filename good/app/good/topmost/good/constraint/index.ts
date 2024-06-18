import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../../../request'
import { API } from './const'
import {
  TopMostGoodConstraint,
  GetTopMostGoodConstraintsRequest,
  GetTopMostGoodConstraintsResponse,
  UpdateTopMostGoodConstraintRequest,
  UpdateTopMostGoodConstraintResponse,
  CreateTopMostGoodConstraintRequest,
  CreateTopMostGoodConstraintResponse,
  DeleteTopMostGoodConstraintRequest,
  DeleteTopMostGoodConstraintResponse,
  AdminUpdateTopMostGoodConstraintRequest,
  AdminUpdateTopMostGoodConstraintResponse,
  AdminDeleteTopMostGoodConstraintRequest,
  AdminDeleteTopMostGoodConstraintResponse,
  AdminGetTopMostGoodConstraintsRequest,
  AdminGetTopMostGoodConstraintsResponse,
  AdminCreateTopMostGoodConstraintRequest,
  AdminCreateTopMostGoodConstraintResponse
} from './types'
import { formalizeAppID } from '../../../../../../appuser/app/local'

export const useTopMostGoodConstraintStore = defineStore('topmost-constraints', {
  state: () => ({
    TopMostGoodConstraints: new Map<string, Array<TopMostGoodConstraint>>()
  }),
  getters: {
    topMostGoodConstraint (): (appID: string | undefined, id: string) => TopMostGoodConstraint | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoodConstraints.get(appID)?.find((el: TopMostGoodConstraint) => el.EntID === id)
      }
    },
    topMostGoodConstraints (): (appID?: string) => Array<TopMostGoodConstraint> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TopMostGoodConstraints.get(appID) || []
      }
    }
  },
  actions: {
    addTopMostGoodConstraints (goods: Array<TopMostGoodConstraint>) {
      goods.forEach((topMostGoodConstraint) => {
        if (!topMostGoodConstraint) return
        const _goods = this.TopMostGoodConstraints.get(topMostGoodConstraint.AppID) as Array<TopMostGoodConstraint> || []
        const index = _goods.findIndex((el) => el.EntID === topMostGoodConstraint.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, topMostGoodConstraint)
        this.TopMostGoodConstraints.set(topMostGoodConstraint.AppID, _goods)
      })
    },
    _deleteTopMostGoodConstraint (topMostGoodConstraint: TopMostGoodConstraint) {
      const _topMostGoodConstraints = this.topMostGoodConstraints(topMostGoodConstraint.AppID) || []
      const index = _topMostGoodConstraints.findIndex((el: TopMostGoodConstraint) => el.EntID === topMostGoodConstraint.EntID)
      _topMostGoodConstraints.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.TopMostGoodConstraints.set(topMostGoodConstraint.AppID, _topMostGoodConstraints)
    },
    createTopMostGoodConstraint (req: CreateTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<CreateTopMostGoodConstraintRequest, CreateTopMostGoodConstraintResponse>(
        API.CREATE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: CreateTopMostGoodConstraintResponse): void => {
          this.addTopMostGoodConstraints([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getTopMostGoodConstraints (req: GetTopMostGoodConstraintsRequest, done: (error: boolean, rows?: Array<TopMostGoodConstraint>, total?: number) => void) {
      doActionWithError<GetTopMostGoodConstraintsRequest, GetTopMostGoodConstraintsResponse>(
        API.GET_TOPMOST_GOOD_CONSTRAINTS,
        req,
        req.Message,
        (resp: GetTopMostGoodConstraintsResponse): void => {
          this.addTopMostGoodConstraints(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateTopMostGoodConstraint (req: UpdateTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<UpdateTopMostGoodConstraintRequest, UpdateTopMostGoodConstraintResponse>(
        API.UPDATE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: UpdateTopMostGoodConstraintResponse): void => {
          this.addTopMostGoodConstraints([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteTopMostGoodConstraint (req: DeleteTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<DeleteTopMostGoodConstraintRequest, DeleteTopMostGoodConstraintResponse>(
        API.DELETE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: DeleteTopMostGoodConstraintResponse): void => {
          this._deleteTopMostGoodConstraint(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateTopMostGoodConstraint (req: AdminCreateTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<AdminCreateTopMostGoodConstraintRequest, AdminCreateTopMostGoodConstraintResponse>(
        API.ADMIN_CREATE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminCreateTopMostGoodConstraintResponse): void => {
          this.addTopMostGoodConstraints([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateTopMostGoodConstraint (req: AdminUpdateTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<AdminUpdateTopMostGoodConstraintRequest, AdminUpdateTopMostGoodConstraintResponse>(
        API.ADMIN_UPDATE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminUpdateTopMostGoodConstraintResponse): void => {
          this.addTopMostGoodConstraints([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteTopMostGoodConstraint (req: AdminDeleteTopMostGoodConstraintRequest, done: (error: boolean, row?: TopMostGoodConstraint) => void) {
      doActionWithError<AdminDeleteTopMostGoodConstraintRequest, AdminDeleteTopMostGoodConstraintResponse>(
        API.ADMIN_DELETE_TOPMOST_GOOD_CONSTRAINT,
        req,
        req.Message,
        (resp: AdminDeleteTopMostGoodConstraintResponse): void => {
          this._deleteTopMostGoodConstraint(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetTopMostGoodConstraints (req: AdminGetTopMostGoodConstraintsRequest, done: (error: boolean, rows?: Array<TopMostGoodConstraint>, total?: number) => void) {
      doActionWithError<AdminGetTopMostGoodConstraintsRequest, AdminGetTopMostGoodConstraintsResponse>(
        API.ADMIN_GET_TOPMOST_GOOD_CONSTRAINTS,
        req,
        req.Message,
        (resp: AdminGetTopMostGoodConstraintsResponse): void => {
          this.addTopMostGoodConstraints(resp.Infos)
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

import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Label,
  GetLabelsRequest,
  GetLabelsResponse,
  AdminGetLabelsRequest,
  AdminGetLabelsResponse,
  UpdateLabelRequest,
  UpdateLabelResponse,
  AdminCreateLabelRequest,
  AdminCreateLabelResponse,
  AdminUpdateLabelRequest,
  AdminUpdateLabelResponse,
  AdminDeleteLabelRequest,
  AdminDeleteLabelResponse,
  CreateLabelRequest,
  CreateLabelResponse,
  DeleteLabelRequest,
  DeleteLabelResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useLabelStore = defineStore('app-good-descriptions', {
  state: () => ({
    Labels: new Map<string, Array<Label>>()
  }),
  getters: {
    appFee (): (appID: string | undefined, id: string) => Label | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Labels.get(appID)?.find((el: Label) => el.EntID === id)
      }
    },
    goods (): (appID?: string) => Array<Label> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Labels.get(appID) || []
      }
    }
  },
  actions: {
    addLabels (appID: string | undefined, goods: Array<Label>) {
      appID = formalizeAppID(appID)
      let _goods = this.Labels.get(appID) as Array<Label>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((good) => {
        if (!good) return
        const index = _goods.findIndex((el) => el.EntID === good.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.Labels.set(appID, _goods)
    },
    _deleteLabel (appID: string | undefined, good: Label) {
      appID = formalizeAppID(appID)
      let _goods = this.Labels.get(appID) as Array<Label>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Labels.set(appID, _goods)
    },
    getLabels (req: GetLabelsRequest, done: (error: boolean, rows?: Array<Label>, total?: number) => void) {
      doActionWithError<GetLabelsRequest, GetLabelsResponse>(
        API.GET_GOOD_LABELS,
        req,
        req.Message,
        (resp: GetLabelsResponse): void => {
          this.addLabels(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    createLabels (req: CreateLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<CreateLabelRequest, CreateLabelResponse>(
        API.CREATE_GOOD_LABEL,
        req,
        req.Message,
        (resp: CreateLabelResponse): void => {
          this.addLabels(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateLabel (req: UpdateLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<UpdateLabelRequest, UpdateLabelResponse>(
        API.UPDATE_GOOD_LABEL,
        req,
        req.Message,
        (resp: UpdateLabelResponse): void => {
          this.addLabels(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteLabel (req: DeleteLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<DeleteLabelRequest, DeleteLabelResponse>(
        API.DELETE_GOOD_LABEL,
        req,
        req.Message,
        (resp: DeleteLabelResponse): void => {
          this._deleteLabel(undefined, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminCreateLabels (req: AdminCreateLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<AdminCreateLabelRequest, AdminCreateLabelResponse>(
        API.ADMIN_CREATE_GOOD_LABEL,
        req,
        req.Message,
        (resp: AdminCreateLabelResponse): void => {
          this.addLabels(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminGetLabels (req: AdminGetLabelsRequest, done: (error: boolean, rows?: Array<Label>, total?: number) => void) {
      doActionWithError<AdminGetLabelsRequest, AdminGetLabelsResponse>(
        API.ADMIN_GET_GOOD_LABELS,
        req,
        req.Message,
        (resp: AdminGetLabelsResponse): void => {
          this.addLabels(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    adminUpdateLabels (req: AdminUpdateLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<AdminUpdateLabelRequest, AdminUpdateLabelResponse>(
        API.ADMIN_UPDATE_GOOD_LABEL,
        req,
        req.Message,
        (resp: AdminUpdateLabelResponse): void => {
          this.addLabels(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeleteLabels (req: AdminDeleteLabelRequest, done: (error: boolean, row?: Label) => void) {
      doActionWithError<AdminDeleteLabelRequest, AdminDeleteLabelResponse>(
        API.ADMIN_DELETE_GOOD_LABEL,
        req,
        req.Message,
        (resp: AdminDeleteLabelResponse): void => {
          this._deleteLabel(undefined, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

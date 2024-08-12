import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  Required,
  GetRequiredsRequest,
  GetRequiredsResponse,
  AdminCreateRequiredRequest,
  AdminCreateRequiredResponse,
  AdminDeleteRequiredRequest,
  AdminDeleteRequiredResponse,
  AdminUpdateRequiredRequest,
  AdminUpdateRequiredResponse
} from './types'

export const useRequiredStore = defineStore('goodRequireds', {
  state: () => ({
    Requireds: [] as Array<Required>
  }),
  getters: {
    required (): (id: string) => Required | undefined {
      return (id: string) => {
        return this.Requireds.find((el: Required) => el.EntID === id)
      }
    },
    requireds (): Array<Required> {
      return this.Requireds
    }
  },
  actions: {
    addRequireds (requireds: Array<Required>) {
      requireds.forEach((required) => {
        if (!required) return
        const index = this.Requireds.findIndex((el) => el.EntID === required.EntID)
        this.Requireds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, required)
      })
    },
    _deleteRequired (required: Required) {
      const index = this.Requireds.findIndex((el: Required) => el.EntID === required.EntID)
      this.Requireds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
    },
    adminCreateRequired (req: AdminCreateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminCreateRequiredRequest, AdminCreateRequiredResponse>(
        API.ADMIN_CREATE_REQUIRED_GOOD,
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
    getRequireds (req: GetRequiredsRequest, done?: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<GetRequiredsRequest, GetRequiredsResponse>(
        API.GET_REQUIRED_GOODS,
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
    adminDeleteRequired (req: AdminDeleteRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminDeleteRequiredRequest, AdminDeleteRequiredResponse>(
        API.ADMIN_DELETE_REQUIRED_GOOD,
        req,
        req.Message,
        (resp: AdminDeleteRequiredResponse): void => {
          this._deleteRequired(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateRequired (req: AdminUpdateRequiredRequest, done?: (error: boolean, row?: Required) => void) {
      doActionWithError<AdminUpdateRequiredRequest, AdminUpdateRequiredResponse>(
        API.ADMIN_UPDATE_REQUIRED_GOOD,
        req,
        req.Message,
        (resp: AdminUpdateRequiredResponse): void => {
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

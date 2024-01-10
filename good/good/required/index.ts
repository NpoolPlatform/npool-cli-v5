import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
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
  DeleteRequiredResponse
} from './types'

export const useRequiredStore = defineStore('requiredgood', {
  state: () => ({
    Requireds: [] as Array<Required>
  }),
  getters: {
    required (): (id: string) => Required | undefined {
      return (id: string) => {
        return this.Requireds.find((el: Required) => el.EntID === id)
      }
    },
    requireds (): (mainGoodID?: string) => Array<Required> {
      return (mainGoodID?: string) => {
        return this.Requireds.filter((el) => {
          let ok = true
          if (mainGoodID) ok &&= mainGoodID === el.MainGoodID
          return ok
        }) || []
      }
    }
  },
  actions: {
    addRequireds (appID: string | undefined, requireds: Array<Required>) {
      requireds.forEach((required) => {
        if (!required) return
        const index = this.Requireds.findIndex((el) => el.EntID === required.EntID)
        this.Requireds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, required)
      })
    },
    deleteRequireds (requireds: Array<Required>) {
      requireds.forEach((required: Required) => {
        const index = this.Requireds.findIndex((el: Required) => el.EntID === required.EntID)
        this.Requireds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    createRequired (req: CreateRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<CreateRequiredRequest, CreateRequiredResponse>(
        API.CREATE_REQUIRED_GOOD,
        req,
        req.Message,
        (resp: CreateRequiredResponse): void => {
          this.addRequireds(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getRequireds (req: GetRequiredsRequest, done: (error: boolean, rows?: Array<Required>, total?: number) => void) {
      doActionWithError<GetRequiredsRequest, GetRequiredsResponse>(
        API.GET_REQUIRED_GOODS,
        req,
        req.Message,
        (resp: GetRequiredsResponse): void => {
          this.addRequireds(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    updateRequired (req: UpdateRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<UpdateRequiredRequest, UpdateRequiredResponse>(
        API.UPDATE_REQUIRED_GOOD,
        req,
        req.Message,
        (resp: UpdateRequiredResponse): void => {
          this.addRequireds(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteRequired (req: DeleteRequiredRequest, done: (error: boolean, row?: Required) => void) {
      doActionWithError<DeleteRequiredRequest, DeleteRequiredResponse>(
        API.DELETE_REQUIRED_GOOD,
        req,
        req.Message,
        (resp: DeleteRequiredResponse): void => {
          this.deleteRequireds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

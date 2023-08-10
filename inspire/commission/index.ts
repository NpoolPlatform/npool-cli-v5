import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateCommissionRequest,
  UpdateCommissionResponse,
  GetAppCommissionsRequest,
  GetAppCommissionsResponse,
  CreateUserCommissionRequest,
  CreateUserCommissionResponse,
  CloneCommissionsRequest,
  CloneCommissionsResponse,
  Commission,
  GetCommissionsRequest,
  GetCommissionsResponse
} from './types'
import { doActionWithError } from 'npool-cli-v4'

export const useCommissionStore = defineStore('commission', {
  state: () => ({
    Commissions: [] as Array<Commission>
  }),
  getters: {
  },
  actions: {
    getCommissions (req: GetCommissionsRequest, done: (error: boolean, rows?: Array<Commission>) => void) {
      doActionWithError<GetCommissionsRequest, GetCommissionsResponse>(
        API.GET_COMMISSIONS,
        req,
        req.Message,
        (resp: GetCommissionsResponse): void => {
          this.Commissions.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getAppCommissions (req: GetAppCommissionsRequest, done: (error: boolean, rows?: Array<Commission>) => void) {
      doActionWithError<GetAppCommissionsRequest, GetAppCommissionsResponse>(
        API.GET_APP_COMMISSIONS,
        req,
        req.Message,
        (resp: GetAppCommissionsResponse): void => {
          this.Commissions.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateCommission (req: UpdateCommissionRequest, done: (error: boolean, row?: Commission) => void) {
      doActionWithError<UpdateCommissionRequest, UpdateCommissionResponse>(
        API.UPDATE_COMMISSION,
        req,
        req.Message,
        (resp: UpdateCommissionResponse): void => {
          const index = this.Commissions.findIndex((el) => el.UserID === resp.Info.UserID)
          this.Commissions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createUserCommission (req: CreateUserCommissionRequest, done: (error: boolean, row?: Commission) => void) {
      doActionWithError<CreateUserCommissionRequest, CreateUserCommissionResponse>(
        API.CREATE_USER_COMMISSION,
        req,
        req.Message,
        (resp: CreateUserCommissionResponse): void => {
          this.Commissions.push(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    cloneCommissions (req: CloneCommissionsRequest, done: (error: boolean) => void) {
      doActionWithError<CloneCommissionsRequest, CloneCommissionsResponse>(
        API.CLONE_COMMISSIONS,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

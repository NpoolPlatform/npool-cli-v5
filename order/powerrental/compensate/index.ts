import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  AdminCreateCompensateRequest,
  AdminCreateCompensateResponse,
  AdminDeleteCompensateRequest,
  AdminDeleteCompensateResponse
} from './types'
import { Compensate, useCompensateStore } from '../../compensate'

export const usePowerRentalCompensateStore = defineStore('powerrental-compensates', {
  state: () => ({}),
  getters: {},
  actions: {
    addCompensates (_compensate: Compensate) {
      const compensate = useCompensateStore()
      compensate.addCompensates([_compensate])
    },
    delCompensate (appID: string, id: number) {
      const compensate = useCompensateStore()
      compensate.delCompensate(appID, id)
    },
    adminCreateCompensate (req: AdminCreateCompensateRequest, done: (error: boolean, row?: Compensate) => void) {
      doActionWithError<AdminCreateCompensateRequest, AdminCreateCompensateResponse>(
        API.ADMIN_CREATE_COMPENSATE,
        req,
        req.Message,
        (resp: AdminCreateCompensateResponse): void => {
          this.addCompensates(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeleteCompensate (req: AdminDeleteCompensateRequest, done: (error: boolean, row?: Compensate) => void) {
      doActionWithError<AdminDeleteCompensateRequest, AdminDeleteCompensateResponse>(
        API.ADMIN_DELETE_COMPENSATE,
        req,
        req.Message,
        (resp: AdminDeleteCompensateResponse): void => {
          this.delCompensate(req.TargetAppID, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

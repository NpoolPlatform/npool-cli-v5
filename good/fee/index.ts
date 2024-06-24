import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  Fee,
  AdminCreateFeeRequest,
  AdminCreateFeeResponse,
  GetFeesRequest,
  GetFeesResponse,
  GetFeeRequest,
  GetFeeResponse,
  AdminUpdateFeeRequest,
  AdminUpdateFeeResponse,
  AdminDeleteFeeRequest,
  AdminDeleteFeeResponse
} from './types'

export const useFeeStore = defineStore('fees', {
  state: () => ({
    Fees: [] as Array<Fee>
  }),
  getters: {
    fee (): (id: string) => Fee | undefined {
      return (id: string) => {
        return this.Fees.find((el: Fee) => el.EntID === id)
      }
    },
    fees (): Array<Fee> {
      return this.Fees
    }
  },
  actions: {
    addFees (fees: Array<Fee>) {
      fees.forEach((fee) => {
        const index = this.Fees.findIndex((el: Fee) => el.EntID === fee.EntID)
        this.Fees.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, fee)
      })
    },
    deleteFees (fees: Array<Fee>) {
      fees.forEach((fee) => {
        const index = this.Fees.findIndex((el: Fee) => el.EntID === fee.EntID)
        this.Fees.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getFee (req: GetFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<GetFeeRequest, GetFeeResponse>(
        API.GET_FEE,
        req,
        req.Message,
        (resp: GetFeeResponse): void => {
          this.addFees([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getFees (req: GetFeesRequest, done: (error: boolean, rows?: Array<Fee>) => void) {
      doActionWithError<GetFeesRequest, GetFeesResponse>(
        API.GET_FEES,
        req,
        req.Message,
        (resp: GetFeesResponse): void => {
          this.addFees(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateFee (req: AdminUpdateFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminUpdateFeeRequest, AdminUpdateFeeResponse>(
        API.ADMIN_UPDATE_FEE,
        req,
        req.Message,
        (resp: AdminUpdateFeeResponse): void => {
          this.addFees([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateFee (req: AdminCreateFeeRequest, done?: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminCreateFeeRequest, AdminCreateFeeResponse>(
        API.ADMIN_CREATE_FEE,
        req,
        req.Message,
        (resp: AdminCreateFeeResponse): void => {
          this.addFees([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteFee (req: AdminDeleteFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminDeleteFeeRequest, AdminDeleteFeeResponse>(
        API.ADMIN_DELETE_FEE,
        req,
        req.Message,
        (resp: AdminDeleteFeeResponse): void => {
          this.deleteFees([resp.Info])
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

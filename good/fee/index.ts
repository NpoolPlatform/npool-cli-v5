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
    Fee (): (id: string) => Fee | undefined {
      return (id: string) => {
        return this.Fees.find((el: Fee) => el.EntID === id)
      }
    },
    Fees () {
      return () => this.Fees
    }
  },
  actions: {
    addBrands (brands: Array<Fee>) {
      brands.forEach((brand) => {
        const index = this.Fees.findIndex((el: Fee) => el.EntID === brand.EntID)
        this.Fees.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, brand)
      })
    },
    deleteBrands (brands: Array<Fee>) {
      brands.forEach((brand) => {
        const index = this.Fees.findIndex((el: Fee) => el.EntID === brand.EntID)
        this.Fees.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getFee (req: GetFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<GetFeeRequest, GetFeeResponse>(
        API.GET_FEE,
        req,
        req.Message,
        (resp: GetFeeResponse): void => {
          this.addBrands([resp.Info])
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
          this.addBrands(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateFee (req: AdminUpdateFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminUpdateFeeRequest, AdminUpdateFeeResponse>(
        API.ADMIN_UPDATE_FEE,
        req,
        req.Message,
        (resp: AdminUpdateFeeResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createFee (req: AdminCreateFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminCreateFeeRequest, AdminCreateFeeResponse>(
        API.ADMIN_CREATE_FEE,
        req,
        req.Message,
        (resp: AdminCreateFeeResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteFee (req: AdminDeleteFeeRequest, done: (error: boolean, row?: Fee) => void) {
      doActionWithError<AdminDeleteFeeRequest, AdminDeleteFeeResponse>(
        API.ADMIN_DELETE_FEE,
        req,
        req.Message,
        (resp: AdminDeleteFeeResponse): void => {
          this.deleteBrands([resp.Info])
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

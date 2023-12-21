import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  VendorBrand,
  CreateVendorBrandRequest,
  CreateVendorBrandResponse,
  GetVendorBrandsRequest,
  GetVendorBrandsResponse,
  UpdateVendorBrandRequest,
  UpdateVendorBrandResponse,
  DeleteVendorBrandRequest,
  DeleteVendorBrandResponse
} from './types'

export const useVendorBrandStore = defineStore('vendor-brand', {
  state: () => ({
    VendorBrands: [] as Array<VendorBrand>
  }),
  getters: {
    vendorBrand (): (id: string) => VendorBrand | undefined {
      return (id: string) => {
        return this.VendorBrands.find((el: VendorBrand) => el.EntID === id)
      }
    },
    vendorBrands () {
      return () => this.VendorBrands
    }
  },
  actions: {
    addBrands (brands: Array<VendorBrand>) {
      brands.forEach((brand) => {
        const index = this.VendorBrands.findIndex((el: VendorBrand) => el.EntID === brand.EntID)
        this.VendorBrands.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, brand)
      })
    },
    deleteBrands (brands: Array<VendorBrand>) {
      brands.forEach((brand) => {
        const index = this.VendorBrands.findIndex((el: VendorBrand) => el.EntID === brand.EntID)
        this.VendorBrands.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getVendorBrands (req: GetVendorBrandsRequest, done: (error: boolean, rows?: Array<VendorBrand>) => void) {
      doActionWithError<GetVendorBrandsRequest, GetVendorBrandsResponse>(
        API.GET_VENDORBRANDS,
        req,
        req.Message,
        (resp: GetVendorBrandsResponse): void => {
          this.addBrands(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateVendorBrand (req: UpdateVendorBrandRequest, done: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<UpdateVendorBrandRequest, UpdateVendorBrandResponse>(
        API.UPDATE_VENDORBRAND,
        req,
        req.Message,
        (resp: UpdateVendorBrandResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createVendorBrand (req: CreateVendorBrandRequest, done: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<CreateVendorBrandRequest, CreateVendorBrandResponse>(
        API.CREATE_VENDORBRAND,
        req,
        req.Message,
        (resp: CreateVendorBrandResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteVendorBrand (req: DeleteVendorBrandRequest, done: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<DeleteVendorBrandRequest, DeleteVendorBrandResponse>(
        API.DELETE_VENDORBRAND,
        req,
        req.Message,
        (resp: DeleteVendorBrandResponse): void => {
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

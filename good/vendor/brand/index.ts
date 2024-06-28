import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  VendorBrand,
  AdminCreateVendorBrandRequest,
  AdminCreateVendorBrandResponse,
  GetVendorBrandsRequest,
  GetVendorBrandsResponse,
  AdminUpdateVendorBrandRequest,
  AdminUpdateVendorBrandResponse,
  AdminDeleteVendorBrandRequest,
  AdminDeleteVendorBrandResponse
} from './types'

export const useVendorBrandStore = defineStore('vendorBrands', {
  state: () => ({
    VendorBrands: [] as Array<VendorBrand>
  }),
  getters: {
    vendorBrand (): (id: string) => VendorBrand | undefined {
      return (id: string) => {
        return this.VendorBrands.find((el: VendorBrand) => el.EntID === id)
      }
    },
    vendorBrands (): Array<VendorBrand> {
      return this.VendorBrands
    }
  },
  actions: {
    addBrands (brands: Array<VendorBrand>) {
      brands.forEach((brand) => {
        const index = this.VendorBrands.findIndex((el: VendorBrand) => el.EntID === brand.EntID)
        this.VendorBrands.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, brand)
      })
    },
    delBrands (brands: Array<VendorBrand>) {
      brands.forEach((brand) => {
        const index = this.VendorBrands.findIndex((el: VendorBrand) => el.EntID === brand.EntID)
        this.VendorBrands.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getVendorBrands (req: GetVendorBrandsRequest, done?: (error: boolean, rows?: Array<VendorBrand>) => void) {
      doActionWithError<GetVendorBrandsRequest, GetVendorBrandsResponse>(
        API.GET_VENDORBRANDS,
        req,
        req.Message,
        (resp: GetVendorBrandsResponse): void => {
          this.addBrands(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateVendorBrand (req: AdminUpdateVendorBrandRequest, done?: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<AdminUpdateVendorBrandRequest, AdminUpdateVendorBrandResponse>(
        API.ADMIN_UPDATE_VENDORBRAND,
        req,
        req.Message,
        (resp: AdminUpdateVendorBrandResponse): void => {
          this.addBrands([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreateVendorBrand (req: AdminCreateVendorBrandRequest, done?: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<AdminCreateVendorBrandRequest, AdminCreateVendorBrandResponse>(
        API.ADMIN_CREATE_VENDORBRAND,
        req,
        req.Message,
        (resp: AdminCreateVendorBrandResponse): void => {
          this.addBrands([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteVendorBrand (req: AdminDeleteVendorBrandRequest, done?: (error: boolean, row?: VendorBrand) => void) {
      doActionWithError<AdminDeleteVendorBrandRequest, AdminDeleteVendorBrandResponse>(
        API.ADMIN_DELETE_VENDORBRAND,
        req,
        req.Message,
        (resp: AdminDeleteVendorBrandResponse): void => {
          this.delBrands([resp.Info])
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

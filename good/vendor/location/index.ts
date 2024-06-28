import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  VendorLocation,
  AdminCreateVendorLocationRequest,
  AdminCreateVendorLocationResponse,
  GetVendorLocationsRequest,
  GetVendorLocationsResponse,
  AdminUpdateVendorLocationRequest,
  AdminUpdateVendorLocationResponse,
  AdminDeleteVendorLocationRequest,
  AdminDeleteVendorLocationResponse
} from './types'

export const useVendorLocationStore = defineStore('vendorLocations', {
  state: () => ({
    VendorLocations: [] as Array<VendorLocation>
  }),
  getters: {
    vendorLocation (): (id: string) => VendorLocation | undefined {
      return (id: string) => {
        return this.VendorLocations.find((el: VendorLocation) => el.EntID === id)
      }
    },
    vendorLocations () {
      return () => this.VendorLocations
    }
  },
  actions: {
    addLocations (locations: Array<VendorLocation>) {
      locations.forEach((location) => {
        const index = this.VendorLocations.findIndex((el: VendorLocation) => el.EntID === location.EntID)
        this.VendorLocations.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, location)
      })
    },
    getVendorLocations (req: GetVendorLocationsRequest, done?: (error: boolean, rows?: Array<VendorLocation>) => void) {
      doActionWithError<GetVendorLocationsRequest, GetVendorLocationsResponse>(
        API.GET_VENDORLOCATIONS,
        req,
        req.Message,
        (resp: GetVendorLocationsResponse): void => {
          this.addLocations(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateVendorLocation (req: AdminUpdateVendorLocationRequest, done?: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<AdminUpdateVendorLocationRequest, AdminUpdateVendorLocationResponse>(
        API.ADMIN_UPDATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: AdminUpdateVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateVendorLocation (req: AdminCreateVendorLocationRequest, done?: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<AdminCreateVendorLocationRequest, AdminCreateVendorLocationResponse>(
        API.ADMIN_CREATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: AdminCreateVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteVendorLocation (req: AdminDeleteVendorLocationRequest, done?: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<AdminDeleteVendorLocationRequest, AdminDeleteVendorLocationResponse>(
        API.ADMIN_DELETE_VENDORLOCATION,
        req,
        req.Message,
        (resp: AdminDeleteVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  VendorLocation,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  GetVendorLocationsRequest,
  GetVendorLocationsResponse,
  UpdateVendorLocationRequest,
  UpdateVendorLocationResponse
} from './types'

export const useVendorLocationStore = defineStore('vendor-locations', {
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
    getVendorLocations (req: GetVendorLocationsRequest, done: (error: boolean, rows?: Array<VendorLocation>) => void) {
      doActionWithError<GetVendorLocationsRequest, GetVendorLocationsResponse>(
        API.GET_VENDORLOCATIONS,
        req,
        req.Message,
        (resp: GetVendorLocationsResponse): void => {
          this.addLocations(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateVendorLocation (req: UpdateVendorLocationRequest, done: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<UpdateVendorLocationRequest, UpdateVendorLocationResponse>(
        API.UPDATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: UpdateVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createVendorLocation (req: CreateVendorLocationRequest, done: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<CreateVendorLocationRequest, CreateVendorLocationResponse>(
        API.CREATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: CreateVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

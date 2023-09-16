import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  VendorLocation,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  GetVendorLocationRequest,
  GetVendorLocationResponse,
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
        return this.VendorLocations.find((el) => el.ID === id)
      }
    },
    vendorLocations () {
      return () => this.VendorLocations
    },
    addLocations (): (devices: Array<VendorLocation>) => void {
      return (devices: Array<VendorLocation>) => {
        devices.forEach((device) => {
          const index = this.VendorLocations.findIndex((el) => el.ID === device.ID)
          this.VendorLocations.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
        })
      }
    }
  },
  actions: {
    getVendorLocation (req: GetVendorLocationRequest, done: (error: boolean, row?: VendorLocation) => void) {
      doActionWithError<GetVendorLocationRequest, GetVendorLocationResponse>(
        API.GET_VENDORLOCATION,
        req,
        req.Message,
        (resp: GetVendorLocationResponse): void => {
          this.addLocations([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
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

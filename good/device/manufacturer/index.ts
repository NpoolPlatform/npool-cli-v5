
import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  Manufacturer,
  AdminCreateManufacturerRequest,
  AdminCreateManufacturerResponse,
  GetManufacturersRequest,
  GetManufacturersResponse,
  AdminUpdateManufacturerRequest,
  AdminUpdateManufacturerResponse,
  AdminDeleteManufacturerRequest,
  AdminDeleteManufacturerResponse
} from './types'

export const useManufacturerStore = defineStore('device-manufacturers', {
  state: () => ({
    Manufacturers: [] as Array<Manufacturer>
  }),
  getters: {
    Manufacturer (): (id: string) => Manufacturer | undefined {
      return (id: string) => {
        return this.Manufacturers.find((el: Manufacturer) => el.EntID === id)
      }
    },
    Manufacturers () {
      return () => this.Manufacturers
    }
  },
  actions: {
    addManufacturers (devices: Array<Manufacturer>) {
      devices.forEach((device) => {
        const index = this.Manufacturers.findIndex((el: Manufacturer) => el.EntID === device.EntID)
        this.Manufacturers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
      })
    },
    getManufacturers (req: GetManufacturersRequest, done: (error: boolean, devices?: Array<Manufacturer>) => void) {
      doActionWithError<GetManufacturersRequest, GetManufacturersResponse>(
        API.GET_DEVICE_MANUFACTURERS,
        req,
        req.Message,
        (resp: GetManufacturersResponse): void => {
          this.addManufacturers(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminUpdateManufacturer (req: AdminUpdateManufacturerRequest, done: (error: boolean, device?: Manufacturer) => void) {
      doActionWithError<AdminUpdateManufacturerRequest, AdminUpdateManufacturerResponse>(
        API.ADMIN_UPDATE_DEVICE_MANUFACTURER,
        req,
        req.Message,
        (resp: AdminUpdateManufacturerResponse): void => {
          this.addManufacturers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createManufacturer (req: AdminCreateManufacturerRequest, done: (error: boolean, device?: Manufacturer) => void) {
      doActionWithError<AdminCreateManufacturerRequest, AdminCreateManufacturerResponse>(
        API.ADMIN_CREATE_DEVICE_MANUFACTURER,
        req,
        req.Message,
        (resp: AdminCreateManufacturerResponse): void => {
          this.addManufacturers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteManufacturer (req: AdminDeleteManufacturerRequest, done: (error: boolean, device?: Manufacturer) => void) {
      doActionWithError<AdminDeleteManufacturerRequest, AdminDeleteManufacturerResponse>(
        API.ADMIN_DELETE_DEVICE_MANUFACTURER,
        req,
        req.Message,
        (resp: AdminDeleteManufacturerResponse): void => {
          this.addManufacturers([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

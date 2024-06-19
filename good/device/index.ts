
import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  DeviceType,
  AdminCreateDeviceTypeRequest,
  AdminCreateDeviceTypeResponse,
  GetDeviceTypesRequest,
  GetDeviceTypesResponse,
  AdminUpdateDeviceTypeRequest,
  AdminUpdateDeviceTypeResponse,
  AdminDeleteDeviceTypeRequest,
  AdminDeleteDeviceTypeResponse
} from './types'

export const useDeviceTypeStore = defineStore('device-types', {
  state: () => ({
    DeviceTypes: [] as Array<DeviceType>
  }),
  getters: {
    deviceType (): (id: string) => DeviceType | undefined {
      return (id: string) => {
        return this.DeviceTypes.find((el: DeviceType) => el.EntID === id)
      }
    },
    deviceTypes () {
      return () => this.DeviceTypes
    }
  },
  actions: {
    addDeviceTypes (devices: Array<DeviceType>) {
      devices.forEach((device) => {
        const index = this.DeviceTypes.findIndex((el: DeviceType) => el.EntID === device.EntID)
        this.DeviceTypes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
      })
    },
    getDeviceTypes (req: GetDeviceTypesRequest, done: (error: boolean, devices?: Array<DeviceType>) => void) {
      doActionWithError<GetDeviceTypesRequest, GetDeviceTypesResponse>(
        API.GET_DEVICE_TYPES,
        req,
        req.Message,
        (resp: GetDeviceTypesResponse): void => {
          this.addDeviceTypes(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminUpdateDeviceType (req: AdminUpdateDeviceTypeRequest, done?: (error: boolean, device?: DeviceType) => void) {
      doActionWithError<AdminUpdateDeviceTypeRequest, AdminUpdateDeviceTypeResponse>(
        API.ADMIN_UPDATE_DEVICE_TYPE,
        req,
        req.Message,
        (resp: AdminUpdateDeviceTypeResponse): void => {
          this.addDeviceTypes([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateDeviceType (req: AdminCreateDeviceTypeRequest, done?: (error: boolean, device?: DeviceType) => void) {
      doActionWithError<AdminCreateDeviceTypeRequest, AdminCreateDeviceTypeResponse>(
        API.ADMIN_CREATE_DEVICE_TYPE,
        req,
        req.Message,
        (resp: AdminCreateDeviceTypeResponse): void => {
          this.addDeviceTypes([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteDeviceType (req: AdminDeleteDeviceTypeRequest, done: (error: boolean, device?: DeviceType) => void) {
      doActionWithError<AdminDeleteDeviceTypeRequest, AdminDeleteDeviceTypeResponse>(
        API.ADMIN_DELETE_DEVICE_TYPE,
        req,
        req.Message,
        (resp: AdminDeleteDeviceTypeResponse): void => {
          this.addDeviceTypes([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'


import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  DevicePoster,
  AdminCreateDevicePosterRequest,
  AdminCreateDevicePosterResponse,
  GetDevicePostersRequest,
  GetDevicePostersResponse,
  AdminUpdateDevicePosterRequest,
  AdminUpdateDevicePosterResponse,
  AdminDeleteDevicePosterRequest,
  AdminDeleteDevicePosterResponse
} from './types'

export const useDevicePosterStore = defineStore('devicePosters', {
  state: () => ({
    DevicePosters: [] as Array<DevicePoster>
  }),
  getters: {
    devicePoster (): (id: string) => DevicePoster | undefined {
      return (id: string) => {
        return this.DevicePosters.find((el: DevicePoster) => el.EntID === id)
      }
    },
    devicePosters (): Array<DevicePoster> {
      return this.DevicePosters
    }
  },
  actions: {
    addDevicePosters (devicePosters: Array<DevicePoster>) {
      devicePosters.forEach((device) => {
        const index = this.DevicePosters.findIndex((el: DevicePoster) => el.EntID === device.EntID)
        this.DevicePosters.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
      })
    },
    deleteDevicePosters (devicePosters: Array<DevicePoster>) {
      devicePosters.forEach((device) => {
        const index = this.DevicePosters.findIndex((el: DevicePoster) => el.EntID === device.EntID)
        this.DevicePosters.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getDevicePosters (req: GetDevicePostersRequest, done?: (error: boolean, devicePosters?: Array<DevicePoster>) => void) {
      doActionWithError<GetDevicePostersRequest, GetDevicePostersResponse>(
        API.GET_DEVICE_POSTERS,
        req,
        req.Message,
        (resp: GetDevicePostersResponse): void => {
          this.addDevicePosters(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateDevicePoster (req: AdminUpdateDevicePosterRequest, done?: (error: boolean, device?: DevicePoster) => void) {
      doActionWithError<AdminUpdateDevicePosterRequest, AdminUpdateDevicePosterResponse>(
        API.ADMIN_UPDATE_DEVICE_POSTER,
        req,
        req.Message,
        (resp: AdminUpdateDevicePosterResponse): void => {
          this.addDevicePosters([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateDevicePoster (req: AdminCreateDevicePosterRequest, done?: (error: boolean, device?: DevicePoster) => void) {
      doActionWithError<AdminCreateDevicePosterRequest, AdminCreateDevicePosterResponse>(
        API.ADMIN_CREATE_DEVICE_POSTER,
        req,
        req.Message,
        (resp: AdminCreateDevicePosterResponse): void => {
          this.addDevicePosters([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteDevicePoster (req: AdminDeleteDevicePosterRequest, done?: (error: boolean, device?: DevicePoster) => void) {
      doActionWithError<AdminDeleteDevicePosterRequest, AdminDeleteDevicePosterResponse>(
        API.ADMIN_DELETE_DEVICE_POSTER,
        req,
        req.Message,
        (resp: AdminDeleteDevicePosterResponse): void => {
          this.deleteDevicePosters([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'


import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  DeviceInfo,
  CreateDeviceInfoRequest,
  CreateDeviceInfoResponse,
  GetDeviceInfoRequest,
  GetDeviceInfoResponse,
  GetDeviceInfosRequest,
  GetDeviceInfosResponse,
  UpdateDeviceInfoRequest,
  UpdateDeviceInfoResponse
} from './types'

export const useDeviceInfoStore = defineStore('deviceinfos', {
  state: () => ({
    DeviceInfos: [] as Array<DeviceInfo>
  }),
  getters: {
    deviceInfo (): (id: string) => DeviceInfo | undefined {
      return (id: string) => {
        return this.DeviceInfos.find((el) => el.ID === id)
      }
    },
    addDevices (): (devices: Array<DeviceInfo>) => void {
      return (devices: Array<DeviceInfo>) => {
        devices.forEach((device) => {
          const index = this.DeviceInfos.findIndex((el) => el.ID === device.ID)
          this.DeviceInfos.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
        })
      }
    }
  },
  actions: {
    getDeviceInfo (req: GetDeviceInfoRequest, done: (error: boolean, device?: DeviceInfo) => void) {
      doActionWithError<GetDeviceInfoRequest, GetDeviceInfoResponse>(
        API.GET_DEVICEINFO,
        req,
        req.Message,
        (resp: GetDeviceInfoResponse): void => {
          this.addDevices([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getDeviceInfos (req: GetDeviceInfosRequest, done: (error: boolean, devices?: Array<DeviceInfo>) => void) {
      doActionWithError<GetDeviceInfosRequest, GetDeviceInfosResponse>(
        API.GET_DEVICEINFOS,
        req,
        req.Message,
        (resp: GetDeviceInfosResponse): void => {
          this.addDevices(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateDeviceInfo (req: UpdateDeviceInfoRequest, done: (error: boolean, device?: DeviceInfo) => void) {
      doActionWithError<UpdateDeviceInfoRequest, UpdateDeviceInfoResponse>(
        API.UPDATE_DEVICEINFO,
        req,
        req.Message,
        (resp: UpdateDeviceInfoResponse): void => {
          this.addDevices([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createDeviceInfo (req: CreateDeviceInfoRequest, done: (error: boolean, device?: DeviceInfo) => void) {
      doActionWithError<CreateDeviceInfoRequest, CreateDeviceInfoResponse>(
        API.CREATE_DEVICEINFO,
        req,
        req.Message,
        (resp: CreateDeviceInfoResponse): void => {
          this.addDevices([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'


import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  DeviceInfo,
  CreateDeviceInfoRequest,
  CreateDeviceInfoResponse,
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
    deviceInfo (): (id?: string, deviceType?: string) => DeviceInfo | undefined {
      return (id?: string, deviceType?: string) => {
        return this.DeviceInfos.find((el: DeviceInfo) => {
          let ok = true
          if (id) ok &&= el.EntID === id
          if (deviceType) ok &&= el.Type === deviceType
          return ok
        })
      }
    },
    deviceInfos () {
      return () => this.DeviceInfos
    }
  },
  actions: {
    addDevices (devices: Array<DeviceInfo>) {
      devices.forEach((device) => {
        const index = this.DeviceInfos.findIndex((el: DeviceInfo) => el.EntID === device.EntID)
        this.DeviceInfos.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
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

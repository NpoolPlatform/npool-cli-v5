import { BaseRequest } from '../../../request'

export interface DevicePoster {
  ID: number
  EntID: string
  DeviceTypeID: string
  DeviceType: string
  Manufacturer: string
  Poster: string
  Index: number
  CreatedAt: number
  UpdatedAt: number
}

export interface DevicePosterInfo {
  Poster: string
  Index: number
}

export interface AdminCreateDevicePosterRequest extends BaseRequest {
  Poster: string
  Index: number
}

export interface AdminCreateDevicePosterResponse {
  Info: DevicePoster
}

export interface AdminUpdateDevicePosterRequest extends BaseRequest {
  ID: number
  EntID: string
  Name?: string
  Logo?: string
}

export interface AdminUpdateDevicePosterResponse {
  Info: DevicePoster
}

export interface GetDevicePostersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetDevicePostersResponse {
  Infos: DevicePoster[]
  Total: number
}

export interface AdminDeleteDevicePosterRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteDevicePosterResponse {
  Info: DevicePoster
}

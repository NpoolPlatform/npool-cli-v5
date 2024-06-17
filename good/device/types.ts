import { BaseRequest } from '../../request'
import { DevicePosterInfo } from './poster'

export interface DeviceType {
  ID: number
  EntID: string
  Type: string
  ManufacturerID: string
  ManufacturerName: string
  ManufacturerLogo: string
  PowerConsumption: number
  ShipmentAt: number
  Posters: DevicePosterInfo[]
  CreatedAt: number
  UpdatedAt: number
  DeletedAt: number
}

export interface AdminCreateDeviceTypeRequest extends BaseRequest {
  DeviceType: string
  ManufacturerID: string
  PowerConsumption: number
  ShipmentAt: number
}

export interface AdminCreateDeviceTypeResponse {
  Info: DeviceType
}

export interface GetDeviceTypesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetDeviceTypesResponse {
  Infos: DeviceType[]
  Total: number
}

export interface AdminUpdateDeviceTypeRequest extends BaseRequest {
  ID: number
  EntID: string
  DeviceType?: string
  ManufacturerID?: string
  PowerConsumption?: number
  ShipmentAt?: number
}

export interface AdminUpdateDeviceTypeResponse {
  Info: DeviceType
}

export interface AdminDeleteDeviceTypeRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteDeviceTypeResponse {
  Info: DeviceType
}

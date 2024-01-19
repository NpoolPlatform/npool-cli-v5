import { BaseRequest } from '../../request'

export interface DeviceInfo {
  ID: number
  EntID: string
  Type: string
  Manufacturer: string
  PowerConsumption: number
  ShipmentAt: number
  Hashrate: number
  HashrateUnit: string
  Posters: string[]
  CreatedAt: number
  UpdatedAt: number
  DeletedAt: number
}

export interface CreateDeviceInfoRequest extends BaseRequest {
  Type: string
  Manufacturer: string
  PowerConsumption: number
  ShipmentAt: number
  Posters: string[]
}

export interface CreateDeviceInfoResponse {
  Info: DeviceInfo
}

export interface GetDeviceInfosRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetDeviceInfosResponse {
  Infos: DeviceInfo[]
  Total: number
}

export interface UpdateDeviceInfoRequest extends BaseRequest {
  ID: number
  EntID: string
  Type?: string
  Manufacturer?: string
  PowerConsumption?: number
  ShipmentAt?: number
  Posters: string[]
}

export interface UpdateDeviceInfoResponse {
  Info: DeviceInfo
}

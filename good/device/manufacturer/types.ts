import { BaseRequest } from '../../../request'

export interface Manufacturer {
  ID: number
  EntID: string
  Name: string
  Logo: string
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateManufacturerRequest extends BaseRequest {
  Name: string
  Logo: string
}

export interface AdminCreateManufacturerResponse {
  Info: Manufacturer
}

export interface AdminUpdateManufacturerRequest extends BaseRequest {
  ID: number
  EntID: string
  Name?: string
  Logo?: string
}

export interface AdminUpdateManufacturerResponse {
  Info: Manufacturer
}

export interface GetManufacturersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetManufacturersResponse {
  Infos: Manufacturer[]
  Total: number
}

export interface AdminDeleteManufacturerRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteManufacturerResponse {
  Info: Manufacturer
}

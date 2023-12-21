import { BaseRequest } from '../../../request'

export interface VendorLocation {
  ID: number
  EntID: string
  Country: string
  Province: string
  City: string
  Address: string
  BrandID: string
  BrandName: string
  BrandLogo: string
}

export interface CreateVendorLocationRequest extends BaseRequest {
  Country: string
  Province: string
  City: string
  Address: string
  BrandID: string
}

export interface CreateVendorLocationResponse {
  Info: VendorLocation
}

export interface GetVendorLocationsRequest extends BaseRequest {
  BrandID?: string
  Offset: number
  Limit: number
}

export interface GetVendorLocationsResponse {
  Infos: VendorLocation[]
  Total: number
}

export interface UpdateVendorLocationRequest extends BaseRequest {
  ID: number
  EntID: string
  Country?: string
  Province?: string
  City?: string
  Address?: string
  BrandID?: string
}

export interface UpdateVendorLocationResponse {
  Info: VendorLocation
}

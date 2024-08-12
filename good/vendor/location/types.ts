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

export interface AdminCreateVendorLocationRequest extends BaseRequest {
  Country: string
  Province: string
  City: string
  Address: string
  BrandID: string
}

export interface AdminCreateVendorLocationResponse {
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

export interface AdminUpdateVendorLocationRequest extends BaseRequest {
  ID: number
  EntID: string
  Country?: string
  Province?: string
  City?: string
  Address?: string
  BrandID?: string
}

export interface AdminUpdateVendorLocationResponse {
  Info: VendorLocation
}

export interface AdminDeleteVendorLocationRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteVendorLocationResponse {
  Info: VendorLocation
}

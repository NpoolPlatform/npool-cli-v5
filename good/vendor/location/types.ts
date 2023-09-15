import { BaseRequest } from '../../../request'

export interface VendorLocation {
  ID: string
  Country: string
  Province: string
  City: string
  Address: string
  BrandName: string
  BrandLogo: string
  CreatedAt: number
  UpdatedAt: number
  DeletedAt: number
}

export interface CreateVendorLocationRequest extends BaseRequest {
  Country: string
  Province: string
  City: string
  Address: string
}

export interface CreateVendorLocationResponse {
  Info: VendorLocation
}

export interface GetVendorLocationRequest extends BaseRequest {
  ID: string
}

export interface GetVendorLocationResponse {
  Info: VendorLocation
}

export interface GetVendorLocationsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetVendorLocationsResponse {
  Infos: VendorLocation[]
  Total: number
}

export interface UpdateVendorLocationRequest extends BaseRequest {
  ID: string
  Country: string
  Province: string
  City: string
  Address: string
}

export interface UpdateVendorLocationResponse {
  Info: VendorLocation
}

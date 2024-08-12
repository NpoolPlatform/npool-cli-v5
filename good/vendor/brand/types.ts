import { BaseRequest } from '../../../request'

export interface VendorBrand {
  ID: number
  EntID: string
  Name: string
  Logo: string
}

export interface AdminCreateVendorBrandRequest extends BaseRequest {
  Name: string
  Logo: string
}

export interface AdminCreateVendorBrandResponse {
  Info: VendorBrand
}

export interface GetVendorBrandsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetVendorBrandsResponse {
  Infos: VendorBrand[]
  Total: number
}

export interface AdminUpdateVendorBrandRequest extends BaseRequest {
  ID: number
  EntID: string
  Name?: string
  Logo?: string
}

export interface AdminUpdateVendorBrandResponse {
  Info: VendorBrand
}

export interface AdminDeleteVendorBrandRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface AdminDeleteVendorBrandResponse {
    Info: VendorBrand
}

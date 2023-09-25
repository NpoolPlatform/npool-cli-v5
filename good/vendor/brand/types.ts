import { BaseRequest } from '../../../request'

export interface VendorBrand {
  ID: string
  Name: string
  Logo: string
}

export interface CreateVendorBrandRequest extends BaseRequest {
  Name: string
  Logo: string
}

export interface CreateVendorBrandResponse {
  Info: VendorBrand
}

export interface GetVendorBrandRequest extends BaseRequest {
  ID: string
}

export interface GetVendorBrandResponse {
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

export interface UpdateVendorBrandRequest extends BaseRequest {
  ID: string
  Name: string
  Logo: string
}

export interface UpdateVendorBrandResponse {
  Info: VendorBrand
}

export interface DeleteVendorBrandRequest extends BaseRequest {
    ID: string
}

export interface DeleteVendorBrandResponse {
    Info: VendorBrand
}

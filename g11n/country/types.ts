import { BaseRequest } from '../../request'

export interface Country {
  ID: number
  EntID: string
  Country: string
  Flag: string
  Code: string
  Short: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CountryReq {
  EntID?: string
  Country: string
  Flag: string
  Code: string
  Short: string
}

export interface CreateCountriesRequest extends BaseRequest {
  Infos: CountryReq[]
}

export interface CreateCountriesResponse {
  Infos: Country[]
}

export interface CreateCountryRequest extends BaseRequest {
  Country: string
  Flag: string
  Code: string
  Short: string
}

export interface CreateCountryResponse {
  Info: Country
}

export interface GetCountriesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetCountriesResponse {
  Infos: Country[]
  Total: number
}

export interface UpdateCountryRequest extends BaseRequest {
  ID: number
  Country: string
  Flag: string
  Code: string
  Short: string
}

export interface UpdateCountryResponse {
  Info: Country
}

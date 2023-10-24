import { BaseRequest } from '../../../request'

export interface Country {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  CountryID: string
  Country: string
  Flag: string
  Code: string
  Short: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetAppCountriesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppCountriesResponse {
  Infos: Country[]
  Total: number
}

export interface CreateAppCountryRequest extends BaseRequest {
  TargetAppID: string
  CountryID: string
}

export interface CreateAppCountryResponse {
  Info: Country
}

export interface DeleteAppCountryRequest extends BaseRequest {
  ID: number
  TargetAppID: string
}

export interface DeleteAppCountryResponse {
  Info: Country
}

export interface GetNAppCountriesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppCountriesResponse {
  Infos: Country[]
  Total: number
}

import { BaseRequest } from '../../request'

export interface FiatCurrencyType {
  ID: string
  Name: string
  Logo: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateFiatCurrencyTypeRequest extends BaseRequest {
  Name: string
}

export interface CreateFiatCurrencyTypeResponse {
  Info: FiatCurrencyType
}

export interface GetFiatCurrencyTypesRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetFiatCurrencyTypesResponse {
  Infos: FiatCurrencyType[]
  /** @format int64 */
  Total: number
}

export interface UpdateFiatCurrencyTypeRequest extends BaseRequest {
  ID: string
  Name: string
}

export interface UpdateFiatCurrencyTypeResponse {
  Info: FiatCurrencyType
}

export interface GetCoinFiatCurrenciesRequest extends BaseRequest {
  FiatCurrencyTypeIDs: string[]
  CoinTypeIDs: string[]
}

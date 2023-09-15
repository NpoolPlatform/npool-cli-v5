import { BaseRequest } from '../../../request'
import { CoinCurrency } from './base'

export interface GetCurrencyRequest extends BaseRequest {
  CoinTypeID: string
}

export interface GetCurrencyResponse {
  Info: CoinCurrency
}

export interface GetCurrenciesRequest extends BaseRequest {
  CoinTypeIDs?: string[]
  Offset: number
  Limit: number
}

export interface GetCurrenciesResponse {
  Infos: CoinCurrency[]
  /** @format int64 */
  Total: number
}

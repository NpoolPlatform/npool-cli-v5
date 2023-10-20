import { BaseRequest } from '../../../request'
import { CurrencyFeedType } from '../../base'

export interface FiatCurrency {
  ID: number
  EntID: string
  FiatID: string
  FeedType: CurrencyFeedType
  FiatName: string
  FiatLogo: string
  FiatUnit: string
  MarketValueHigh: string
  MarketValueLow: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetFiatCurrenciesRequest extends BaseRequest {
  FiatIDs: string[]
  CoinTypeIDs: string[]
}

export interface GetFiatCurrenciesResponse {
  Infos: FiatCurrency[]
  Total: number
}

export interface GetHistoriesRequest extends BaseRequest {
  FiatID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
}

export interface GetHistoriesResponse {
  Infos: FiatCurrency[]
  /** @format int64 */
  Total: number
}

export interface GetFiatCurrencyRequest extends BaseRequest {
  FiatName: string
}

export interface GetFiatCurrencyResponse {
  Info: FiatCurrency
}

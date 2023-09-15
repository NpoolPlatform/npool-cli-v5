import { CurrencyFeedType } from '../../../../base'
import { BaseRequest } from '../../../../../request'

export interface CoinFiatCurrency {
  /**
   * @inject_tag: sql:"id"
   * @format int64
   */
  ID: number
  /** @inject_tag: sql:"coin_type_id" */
  CoinTypeID: string
  /** @inject_tag: sql:"coin_name" */
  CoinName: string
  /** @inject_tag: sql:"coin_logo" */
  CoinLogo: string
  /** @inject_tag: sql:"coin_unit" */
  CoinUnit: string
  /** @inject_tag: sql:"coin_env" */
  CoinENV: string
  /** @inject_tag: sql:"fiat_id" */
  FiatID: string
  /** @inject_tag: sql:"fiat_name" */
  FiatName: string
  /** @inject_tag: sql:"fiat_logo" */
  FiatLogo: string
  /** @inject_tag: sql:"fiat_unit" */
  FiatUnit: string
  /** @inject_tag: sql:"market_value_high" */
  MarketValueHigh: string
  /** @inject_tag: sql:"market_value_low" */
  MarketValueLow: string
  FeedType: CurrencyFeedType
  /**
   * @inject_tag: sql:"created_at"
   * @format int64
   */
  CreatedAt: number
  /**
   * @inject_tag: sql:"updated_at"
   * @format int64
   */
  UpdatedAt: number
}

export interface GetCoinFiatCurrenciesRequest extends BaseRequest {
  CoinTypeIDs: string[]
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCoinFiatCurrenciesResponse {
  Infos: CoinFiatCurrency[]
  /** @format int64 */
  Total: number
}

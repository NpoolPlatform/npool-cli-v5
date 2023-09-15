import { BaseRequest } from '../../../request'
import { CurrencyFeedType } from '../currency/base'

export interface CoinFiat {
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

export interface CreateCoinFiatRequest extends BaseRequest {
  CoinTypeID: string
  FiatID: string
}

export interface CreateCoinFiatResponse {
  Info: CoinFiat
}

export interface DeleteCoinFiatRequest extends BaseRequest {
  ID: number
}

export interface DeleteCoinFiatResponse {
  Info: CoinFiat
}

export interface GetCoinFiatsRequest extends BaseRequest {
  CoinTypeIDs: string[]
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCoinFiatsResponse {
  Infos: CoinFiat[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../../../request'
import { CurrencyFeedType } from '../base'

export interface CoinFeed {
  ID: string
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinLogo: string
  CoinENV: string
  FeedType: CurrencyFeedType
  FeedCoinName: string
  Disabled: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateFeedRequest extends BaseRequest {
  CoinTypeID: string
  FeedType: CurrencyFeedType
  FeedCoinName: string
}

export interface CreateFeedResponse {
  Info: CoinFeed
}

export interface GetFeedsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetFeedsResponse {
  Infos: CoinFeed[]
  /** @format int64 */
  Total: number
}

export interface UpdateFeedRequest extends BaseRequest {
  ID: string
  FeedCoinName: string
  Disabled: boolean
}

export interface UpdateFeedResponse {
  Info: CoinFeed
}

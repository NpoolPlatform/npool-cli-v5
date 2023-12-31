import { CurrencyFeedType } from '../../../base'

export interface CoinCurrency {
  ID: number
  EntID: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  CoinENV: string
  CreatedAt: number
  UpdatedAt: number
  MarketValueHigh: string
  MarketValueLow: string
  FeedType: CurrencyFeedType
}

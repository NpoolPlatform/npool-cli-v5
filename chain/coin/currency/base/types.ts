import { CurrencyFeedType } from './const'

export interface CoinCurrency {
  ID: string
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

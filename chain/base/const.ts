/** @default "DefaultFeedType" */
export enum CurrencyFeedType {
  CoinGecko = 'CoinGecko',
  CoinBase = 'CoinBase',
  StableUSDHardCode = 'StableUSDHardCode',
}

export const CurrencyFeedTypes = Object.values(CurrencyFeedType)

export interface PaymentBalanceInfo {
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinLogo: string
  CoinENV: string
  Amount: string
  CoinUSDCurrency: string
  CreatedAt: number
}

export interface PaymentTransferInfo {
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinLogo: string
  CoinENV: string
  Amount: string
  AccountID: string
  Address: string
  CoinUSDCurrency: string
  CreatedAt: number
}

export interface PaymentBalance {
  CoinTypeID: string
  Amount: string
}

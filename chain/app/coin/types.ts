import { BaseRequest } from '../../../request'

export interface AppCoin {
  ID: string
  EntID: string
  AppID: string
  CoinTypeID: string
  Name: string
  DisplayNames: string[]
  Logo: string
  Unit: string
  Presale: boolean
  ReservedAmount: string
  ForPay: boolean
  CoinForPay: boolean
  ProductPage: string
  DailyRewardAmount: string
  ENV: string
  HomePage: string
  Specs: string
  FeeCoinTypeID: string
  FeeCoinName: string
  FeeCoinLogo: string
  FeeCoinUnit: string
  FeeCoinENV: string
  WithdrawFeeByStableUSD: boolean
  WithdrawFeeAmount: string
  CollectFeeAmount: string
  HotWalletFeeAmount: string
  LowFeeAmount: string
  HotLowFeeAmount: string
  HotWalletAccountAmount: string
  PaymentAccountCollectAmount: string
  WithdrawAutoReviewAmount: string
  LeastTransferAmount: string
  StableUSD: boolean
  MarketValue: string
  SettleValue: string
  SettlePercent: number
  SettleTips: string[]
  Setter: string
  Disabled: boolean
  CoinDisabled: boolean
  CreatedAt: number
  Display: boolean
  DisplayIndex: number
  UpdatedAt: number
  MaxAmountPerWithdraw: string
  DefaultGoodID: string
  NeedMemo: boolean
}

export interface GetAppCoinsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppCoinsResponse {
  Infos: AppCoin[]
  Total: number
}

export interface UpdateAppCoinRequest extends BaseRequest{
  ID: string
  AppID: string
  UserID?: string
  CoinTypeID: string
  Name: string
  DisplayNames: string[]
  Logo: string
  ForPay: boolean
  WithdrawAutoReviewAmount: string
  MarketValue: string
  SettlePercent: number
  SettleTips: string[]
  DailyRewardAmount: string
  Display?: boolean
  DisplayIndex: number
}

export interface UpdateAppCoinResponse {
  Info: AppCoin
}

export interface GetNAppCoinsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppCoinsResponse {
  Infos: AppCoin[]
  Total: number
}

export interface CreateAppCoinRequest extends BaseRequest{
  TargetAppID: string
  CoinTypeID: string
}

export interface CreateAppCoinResponse {
  Info: AppCoin
}

export interface DeleteAppCoinRequest extends BaseRequest {
  ID: string
  TargetAppID: string
}

export interface DeleteAppCoinResponse {
  Info: AppCoin
}

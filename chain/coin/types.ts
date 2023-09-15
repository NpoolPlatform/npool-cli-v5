import { BaseRequest } from '../../request'

export interface Coin {
  ID: string
  Name: string
  Logo: string
  Presale: boolean
  ReservedAmount: string
  Unit: string
  ENV: string
  ForPay: boolean
  HomePage: string
  Specs: string
  StableUSD: boolean
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
  MaxAmountPerWithdraw: string
  LeastTransferAmount: string
  DefaultGoodID: string
  NeedMemo: boolean
  Disabled: boolean
  CheckNewAddressBalance: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateCoinRequest extends BaseRequest{
  Name: string
  Unit: string
  ENV: string
}

export interface CreateCoinResponse {
  Info: Coin
}

export interface GetCoinsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetCoinsResponse {
  Infos: Coin[]
  Total: number
}

export interface UpdateCoinRequest extends BaseRequest {
  ID: string
  Presale: boolean
  ReservedAmount: string
  ForPay: boolean
  HomePage: string
  Specs: string
  FeeCoinTypeID: string
  WithdrawFeeByStableUSD: boolean
  WithdrawFeeAmount: string
  CollectFeeAmount: string
  HotWalletFeeAmount: string
  LowFeeAmount: string
  HotLowFeeAmount?: string
  HotWalletAccountAmount: string
  PaymentAccountCollectAmount: string
  LeastTransferAmount?: string
  Env?: string
  NeedMemo?: boolean
  CheckNewAddressBalance?: boolean
}

export interface UpdateCoinResponse {
  Info: Coin
}

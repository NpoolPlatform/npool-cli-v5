import { GasType } from '../../base'
import { BaseRequest } from '../../request'

export interface Coin {
  ID: number
  EntID: string
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
  RefreshCurrency: boolean
  ChainType: string
  ChainNativeUnit: string
  ChainAtomicUnit: string
  ChainUnitExp: number
  GasType: GasType
  ChainID: string
  ChainNickname: string
  ChainNativeCoinName: string
  CheckNewAddressBalance: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateCoinRequest extends BaseRequest{
  Name: string // CoinName
  Unit: string
  ENV: string
  ChainID: string
  ChainType: string // chain_bases表中的name字段
  ChainNativeUnit: string
  ChainAtomicUnit: string
  ChainUnitExp: number
  ChainNickName?: string
  ChainNativeCoinName: string
  GasType: GasType
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
  ID: number
  Presale?: boolean
  ReservedAmount?: string
  ForPay?: boolean
  HomePage?: string
  Specs?: string
  FeeCoinTypeID?: string
  WithdrawFeeByStableUSD?: boolean
  WithdrawFeeAmount?: string
  CollectFeeAmount?: string
  HotWalletFeeAmount?: string
  LowFeeAmount?: string
  HotLowFeeAmount?: string
  HotWalletAccountAmount?: string
  PaymentAccountCollectAmount?: string
  LeastTransferAmount?: string
  Env?: string
  NeedMemo?: boolean
  CheckNewAddressBalance?: boolean
  RefreshCurrency?: boolean
}

export interface UpdateCoinResponse {
  Info: Coin
}

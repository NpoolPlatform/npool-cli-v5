import { AccountUsedFor } from '../../account/base'
import { BaseRequest } from '../../request'

/** @default "DefaultTxState" */
export enum TxState {
  DefaultTxState = 'DefaultTxState',
  StateCreated = 'StateCreated',
  StateWait = 'StateWait',
  StateTransferring = 'StateTransferring',
  StateSuccessful = 'StateSuccessful',
  StateFail = 'StateFail',
}

/** @default "DefaultTxType" */
export enum TxType {
  DefaultTxType = 'DefaultTxType',
  TxWithdraw = 'TxWithdraw',
  TxFeedGas = 'TxFeedGas',
  TxPaymentCollect = 'TxPaymentCollect',
  TxBenefit = 'TxBenefit',
}

export interface Tx {
  ID: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  CoinENV: string
  AppID: string
  AppName: string
  FromAccountID: string
  FromAddress: string
  FromUsedFor: AccountUsedFor
  ToAccountID: string
  ToAddress: string
  ToUsedFor: AccountUsedFor
  Amount: string
  FeeAmount: string
  ChainTxID: string
  State: TxState
  Extra: string
  Type: TxType
  CreatedAt: number
  UpdatedAt: number
}

export interface GetTxsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetTxsResponse {
  Infos: Tx[]
  Total: number
}

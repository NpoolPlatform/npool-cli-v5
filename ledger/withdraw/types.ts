import { BaseRequest } from '../../request'
import { WithdrawState } from './const'

export interface Withdraw {
  ID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Amount: string
  CreatedAt: number
  Address: string
  AddressLabels: string[]
  State: WithdrawState
  Message: string
}

export interface GetWithdrawsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetWithdrawsResponse {
  Infos: Withdraw[]
  Total: number
}

export interface CreateWithdrawRequest extends BaseRequest{
  CoinTypeID: string
  AccountID: string
  Amount: string
  AccountType: string
  Account: string
  VerificationCode: string
}

export interface CreateWithdrawResponse {
  Info: Withdraw
}

export interface GetAppWithdrawsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppWithdrawsResponse {
  Infos: Withdraw[]
  Total: number
}

export interface GetNAppWithdrawsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppWithdrawsResponse {
  Infos: Withdraw[]
  Total: number
}

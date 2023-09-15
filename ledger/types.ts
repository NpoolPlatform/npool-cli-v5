import { BaseRequest } from '../request'

export interface Ledger {
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Incoming: string
  Locked: string
  Outcoming: string
  Spendable: string
  UserID: string
  PhoneNO: string
  EmailAddress: string
  CoinDisabled: boolean
  CoinDisplay: boolean
}

export interface GetLedgersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetLedgersResponse {
  Infos: Array<Ledger>
  Total: number
}

export interface GetIntervalLedgersRequest extends BaseRequest {
  StartAt?: number
  EndAt?: number
  Offset: number
  Limit: number
}

export interface GetIntervalLedgersResponse {
  Infos: Array<Ledger>
  Total: number
}

export interface GetAppLedgersRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number

}

export interface GetAppLedgersResponse {
  Infos: Array<Ledger>
  Total: number
}

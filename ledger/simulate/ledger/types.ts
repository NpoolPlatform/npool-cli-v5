import { BaseRequest } from '../../../request'

export interface Ledger {
  ID: number
  EntID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Incoming: string
  Outcoming: string
  Spendable: string
  UserID: string
  PhoneNO: string
  EmailAddress: string
  CoinDisabled: boolean
  CoinDisplay: boolean
}

export interface GetSimulateLedgersRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetSimulateLedgersResponse {
  Infos: Array<Ledger>
  Total: number
}

export interface GetAppSimulateLedgersRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number

}

export interface GetAppSimulateLedgersResponse {
  Infos: Array<Ledger>
  Total: number
}

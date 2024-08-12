import { BaseRequest } from '../../../request'
import { Account } from '../base'

export interface GetDepositAccountRequest extends BaseRequest {
  CoinTypeID: string
}

export interface GetDepositAccountResponse {
  Info: Account
}

export interface GetDepositAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetDepositAccountsResponse {
  Infos: Account[]
  Total: number
}

export interface GetAppDepositAccountsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number

}

export interface GetAppDepositAccountsResponse {
  Infos: Array<Account>
  Total: number
}

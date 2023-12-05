import { SignMethodType } from '../../../appuser/base'
import { BaseRequest } from '../../../request'

export interface TransferAccount {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  TargetUserID: string
  TargetEmailAddress: string
  TargetPhoneNO: string
  CreatedAt: number
  TargetUsername: string
  TargetFirstName: string
  TargetLastName: string
}

export interface CreateTransferAccountRequest extends BaseRequest {
  Account: string
  AccountType: SignMethodType
  VerificationCode: string
  TargetAccount: string
  TargetAccountType: SignMethodType
}

export interface CreateTransferAccountResponse {
  Info: TransferAccount
}

export interface DeleteTransferAccountRequest extends BaseRequest {
  TransferID: number
  EntID: string
}

export interface DeleteTransferAccountResponse {
  Info: TransferAccount
}

export interface GetTransferAccountsRequest extends BaseRequest {
  Offset: number
  Limit: number
}
export interface GetTransferAccountsResponse {
  Infos: Array<TransferAccount>
  Total: number
}

export interface GetAppTransferAccountsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppTransferAccountsResponse {
  Infos: Array<TransferAccount>
  Total: number
}

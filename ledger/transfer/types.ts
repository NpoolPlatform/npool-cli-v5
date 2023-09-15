import { AccountType } from '../../appuser/base'
import { BaseRequest } from '../../request'

export interface Transfer {
  ID: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Amount: string
  CreatedAt: number
  TargetUserID: string
  TargetEmailAddress: string
  TargetPhoneNO: string
  TargetUsername: string
  TargetFirstName: string
  TargetLastName: string
}

export interface CreateTransferRequest extends BaseRequest {
  Account: string
  AccountType: AccountType
  VerificationCode: string
  TargetUserID: string
  Amount: string
  CoinTypeID: string
}

export interface CreateTransferResponse {
  Info: Transfer
}

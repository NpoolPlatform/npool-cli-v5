import { AccountUsedFor } from '../../base'

export interface Account {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  CoinName: string
  CoinDisplayNames: string[]
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string
  AccountID: string
  Memo: string
  Address: string
  /** Only [UserWithdraw, UserDirectBenefit, UserDeposit] */
  UsedFor: AccountUsedFor
  Labels: string[]
  CreatedAt: number
  PhoneNO: string
  EmailAddress: string
  Active: boolean
  Blocked: boolean
}

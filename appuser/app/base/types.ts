import { CreateInvitationCodeWhen, RecaptchaType, ResetUserMethod, SignMethodType } from '../../base'
import { SettleAmountType, SettleInterval, SettleMode, CommissionType } from '../../../inspire/app/config/const'

export interface App {
  ID: number
  EntID: string
  CreatedBy: string
  Name: string
  Logo: string
  Description: string
  BanAppID: string
  Banned: boolean
  BanMessage: string
  SignupMethods: Array<SignMethodType>
  ExtSigninMethods: Array<SignMethodType>
  RecaptchaMethod: RecaptchaType
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
  CreatedAt: number
  CreateInvitationCodeWhen: CreateInvitationCodeWhen
  MaxTypedCouponsPerOrder: number
  Maintaining: boolean
  ResetUserMethod: ResetUserMethod
  CommitButtonTargets: string[]
  CouponWithdrawEnable: boolean
  // inspire appconfig
  SettleMode: SettleMode
  SettleAmountType: SettleAmountType
  SettleInterval: SettleInterval
  CommissionType: CommissionType
  SettleBenefit: boolean
  StartAt: number
}

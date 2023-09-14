import { CreateInvitationCodeWhen, RecaptchaType, SignMethodType } from '../../base'

export interface App {
  ID: string
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
  CommitButtonTargets: string[]
}

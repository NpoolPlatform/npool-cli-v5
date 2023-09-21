import { BaseRequest } from '../../request'
import { CreateInvitationCodeWhen, RecaptchaType, SignMethodType } from '../base'
import { App } from './base'

export type GetAppRequest = BaseRequest

export interface GetAppResponse {
  Info: App
}

export interface GetAppsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppsResponse {
  Infos: Array<App>
  Total: number
}

export interface UpdateAppRequest extends BaseRequest {
  ID: string
  CreatedBy?: string
  Name?: string
  Logo: string
  Description: string
  Banned?: boolean
  BanMessage?: string
  SignupMethods?: Array<SignMethodType>
  ExtSigninMethods?: Array<SignMethodType>
  RecaptchaMethod: RecaptchaType
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
  MaxTypedCouponsPerOrder?: number
  CreateInvitationCodeWhen?: CreateInvitationCodeWhen
  Maintaining?: boolean
  CommitButtonTargets?: string[]
}

export interface UpdateAppResponse {
  Info: App
}

export interface CreateAppRequest extends BaseRequest {
  CreatedBy?: string
  Name: string
  Logo: string
  Description: string
  Banned?: boolean
  BanMessage?: string
  SignupMethods?: Array<SignMethodType>
  ExtSigninMethods?: Array<SignMethodType>
  RecaptchaMethod: RecaptchaType
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
}

export interface CreateAppResponse {
  Info: App
}

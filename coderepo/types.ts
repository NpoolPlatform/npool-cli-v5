import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { Composer } from 'vue-i18n'
import { BaseRequest } from '../request'
import { GoogleTokenType } from '../const'
import { EventType } from '../base'

export interface SendEmailCodeRequest extends BaseRequest {
  EmailAddress: string
  UsedFor: string
  ToUsername?: string
}

export interface SendEmailCodeResponse {
  Code: number
  Message: string
}

export interface SendSMSCodeRequest extends BaseRequest {
  UsedFor: EventType
  PhoneNO: string
}

export interface SendSMSCodeResponse {
  Code: number
  Message: string
}

export interface GetGoogleTokenRequest extends BaseRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: GoogleTokenType
}

export interface GoogleToken {
  Req: GoogleTokenType
  Token: string
}

export interface VerifyEmailCodeRequest extends BaseRequest {
  UsedFor: EventType
  Code: string
}

export interface VerifyEmailCodeResponse {
  Code: number
  Message: string
}

export interface VerifySMSCodeRequest extends BaseRequest {
  UsedFor: EventType
  Code: string
}

export interface VerifySMSCodeResponse {
  Code: number
  Message: string
}

export interface ContactByEmailRequest extends BaseRequest {
  UsedFor: EventType
  Sender: string
  Subject: string
  Body: string
  SenderName: string
}

export interface ContactByEmailResponse {
  Info: string
}

export interface CodeRepoState {
  GoogleToken: Map<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  I18n: Composer<unknown, unknown, unknown, any>
}

import { SignMethodType } from '../../appuser/base'
import { BaseRequest } from '../../request'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { EventType } from '../../base'
import { GoogleTokenType } from '../../const'

export interface SendCodeRequest extends BaseRequest {
  Account: string
  AccountType: SignMethodType
  UsedFor: EventType
  ToUsername: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SendCodeResponse{
}

export interface GetGoogleTokenRequest extends BaseRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: GoogleTokenType
}

export interface GoogleToken {
  Req: GoogleTokenType
  Token: string
}

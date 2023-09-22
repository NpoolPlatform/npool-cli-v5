import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { BaseRequest } from '../request'
import { GoogleTokenType } from '../const'

export interface GetGoogleTokenRequest extends BaseRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: GoogleTokenType
}

export interface GoogleToken {
  Req: GoogleTokenType
  Token: string
}

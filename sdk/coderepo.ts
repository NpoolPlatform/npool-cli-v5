import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { coderepo, notify, constant } from '..'

const _coderepo = coderepo.useCodeRepoStore()

export const getGoogleToken = (recaptcha: IReCaptchaComposition | undefined, tokenType: constant.GoogleTokenType, done: (error: boolean, token: string) => void) => {
  _coderepo.getGoogleToken({
    Recaptcha: recaptcha,
    Req: tokenType,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOGLE_TOKEN',
        Message: 'MSG_GET_GOOGLE_TOKEN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (token: string, error: boolean) => {
    done(error, token)
  })
}

import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { notifverify, notify, constant, appuserbase, basetypes } from '..'

const _notifverify = notifverify.useVerifyStore()

export const getGoogleToken = (recaptcha: IReCaptchaComposition | undefined, tokenType: constant.GoogleTokenType, done: (error: boolean, token: string) => void) => {
  _notifverify.getGoogleToken({
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
  }, (error: boolean, token: string) => {
    done(error, token)
  })
}

export const sendVerificationCode = (account: string, accountType: appuserbase.SigninVerifyType, usedFor: basetypes.EventType, toUsername: string, done: (error: boolean) => void) => {
  _notifverify.sendVerificationCode(account, accountType, usedFor, toUsername, done)
}

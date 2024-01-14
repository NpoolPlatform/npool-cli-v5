import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  SendCodeResponse,
  SendCodeRequest,
  GetGoogleTokenRequest
} from './types'
import { SigninVerifyType } from '../../appuser/base'
import { EventType } from '../../base'
import { NotifyType, useNotificationStore } from '../../notify'

export const useVerifyStore = defineStore('notify-verify', {
  state: () => ({
    GoogleToken: new Map<string, string>()
  }),
  getters: {},
  actions: {
    sendVerificationCode (account: string, accountType: SigninVerifyType, usedFor: EventType, toUsername: string, done?: (error: boolean) => void) {
      switch (accountType) {
        case SigninVerifyType.Email:
          this.sendCode({
            Account: account,
            AccountType: accountType,
            UsedFor: usedFor,
            ToUsername: toUsername,
            Message: {
              Error: {
                Title: 'MSG_SEND_EMAIL_CODE',
                Message: 'MSG_SEND_EMAIL_CODE_FAIL',
                Popup: true,
                Type: NotifyType.Error
              }
            }
          }, done)
          break
        case SigninVerifyType.Mobile:
          this.sendCode({
            Account: account,
            AccountType: accountType,
            UsedFor: usedFor,
            ToUsername: toUsername,
            Message: {
              Error: {
                Title: 'MSG_SEND_SMS_CODE',
                Message: 'MSG_SEND_SMS_CODE_FAIL',
                Popup: true,
                Type: NotifyType.Error
              }
            }
          }, done)
          break
      }
    },
    sendCode (req: SendCodeRequest, done?: (error: boolean) => void) {
      doActionWithError<SendCodeRequest, SendCodeResponse>(
        API.SEND_CODE,
        req,
        req.Message,
        (): void => {
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getGoogleToken (req: GetGoogleTokenRequest, done: (error: boolean, token: string) => void) {
      const recaptcha = req.Recaptcha
      const notification = useNotificationStore()
      if (recaptcha) {
        const { executeRecaptcha, recaptchaLoaded } = recaptcha
        recaptchaLoaded()
          .then((loaded: boolean) => {
            if (loaded) {
              void executeRecaptcha(req.Req)
                .then((token: string) => {
                  this.GoogleToken.set(req.Req, token)
                  done(false, token)
                })
                .catch((err: Error) => {
                  if (req.Message?.Error) {
                    req.Message.Error.Description = err.message
                    notification.pushNotification(req.Message.Error)
                  }
                })
            }
          })
          .catch((err: Error) => {
            if (req.Message?.Error) {
              req.Message.Error.Description = err.message
              notification.pushNotification(req.Message.Error)
            }
          })
      }
    }
  }
})

import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../request'
import {
  CodeRepoState,
  ContactByEmailRequest,
  ContactByEmailResponse,
  GetGoogleTokenRequest,
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  SendSMSCodeRequest,
  SendSMSCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  VerifySMSCodeRequest,
  VerifySMSCodeResponse
} from './types'
import { API } from './const'
import { useI18n } from 'vue-i18n'
import { GoogleTokenType } from '../const'
import { NotifyType, useNotificationStore } from '../notify'
import { SignMethodType } from '../appuser/base'
import { EventType } from '../base'

export const useCodeRepoStore = defineStore('coderepo', {
  state: (): CodeRepoState => ({
    GoogleToken: new Map<string, string>(),
    I18n: useI18n()
  }),
  getters: {
    getGoogleTokenByType (): (tokenType: GoogleTokenType) => string | undefined {
      return (tokenType: GoogleTokenType) => {
        return this.GoogleToken.get(tokenType)
      }
    }
  },
  actions: {
    sendEmailCode (req: SendEmailCodeRequest) {
      doAction<SendEmailCodeRequest, SendEmailCodeResponse>(
        API.SEND_EMAIL_CODE,
        req,
        req.Message,
        (resp: SendEmailCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
          }
        })
    },
    sendSMSCode (req: SendSMSCodeRequest) {
      doAction<SendSMSCodeRequest, SendSMSCodeResponse>(
        API.SEND_SMS_CODE,
        req,
        req.Message,
        (resp: SendSMSCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
          }
        })
    },
    sendVerificationCode (account: string, accountType: SignMethodType, usedFor: EventType, toUsername: string) {
      switch (accountType) {
        case SignMethodType.Email:
          this.sendEmailCode({
            EmailAddress: account,
            UsedFor: usedFor,
            ToUsername: toUsername,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_EMAIL_CODE'),
                Message: this.I18n.t('MSG_SEND_EMAIL_CODE_FAIL'),
                Popup: true,
                Type: NotifyType.Error
              }
            }
          })
          break
        case SignMethodType.Mobile:
          this.sendSMSCode({
            PhoneNO: account,
            UsedFor: usedFor,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_SMS_CODE'),
                Message: this.I18n.t('MSG_SEND_SMS_CODE_FAIL'),
                Popup: true,
                Type: NotifyType.Error
              }
            }
          })
          break
      }
    },
    getGoogleToken (req: GetGoogleTokenRequest, done: (token: string) => void) {
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
                  done(token)
                })
                .catch((err: Error) => {
                  if (req.Message.Error) {
                    req.Message.Error.Description = err.message
                    notification.Notifications.push(req.Message.Error)
                  }
                })
            }
          })
          .catch((err: Error) => {
            if (req.Message.Error) {
              req.Message.Error.Description = err.message
              notification.Notifications.push(req.Message.Error)
            }
          })
      }
    },
    verifyEmailCode (req: VerifyEmailCodeRequest, done: (error: boolean) => void) {
      doActionWithError<VerifyEmailCodeRequest, VerifyEmailCodeResponse>(
        API.VERIFY_EMAIL_CODE,
        req,
        req.Message,
        (resp: VerifyEmailCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
            done(true)
          } else {
            done(false)
          }
        }, () => {
          done(true)
        })
    },
    verifySMSCode (req: VerifySMSCodeRequest, done: (error: boolean) => void) {
      doActionWithError<VerifySMSCodeRequest, VerifySMSCodeResponse>(
        API.VERIFY_SMS_CODE,
        req,
        req.Message,
        (resp: VerifySMSCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
            done(true)
          } else {
            done(false)
          }
        }, () => {
          done(true)
        })
    },
    sendContactEmail (req: ContactByEmailRequest, done: () => void) {
      doAction<ContactByEmailRequest, ContactByEmailResponse>(
        API.CONTACT_BY_EMAIL,
        req,
        req.Message,
        (): void => {
          done()
        })
    }
  }
})

export * from './types'
export * from './const'

import { defineStore } from 'pinia'
import {
  GetGoogleTokenRequest
} from './types'
import { GoogleTokenType } from '../const'
import { useNotificationStore } from '../notify'

export const useCodeRepoStore = defineStore('coderepo', {
  state: () => ({
    GoogleToken: new Map<string, string>()
  }),
  getters: {
    getGoogleTokenByType (): (tokenType: GoogleTokenType) => string | undefined {
      return (tokenType: GoogleTokenType) => {
        return this.GoogleToken.get(tokenType)
      }
    }
  },
  actions: {
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

export * from './types'

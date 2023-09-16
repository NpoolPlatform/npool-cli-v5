import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import { SetupGoogleAuthRequest, SetupGoogleAuthResponse, VerifyGoogleAuthRequest, VerifyGoogleAuthResponse } from './types'
import { User, useLocalUserStore } from '../user'

export const useGoogleAuthStore = defineStore('google-auth', {
  state: () => ({}),
  getters: {},
  actions: {
    setupGoogleAuth (req: SetupGoogleAuthRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<SetupGoogleAuthRequest, SetupGoogleAuthResponse>(
        API.SETUP_GOOGLEAUTH,
        req,
        req.Message,
        (resp: SetupGoogleAuthResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },
    verifyGoogleAuth (req: VerifyGoogleAuthRequest, done: (resp: User, error: boolean) => void) {
      doActionWithError<VerifyGoogleAuthRequest, VerifyGoogleAuthResponse>(
        API.VERIFY_GOOGLEAUTH,
        req,
        req.Message,
        (resp: VerifyGoogleAuthResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    }
  }
})

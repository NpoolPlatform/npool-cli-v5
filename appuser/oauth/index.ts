import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import { doActionWithError } from '../../request'
import {
  GetOAuthLoginURLRequest,
  GetOAuthLoginURLResponse,
  OAuthLoginRequest,
  OAuthLoginResponse
} from './types'
import { User, useLocalUserStore } from '../user'

export const useOAuthStore = defineStore('oauth', {
  state: () => ({}),
  getters: {
  },
  actions: {
    getOAuthLoginURL (req: GetOAuthLoginURLRequest, done?: (error: boolean, url?: string) => void) {
      doActionWithError<GetOAuthLoginURLRequest, GetOAuthLoginURLResponse>(
        APIEnum.GET_OAUTH_LOGIN_URL,
        req,
        req.Message,
        (resp: GetOAuthLoginURLResponse): void => {
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    oauthLogin (req: OAuthLoginRequest, done?: (error: boolean, user?: User) => void) {
      doActionWithError<OAuthLoginRequest, OAuthLoginResponse>(
        APIEnum.OAUTH_LOGIN,
        req,
        req.Message,
        (resp: OAuthLoginResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    }
  }
})

export * from './types'

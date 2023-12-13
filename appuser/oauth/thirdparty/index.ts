import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import { doActionWithError } from '../../../request'
import {
  CreateOAuthThirdPartyRequest,
  CreateOAuthThirdPartyResponse,
  DeleteOAuthThirdPartyRequest,
  DeleteOAuthThirdPartyResponse,
  GetOAuthThirdPartiesRequest,
  GetOAuthThirdPartiesResponse,
  UpdateOAuthThirdPartyRequest,
  UpdateOAuthThirdPartyResponse
} from './types'
import { OAuthThirdParty } from '../base'

export const useOAuthThirdPartyStore = defineStore('oauth-third-party', {
  state: () => ({
    OAuthThirdParties: [] as Array<OAuthThirdParty>
  }),
  getters: {
  },
  actions: {
    createOAuthThirdParty (req: CreateOAuthThirdPartyRequest, done: (error: boolean, row?: OAuthThirdParty) => void) {
      doActionWithError<CreateOAuthThirdPartyRequest, CreateOAuthThirdPartyResponse>(
        APIEnum.CREATE_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: CreateOAuthThirdPartyResponse): void => {
          this.OAuthThirdParties.push(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateOAuthThirdParty (req: UpdateOAuthThirdPartyRequest, done: (error: boolean, row?: OAuthThirdParty) => void) {
      doActionWithError<UpdateOAuthThirdPartyRequest, UpdateOAuthThirdPartyResponse>(
        APIEnum.UPDATE_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: UpdateOAuthThirdPartyResponse): void => {
          const index = this.OAuthThirdParties.findIndex((el) => el.ID === resp.Info.ID)
          this.OAuthThirdParties.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getOAuthThirdParties (req: GetOAuthThirdPartiesRequest, done: (error: boolean, rows?: Array<OAuthThirdParty>) => void) {
      doActionWithError<GetOAuthThirdPartiesRequest, GetOAuthThirdPartiesResponse>(
        APIEnum.GET_OAUTH_THIRD_PARTIES,
        req,
        req.Message,
        (resp: GetOAuthThirdPartiesResponse): void => {
          this.OAuthThirdParties = resp.Infos
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    deleteOAuthThirdParty (req: DeleteOAuthThirdPartyRequest, done: (error: boolean, row?: OAuthThirdParty) => void) {
      doActionWithError<DeleteOAuthThirdPartyRequest, DeleteOAuthThirdPartyResponse>(
        APIEnum.DELETE_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: DeleteOAuthThirdPartyResponse): void => {
          const index = this.OAuthThirdParties.findIndex((el) => el.ID === resp.Info.ID)
          this.OAuthThirdParties.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import { doActionWithError } from '../../../request'
import {
  CreateAppOAuthThirdPartyRequest,
  CreateAppOAuthThirdPartyResponse,
  DeleteAppOAuthThirdPartyRequest,
  DeleteAppOAuthThirdPartyResponse,
  GetAppOAuthThirdPartiesRequest,
  GetAppOAuthThirdPartiesResponse,
  GetOAuthThirdPartiesRequest,
  GetOAuthThirdPartiesResponse,
  UpdateAppOAuthThirdPartyRequest,
  UpdateAppOAuthThirdPartyResponse
} from './types'
import { formalizeAppID } from '../../app/local'
import { AppOAuthThirdParty } from '../base/types'

export const useAppOAuthThirdPartyStore = defineStore('app-oauth-third-party', {
  state: () => ({
    AppOAuthThirdParties: new Map<string, Array<AppOAuthThirdParty>>()
  }),
  getters: {
    thirdParties (): (appID?: string | undefined) => Array<AppOAuthThirdParty> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.AppOAuthThirdParties.get(appID) || []
      }
    },
    addThirdParties (): (appID: string | undefined, parties: Array<AppOAuthThirdParty>) => void {
      return (appID: string | undefined, parties: Array<AppOAuthThirdParty>) => {
        appID = formalizeAppID(appID)
        let _users = this.AppOAuthThirdParties.get(appID) as Array<AppOAuthThirdParty>
        if (!_users) {
          _users = []
        }
        parties.forEach((party) => {
          const index = _users.findIndex((el) => el.ID === party.ID)
          _users.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, party)
        })
        this.AppOAuthThirdParties.set(appID, _users)
      }
    },
    delThirdParties (): (party: AppOAuthThirdParty) => void {
      return (party: AppOAuthThirdParty) => {
        let parties = this.AppOAuthThirdParties.get(party.AppID)
        if (!parties) {
          parties = []
        }
        const index = parties.findIndex((el) => el.ID === party.ID)
        parties.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.AppOAuthThirdParties.set(party.AppID, parties)
      }
    }
  },
  actions: {
    createAppOAuthThirdParty (req: CreateAppOAuthThirdPartyRequest, done: (error: boolean, row?: AppOAuthThirdParty) => void) {
      doActionWithError<CreateAppOAuthThirdPartyRequest, CreateAppOAuthThirdPartyResponse>(
        APIEnum.CREATE_APP_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: CreateAppOAuthThirdPartyResponse): void => {
          let thirdParties = this.AppOAuthThirdParties.get(req.TargetAppID)
          if (!thirdParties) {
            thirdParties = [] as Array<AppOAuthThirdParty>
          }
          thirdParties.push(resp.Info)
          this.AppOAuthThirdParties.set(req.TargetAppID, thirdParties)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateAppOAuthThirdParty (req: UpdateAppOAuthThirdPartyRequest, done: (error: boolean, row?: AppOAuthThirdParty) => void) {
      doActionWithError<UpdateAppOAuthThirdPartyRequest, UpdateAppOAuthThirdPartyResponse>(
        APIEnum.UPDATE_APP_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: UpdateAppOAuthThirdPartyResponse): void => {
          let thirdParties = this.AppOAuthThirdParties.get(req.TargetAppID)
          if (!thirdParties) {
            thirdParties = [] as Array<AppOAuthThirdParty>
          }
          const index = thirdParties.findIndex((el) => el.ID === req.ID)
          thirdParties.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, resp.Info)
          this.AppOAuthThirdParties.set(req.TargetAppID, thirdParties)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getAppOAuthThirdParties (req: GetAppOAuthThirdPartiesRequest, done: (error: boolean, rows?: Array<AppOAuthThirdParty>) => void) {
      doActionWithError<GetAppOAuthThirdPartiesRequest, GetAppOAuthThirdPartiesResponse>(
        APIEnum.GET_APP_APP_OAUTH_THIRD_PARTIES,
        req,
        req.Message,
        (resp: GetAppOAuthThirdPartiesResponse): void => {
          this.AppOAuthThirdParties.set(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getOAuthThirdParties (req: GetOAuthThirdPartiesRequest, done: (error: boolean, rows?: Array<AppOAuthThirdParty>) => void) {
      doActionWithError<GetOAuthThirdPartiesRequest, GetOAuthThirdPartiesResponse>(
        APIEnum.GET_OAUTH_THIRD_PARTIES,
        req,
        req.Message,
        (resp: GetAppOAuthThirdPartiesResponse): void => {
          this.addThirdParties(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppOAuthThirdParty (req: DeleteAppOAuthThirdPartyRequest, done: (error: boolean, row?: AppOAuthThirdParty) => void) {
      doActionWithError<DeleteAppOAuthThirdPartyRequest, DeleteAppOAuthThirdPartyResponse>(
        APIEnum.DELETE_APP_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: DeleteAppOAuthThirdPartyResponse): void => {
          this.delThirdParties(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import { doActionWithError } from '../../../request'
import {
  AppOAuthThirdParty,
  CreateAppOAuthThirdPartyRequest,
  CreateAppOAuthThirdPartyResponse,
  DeleteAppOAuthThirdPartyRequest,
  DeleteAppOAuthThirdPartyResponse,
  GetAppOAuthThirdPartiesRequest,
  GetAppOAuthThirdPartiesResponse,
  UpdateAppOAuthThirdPartyRequest,
  UpdateAppOAuthThirdPartyResponse
} from './types'

export const useAppOAuthThirdPartyStore = defineStore('app-oauth-third-party', {
  state: () => ({
    AppOAuthThirdParties: new Map<string, Array<AppOAuthThirdParty>>()
  }),
  getters: {
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
    deleteAppOAuthThirdParty (req: DeleteAppOAuthThirdPartyRequest, done: (error: boolean, row?: AppOAuthThirdParty) => void) {
      doActionWithError<DeleteAppOAuthThirdPartyRequest, DeleteAppOAuthThirdPartyResponse>(
        APIEnum.DELETE_APP_OAUTH_THIRD_PARTY,
        req,
        req.Message,
        (resp: DeleteAppOAuthThirdPartyResponse): void => {
          let thirdParties = this.AppOAuthThirdParties.get(req.TargetAppID)
          if (!thirdParties) {
            thirdParties = [] as Array<AppOAuthThirdParty>
          }
          const index = thirdParties.findIndex((el) => el.ID === req.ID)
          thirdParties.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
          this.AppOAuthThirdParties.set(req.TargetAppID, thirdParties)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

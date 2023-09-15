import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  Auth,
  CreateAppAuthRequest,
  CreateAppAuthResponse,
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  GetAppAuthsRequest,
  GetAppAuthsResponse
} from './types'
import { formalizeAppID } from '../app/local'

export const useAuthingStore = defineStore('auths', {
  state: () => ({
    Auths: new Map<string, Array<Auth>>()
  }),
  getters: {
    auths (): (appID?: string, roleID?: string, userID?: string) => Array<Auth> {
      return (appID?: string, roleID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.Auths.get(appID)?.filter((el) => {
          let ok = true
          if (roleID) ok &&= el.RoleID === roleID
          if (userID) ok &&= el.UserID === userID
          return ok
        }) || []
      }
    },
    addAuths (): (appID: string | undefined, auths: Array<Auth>) => void {
      return (appID: string | undefined, auths: Array<Auth>) => {
        appID = formalizeAppID(appID)
        let _auths = this.Auths.get(appID) as Array<Auth>
        if (!_auths) {
          _auths = []
        }
        auths.forEach((auth) => {
          const index = _auths.findIndex((el) => el.ID === auth.ID)
          _auths.splice(index, 1, auth)
        })
        this.Auths.set(appID, _auths)
      }
    },
    delAuth (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        let _auths = this.Auths.get(appID) as Array<Auth>
        if (!_auths) {
          _auths = []
        }
        const index = _auths.findIndex((el) => el.ID === id)
        _auths.splice(index, 1)
        this.Auths.set(appID, _auths)
      }
    }
  },
  actions: {
    getAppAuths (req: GetAppAuthsRequest, done: (error: boolean, auths?: Array<Auth>) => void) {
      doActionWithError<GetAppAuthsRequest, GetAppAuthsResponse>(
        API.GET_APP_AUTHS,
        req,
        req.Message,
        (resp: GetAppAuthsResponse): void => {
          this.addAuths(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },

    createAppAuth (req: CreateAppAuthRequest, done: (error: boolean, auth?: Auth) => void) {
      doActionWithError<CreateAppAuthRequest, CreateAppAuthResponse>(
        API.CREATE_APP_AUTH,
        req,
        req.Message,
        (resp: CreateAppAuthResponse): void => {
          this.addAuths(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    deleteAppAuth (req: DeleteAppAuthRequest, done: (error: boolean, auth?: Auth) => void) {
      doActionWithError<DeleteAppAuthRequest, DeleteAppAuthResponse>(
        API.DELETE_APP_AUTH,
        req,
        req.Message,
        (resp: DeleteAppAuthResponse): void => {
          this.delAuth(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

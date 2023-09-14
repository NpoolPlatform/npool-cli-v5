import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'

import {
  App,
  CreateAppRequest,
  CreateAppResponse,
  GetAppsRequest,
  GetAppsResponse,
  UpdateAppRequest,
  UpdateAppResponse
} from './types'

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    Apps: new Map<string, App>(),
    AppID: undefined as unknown as string
  }),
  getters: {
    getApp () {
      return (appID?: string) => {
        return appID ? this.Apps.get(appID) : this.Apps.get(this.AppID)
      }
    }
  },
  actions: {
    getApps (req: GetAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<GetAppsRequest, GetAppsResponse>(
        API.GET_APPS,
        req,
        req.Message,
        (resp: GetAppsResponse): void => {
          resp.Infos.forEach((app) => {
            this.Apps.set(app.ID, app)
          })
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateApp (req: UpdateAppRequest, done: (app: App, error: boolean) => void) {
      doActionWithError<UpdateAppRequest, UpdateAppResponse>(
        API.UPDATE_APP,
        req,
        req.Message,
        (resp: UpdateAppResponse): void => {
          this.Apps.set(resp.Info.ID, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as App, true)
        })
    },
    createApp (req: CreateAppRequest, done: (app: App, error: boolean) => void) {
      doActionWithError<CreateAppRequest, CreateAppResponse>(
        API.CREATE_APP,
        req,
        req.Message,
        (resp: CreateAppResponse): void => {
          this.Apps.set(resp.Info.ID, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as App, true)
        })
    }
  }
})

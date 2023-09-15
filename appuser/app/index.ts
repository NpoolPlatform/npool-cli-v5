import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateAppRequest,
  CreateAppResponse,
  GetAppsRequest,
  GetAppsResponse,
  UpdateAppRequest,
  UpdateAppResponse
} from './types'
import { App } from './base'
import { useMyApplicationStore } from './local'

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    Apps: new Map<string, App>(),
    AppID: undefined as unknown as string
  }),
  getters: {
    app () {
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
          const myApp = useMyApplicationStore()
          resp.Infos.forEach((app) => {
            this.Apps.set(app.ID, app)
            if (myApp.AppID === app.ID) {
              myApp.App = app
            }
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

export * from './base'
export * from './const'
export * from './types'

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
import { useLocalApplicationStore } from './local'

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
    },
    apps () {
      return () => Array.from(this.Apps.values())
    }
  },
  actions: {
    getApps (req: GetAppsRequest, done: (error: boolean, apps?: Array<App>) => void) {
      doActionWithError<GetAppsRequest, GetAppsResponse>(
        API.GET_APPS,
        req,
        req.Message,
        (resp: GetAppsResponse): void => {
          const myApp = useLocalApplicationStore()
          resp.Infos.forEach((app) => {
            this.Apps.set(app.ID, app)
            if (myApp.myAppID === app.ID) {
              myApp.MyApp = app
            }
          })
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateApp (req: UpdateAppRequest, done: (error: boolean, app?: App) => void) {
      doActionWithError<UpdateAppRequest, UpdateAppResponse>(
        API.UPDATE_APP,
        req,
        req.Message,
        (resp: UpdateAppResponse): void => {
          this.Apps.set(resp.Info.ID, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createApp (req: CreateAppRequest, done: (error: boolean, app?: App) => void) {
      doActionWithError<CreateAppRequest, CreateAppResponse>(
        API.CREATE_APP,
        req,
        req.Message,
        (resp: CreateAppResponse): void => {
          this.Apps.set(resp.Info.ID, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './base'
export * from './const'
export * from './types'

import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateAppRequest,
  CreateAppResponse,
  GetAppsRequest,
  GetAppsResponse,
  UpdateAppRequest,
  UpdateAppResponse,
  GetAppRequest,
  GetAppResponse
} from './types'
import { App } from './base'
import { formalizeAppID, useLocalApplicationStore } from './local'

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    Apps: new Map<string, App>()
  }),
  getters: {
    app () {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Apps.get(appID)
      }
    },
    apps () {
      return () => Array.from(this.Apps.values()).sort((a, b) => a.ID > b.ID ? 1 : -1)
    }
  },
  actions: {
    addApps (apps: Array<App>) {
      apps.forEach((app) => {
        this.Apps.set(app.EntID, app)
        const localapp = useLocalApplicationStore()
        if (app.EntID === localapp.myAppID) {
          localapp.MyApp = app
        }
      })
    },
    getApp (req: GetAppRequest, done: (error: boolean, apps?: App) => void) {
      doActionWithError<GetAppRequest, GetAppResponse>(
        API.GET_APP,
        req,
        req.Message,
        (resp: GetAppResponse): void => {
          this.addApps([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getApps (req: GetAppsRequest, done: (error: boolean, apps?: Array<App>) => void) {
      doActionWithError<GetAppsRequest, GetAppsResponse>(
        API.GET_APPS,
        req,
        req.Message,
        (resp: GetAppsResponse): void => {
          this.addApps(resp.Infos)
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
          if (req.NewEntID && req.EntID !== req.NewEntID) { // update EntID
            this.Apps.delete(req.EntID)
          }
          this.addApps([resp.Info])
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
          this.addApps([resp.Info])
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

import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppLangsRequest,
  GetAppLangsResponse,
  UpdateAppLangRequest,
  UpdateAppLangResponse,
  GetNAppLangsRequest,
  GetNAppLangsResponse,
  CreateAppLangRequest,
  CreateAppLangResponse,
  DeleteAppLangRequest,
  DeleteAppLangResponse
} from './types'
import { doActionWithError } from '../../../request'
import { useLocaleStore } from '../../locale'
import { AppLang } from '../../base'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppLangStore = defineStore('app-langs', {
  state: () => ({
    AppLangs: new Map<string, Array<AppLang>>()
  }),
  getters: {
    lang (): (appID: string | undefined, langID?: string, langName?: string) => AppLang | undefined {
      return (appID: string | undefined, langID?: string, langName?: string) => {
        appID = formalizeAppID(appID)
        return this.AppLangs.get(appID)?.find((el) => {
          let ok = true
          if (langID) ok &&= el.LangID === langID
          if (langName) ok &&= el.Lang === langName
          if (!langID && !langName) ok &&= el.Main
          return ok
        })
      }
    },
    langs (): (appID?: string) => Array<AppLang> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppLangs.get(appID) || []
      }
    },
    mainLangID (): (appID?: string) => string | undefined {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppLangs.get(appID)?.find((el) => el.Main)?.LangID
      }
    },
    langID (): (appID: string | undefined, langName?: string) => string | undefined {
      return (appID?: string, langName?: string) => {
        appID = formalizeAppID(appID)
        return this.AppLangs.get(appID)?.find((el) => el.Lang === langName)?.LangID
      }
    }
  },
  actions: {
    addLangs (appID: string | undefined, langs: Array<AppLang>) {
      const setLang = !appID
      appID = formalizeAppID(appID)
      let _langs = this.AppLangs.get(appID) as Array<AppLang>
      if (!_langs) {
        _langs = []
      }
      langs.forEach((lang) => {
        const index = _langs?.findIndex((el) => el.ID === lang.ID)
        _langs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, lang)
      })
      this.AppLangs.set(appID, _langs)
      if (!langs?.length) return
      const locale = useLocaleStore()
      if (setLang) {
        locale.setLangs(_langs)
      }
    },
    delLang (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      const _langs = this.AppLangs.get(appID) as Array<AppLang>
      if (!_langs) {
        return
      }
      const index = _langs?.findIndex((el) => el.ID === id)
      _langs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppLangs.set(appID, _langs)
    },
    getAppLangs (req: GetAppLangsRequest, done: (error: boolean, rows: Array<AppLang>) => void) {
      doActionWithError<GetAppLangsRequest, GetAppLangsResponse>(
        API.GET_APPLANGS,
        req,
        req.Message,
        (resp: GetAppLangsResponse): void => {
          this.addLangs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    updateAppLang (req: UpdateAppLangRequest, done: (error: boolean, row: AppLang) => void) {
      doActionWithError<UpdateAppLangRequest, UpdateAppLangResponse>(
        API.UPDATE_APPLANG,
        req,
        req.Message,
        (resp: UpdateAppLangResponse): void => {
          this.addLangs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppLang)
        }
      )
    },

    getNAppLangs (req: GetNAppLangsRequest, done: (error: boolean, rows: Array<AppLang>) => void) {
      doActionWithError<GetNAppLangsRequest, GetNAppLangsResponse>(
        API.GET_APPLANGS,
        req,
        req.Message,
        (resp: GetNAppLangsResponse): void => {
          this.addLangs(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppLang (req: DeleteAppLangRequest, done: (error: boolean, row: AppLang) => void) {
      doActionWithError<DeleteAppLangRequest, DeleteAppLangResponse>(
        API.DELETE_APPLANG,
        req,
        req.Message,
        (resp: DeleteAppLangResponse): void => {
          this.delLang(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppLang)
        }
      )
    },
    createAppLang (req: CreateAppLangRequest, done: (error: boolean, row: AppLang) => void) {
      doActionWithError<CreateAppLangRequest, CreateAppLangResponse>(
        API.CREATE_APPLANG,
        req,
        req.Message,
        (resp: CreateAppLangResponse): void => {
          this.addLangs(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppLang)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

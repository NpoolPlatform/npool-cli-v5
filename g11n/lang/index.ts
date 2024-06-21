import { defineStore } from 'pinia'
import { API } from './const'
import {
  Lang,
  GetLangsRequest,
  GetLangsResponse,
  UpdateLangRequest,
  UpdateLangResponse,
  CreateLangRequest,
  CreateLangResponse,
  CreateLangsRequest,
  CreateLangsResponse
} from './types'
import { doActionWithError } from '../../request'

export const useLangStore = defineStore('langs', {
  state: () => ({
    Langs: [] as Array<Lang>
  }),
  getters: {
    lang (): (id: number) => Lang | undefined {
      return (id: number) => {
        return this.Langs.find((el) => el.ID === id)
      }
    },
    langs () {
      return () => this.Langs
    },
    addLangs (): (countries: Array<Lang>) => void {
      return (countries: Array<Lang>) => {
        countries.forEach((country) => {
          const index = this.Langs.findIndex((el) => el.ID === country.ID)
          this.Langs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, country)
        })
      }
    }
  },
  actions: {
    getLangs (req: GetLangsRequest, done?: (error: boolean, rows: Array<Lang>) => void) {
      doActionWithError<GetLangsRequest, GetLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetLangsResponse): void => {
          this.addLangs(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true, [])
        }
      )
    },
    updateLang (req: UpdateLangRequest, done?: (error: boolean, row: Lang) => void) {
      doActionWithError<UpdateLangRequest, UpdateLangResponse>(
        API.UPDATE_LANG,
        req,
        req.Message,
        (resp: UpdateLangResponse): void => {
          this.addLangs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true, {} as Lang)
        }
      )
    },
    createLang (req: CreateLangRequest, done?: (error: boolean, row: Lang) => void) {
      doActionWithError<CreateLangRequest, CreateLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateLangResponse): void => {
          this.addLangs([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true, {} as Lang)
        }
      )
    },
    createLangs (req: CreateLangsRequest, done?: (error: boolean, row: Array<Lang>) => void) {
      doActionWithError<CreateLangsRequest, CreateLangsResponse>(
        API.CREATE_LANGS,
        req,
        req.Message,
        (resp: CreateLangsResponse): void => {
          this.addLangs(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true, [] as Array<Lang>)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

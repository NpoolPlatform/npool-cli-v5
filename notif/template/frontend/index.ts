import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFrontendTemplateRequest,
  CreateFrontendTemplateResponse,
  DeleteFrontendTemplateRequest,
  DeleteFrontendTemplateResponse,
  UpdateFrontendTemplateRequest,
  UpdateFrontendTemplateResponse,
  GetFrontendTemplatesRequest,
  GetFrontendTemplatesResponse,
  Template,
  GetAppFrontendTemplatesRequest,
  GetAppFrontendTemplatesResponse,
  CreateAppFrontendTemplateRequest,
  CreateAppFrontendTemplateResponse,
  UpdateAppFrontendTemplateRequest,
  UpdateAppFrontendTemplateResponse
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useFrontendTemplateStore = defineStore('front-templates', {
  state: () => ({
    FrontendTemplates: new Map<string, Array<Template>>()
  }),
  getters: {
    templates (): (appID?: string) => Array<Template> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.FrontendTemplates.get(appID)?.sort((a, b) => a.UsedFor.localeCompare(b.UsedFor, 'zh-CN')) || []
      }
    },
    addTemplates (): (appID: string | undefined, templates: Array<Template>) => void {
      return (appID: string | undefined, templates: Array<Template>) => {
        appID = formalizeAppID(appID)
        let _templates = this.FrontendTemplates.get(appID) as Array<Template>
        if (!_templates) {
          _templates = []
        }
        templates.forEach((channel) => {
          const index = _templates.findIndex((el) => el.ID === channel.ID)
          _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, channel)
        })
        this.FrontendTemplates.set(appID, _templates)
      }
    },
    delTemplate (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        const _templates = this.FrontendTemplates.get(appID) as Array<Template>
        if (!_templates) {
          return
        }
        const index = _templates.findIndex((el) => el.ID === id)
        _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.FrontendTemplates.set(appID, _templates)
      }
    }
  },
  actions: {
    getFrontendTemplates (req: GetFrontendTemplatesRequest, done: (error: boolean, rows: Array<Template>) => void) {
      doActionWithError<GetFrontendTemplatesRequest, GetFrontendTemplatesResponse>(
        API.GET_FRONTENDTEMPLATES,
        req,
        req.Message,
        (resp: GetFrontendTemplatesResponse): void => {
          this.addTemplates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Template>)
        }
      )
    },
    deleteFrontendTemplate (req: DeleteFrontendTemplateRequest, done: (error: boolean, row: Template) => void) {
      doActionWithError<DeleteFrontendTemplateRequest, DeleteFrontendTemplateResponse>(
        API.DELETE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: DeleteFrontendTemplateResponse): void => {
          this.delTemplate(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Template)
        }
      )
    },
    createFrontendTemplate (req: CreateFrontendTemplateRequest, done: (error: boolean, row: Template) => void) {
      doActionWithError<CreateFrontendTemplateRequest, CreateFrontendTemplateResponse>(
        API.CREATE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: CreateFrontendTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Template)
        }
      )
    },
    updateFrontendTemplate (req: UpdateFrontendTemplateRequest, done: (error: boolean, row: Template) => void) {
      doActionWithError<UpdateFrontendTemplateRequest, UpdateFrontendTemplateResponse>(
        API.UPDATE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: UpdateFrontendTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Template)
        }
      )
    },

    getAppFrontendTemplates (req: GetAppFrontendTemplatesRequest, done: (error: boolean, rows: Array<Template>) => void) {
      doActionWithError<GetAppFrontendTemplatesRequest, GetAppFrontendTemplatesResponse>(
        API.GET_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: GetAppFrontendTemplatesResponse): void => {
          this.addTemplates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    createAppFrontendTemplate (req: CreateAppFrontendTemplateRequest, done: (error: boolean, row: Template) => void) {
      doActionWithError<CreateAppFrontendTemplateRequest, CreateAppFrontendTemplateResponse>(
        API.CREATE_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: CreateAppFrontendTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Template)
        }
      )
    },
    updateAppFrontendTemplate (req: UpdateAppFrontendTemplateRequest, done: (error: boolean, row: Template) => void) {
      doActionWithError<UpdateAppFrontendTemplateRequest, UpdateAppFrontendTemplateResponse>(
        API.UPDATE_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: UpdateAppFrontendTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Template)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  GetAppEmailTemplatesRequest,
  GetAppEmailTemplatesResponse,
  Template,
  UpdateAppEmailTemplateRequest,
  UpdateAppEmailTemplateResponse,
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useEmailTemplateStore = defineStore('email-templates', {
  state: () => ({
    EmailTemplates: new Map<string, Array<Template>>()
  }),
  getters: {
    templates (): (appID?: string) => Array<Template> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.EmailTemplates.get(appID)?.sort((a, b) => a.UsedFor.localeCompare(b.UsedFor, 'zh-CN')) || []
      }
    },
    addTemplates (): (appID: string | undefined, templates: Array<Template>) => void {
      return (appID: string | undefined, templates: Array<Template>) => {
        appID = formalizeAppID(appID)
        let _templates = this.EmailTemplates.get(appID) as Array<Template>
        if (!_templates) {
          _templates = []
        }
        templates.forEach((channel) => {
          const index = _templates.findIndex((el) => el.ID === channel.ID)
          _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, channel)
        })
        this.EmailTemplates.set(appID, _templates)
      }
    },
    delTemplate (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        const _templates = this.EmailTemplates.get(appID) as Array<Template>
        if (!_templates) {
          return
        }
        const index = _templates.findIndex((el) => el.ID === id)
        _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.EmailTemplates.set(appID, _templates)
      }
    }
  },
  actions: {
    createEmailTemplate (req: CreateEmailTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<CreateEmailTemplateRequest, CreateEmailTemplateResponse>(
        API.CREATE_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: CreateEmailTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getEmailTemplates (req: GetEmailTemplatesRequest, done: (error: boolean, rows?: Array<Template>) => void) {
      doActionWithError<GetEmailTemplatesRequest, GetEmailTemplatesResponse>(
        API.GET_EMAILTEMPLATES,
        req,
        req.Message,
        (resp: GetEmailTemplatesResponse): void => {
          this.addTemplates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateEmailTemplate (req: UpdateEmailTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<UpdateEmailTemplateRequest, UpdateEmailTemplateResponse>(
        API.UPDATE_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: UpdateEmailTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    createAppEmailTemplate (req: CreateAppEmailTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<CreateAppEmailTemplateRequest, CreateAppEmailTemplateResponse>(
        API.CREATE_APP_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: CreateAppEmailTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppEmailTemplates (req: GetAppEmailTemplatesRequest, done: (error: boolean, rows?: Array<Template>) => void) {
      doActionWithError<GetAppEmailTemplatesRequest, GetAppEmailTemplatesResponse>(
        API.GET_APP_EMAILTEMPLATES,
        req,
        req.Message,
        (resp: GetAppEmailTemplatesResponse): void => {
          this.addTemplates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppEmailTemplate (req: UpdateAppEmailTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<UpdateAppEmailTemplateRequest, UpdateAppEmailTemplateResponse>(
        API.UPDATE_APP_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: UpdateAppEmailTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

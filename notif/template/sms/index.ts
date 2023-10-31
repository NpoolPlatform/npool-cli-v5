import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  CreateSMSTemplateRequest,
  CreateSMSTemplateResponse,
  GetSMSTemplatesRequest,
  GetSMSTemplatesResponse,
  Template,
  UpdateSMSTemplateRequest,
  UpdateSMSTemplateResponse,
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  GetAppSMSTemplatesRequest,
  GetAppSMSTemplatesResponse,
  UpdateAppSMSTemplateRequest,
  UpdateAppSMSTemplateResponse,
  DeleteAppSMSTemplatesRequest,
  DeleteAppSMSTemplateResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useSMSTemplateStore = defineStore('sms-templates', {
  state: () => ({
    SMSTemplates: new Map<string, Array<Template>>()
  }),
  getters: {
    templates (): (appID?: string) => Array<Template> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.SMSTemplates.get(appID)?.sort((a, b) => a.UsedFor.localeCompare(b.UsedFor, 'zh-CN')) || []
      }
    },
    addTemplates (): (appID: string | undefined, templates: Array<Template>) => void {
      return (appID: string | undefined, templates: Array<Template>) => {
        appID = formalizeAppID(appID)
        let _templates = this.SMSTemplates.get(appID) as Array<Template>
        if (!_templates) {
          _templates = []
        }
        templates.forEach((channel) => {
          const index = _templates.findIndex((el) => el.ID === channel.ID)
          _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, channel)
        })
        this.SMSTemplates.set(appID, _templates)
      }
    },
    delTemplate (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        const _templates = this.SMSTemplates.get(appID) as Array<Template>
        if (!_templates) {
          return
        }
        const index = _templates.findIndex((el) => el.ID === id)
        _templates.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.SMSTemplates.set(appID, _templates)
      }
    }
  },
  actions: {
    createSMSTemplate (req: CreateSMSTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<CreateSMSTemplateRequest, CreateSMSTemplateResponse>(
        API.CREATE_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: CreateSMSTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getSMSTemplates (req: GetSMSTemplatesRequest, done: (error: boolean, rows?: Array<Template>) => void) {
      doActionWithError<GetSMSTemplatesRequest, GetSMSTemplatesResponse>(
        API.GET_SMSTEMPLATES,
        req,
        req.Message,
        (resp: GetSMSTemplatesResponse): void => {
          this.addTemplates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateSMSTemplate (req: UpdateSMSTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<UpdateSMSTemplateRequest, UpdateSMSTemplateResponse>(
        API.UPDATE_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: UpdateSMSTemplateResponse): void => {
          this.addTemplates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    createAppSMSTemplate (req: CreateAppSMSTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<CreateAppSMSTemplateRequest, CreateAppSMSTemplateResponse>(
        API.CREATE_APP_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: CreateAppSMSTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppSMSTemplates (req: GetAppSMSTemplatesRequest, done: (error: boolean, rows?: Array<Template>) => void) {
      doActionWithError<GetAppSMSTemplatesRequest, GetAppSMSTemplatesResponse>(
        API.GET_APP_SMSTEMPLATES,
        req,
        req.Message,
        (resp: GetAppSMSTemplatesResponse): void => {
          this.addTemplates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppSMSTemplate (req: UpdateAppSMSTemplateRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<UpdateAppSMSTemplateRequest, UpdateAppSMSTemplateResponse>(
        API.UPDATE_APP_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: UpdateAppSMSTemplateResponse): void => {
          this.addTemplates(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteAppSMSTemplate (req: DeleteAppSMSTemplatesRequest, done: (error: boolean, row?: Template) => void) {
      doActionWithError<DeleteAppSMSTemplatesRequest, DeleteAppSMSTemplateResponse>(
        API.DELETE_APP_SMSTEMPLATE,
        req,
        req.Message,
        (resp: DeleteAppSMSTemplateResponse): void => {
          this.delTemplate(req.TargetAppID, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'

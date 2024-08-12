import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Description,
  GetDescriptionsRequest,
  GetDescriptionsResponse,
  AdminGetDescriptionsRequest,
  AdminGetDescriptionsResponse,
  UpdateDescriptionRequest,
  UpdateDescriptionResponse,
  AdminCreateDescriptionRequest,
  AdminCreateDescriptionResponse,
  AdminUpdateDescriptionRequest,
  AdminUpdateDescriptionResponse,
  AdminDeleteDescriptionRequest,
  AdminDeleteDescriptionResponse,
  CreateDescriptionRequest,
  CreateDescriptionResponse,
  DeleteDescriptionRequest,
  DeleteDescriptionResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useDescriptionStore = defineStore('appGoodDescriptions', {
  state: () => ({
    Descriptions: new Map<string, Array<Description>>()
  }),
  getters: {
    description (): (appID: string | undefined, id: string) => Description | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Descriptions.get(appID)?.find((el: Description) => el.EntID === id)
      }
    },
    descriptions (): (appID?: string) => Array<Description> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Descriptions.get(appID) || []
      }
    }
  },
  actions: {
    addDescriptions (appID: string | undefined, descriptions: Array<Description>) {
      appID = formalizeAppID(appID)
      let _descriptions = this.Descriptions.get(appID) as Array<Description>
      if (!_descriptions) {
        _descriptions = []
      }
      descriptions.forEach((description) => {
        if (!description) return
        const index = _descriptions.findIndex((el) => el.EntID === description.EntID)
        _descriptions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, description)
      })
      this.Descriptions.set(appID, _descriptions)
    },
    _deleteDescription (appID: string | undefined, description: Description) {
      appID = formalizeAppID(appID)
      let _descriptions = this.Descriptions.get(appID) as Array<Description>
      if (!_descriptions) {
        _descriptions = []
      }
      const index = _descriptions.findIndex((el) => el.EntID === description.EntID)
      _descriptions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Descriptions.set(appID, _descriptions)
    },
    getDescriptions (req: GetDescriptionsRequest, done?: (error: boolean, rows?: Array<Description>, total?: number) => void) {
      doActionWithError<GetDescriptionsRequest, GetDescriptionsResponse>(
        API.GET_GOOD_DESCRIPTIONS,
        req,
        req.Message,
        (resp: GetDescriptionsResponse): void => {
          this.addDescriptions(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    createDescription (req: CreateDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<CreateDescriptionRequest, CreateDescriptionResponse>(
        API.CREATE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: CreateDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    updateDescription (req: UpdateDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<UpdateDescriptionRequest, UpdateDescriptionResponse>(
        API.UPDATE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: UpdateDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    deleteDescription (req: DeleteDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<DeleteDescriptionRequest, DeleteDescriptionResponse>(
        API.DELETE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: DeleteDescriptionResponse): void => {
          this._deleteDescription(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateDescription (req: AdminCreateDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<AdminCreateDescriptionRequest, AdminCreateDescriptionResponse>(
        API.ADMIN_CREATE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: AdminCreateDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetDescriptions (req: AdminGetDescriptionsRequest, done?: (error: boolean, rows?: Array<Description>, total?: number) => void) {
      doActionWithError<AdminGetDescriptionsRequest, AdminGetDescriptionsResponse>(
        API.ADMIN_GET_GOOD_DESCRIPTIONS,
        req,
        req.Message,
        (resp: AdminGetDescriptionsResponse): void => {
          this.addDescriptions(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateDescription (req: AdminUpdateDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<AdminUpdateDescriptionRequest, AdminUpdateDescriptionResponse>(
        API.ADMIN_UPDATE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: AdminUpdateDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteDescription (req: AdminDeleteDescriptionRequest, done?: (error: boolean, row?: Description) => void) {
      doActionWithError<AdminDeleteDescriptionRequest, AdminDeleteDescriptionResponse>(
        API.ADMIN_DELETE_GOOD_DESCRIPTION,
        req,
        req.Message,
        (resp: AdminDeleteDescriptionResponse): void => {
          this._deleteDescription(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

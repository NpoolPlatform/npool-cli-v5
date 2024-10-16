import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../../request'
import { API } from './const'
import {
  DisplayName,
  GetDisplayNamesRequest,
  GetDisplayNamesResponse,
  AdminGetDisplayNamesRequest,
  AdminGetDisplayNamesResponse,
  UpdateDisplayNameRequest,
  UpdateDisplayNameResponse,
  AdminCreateDisplayNameRequest,
  AdminCreateDisplayNameResponse,
  AdminUpdateDisplayNameRequest,
  AdminUpdateDisplayNameResponse,
  AdminDeleteDisplayNameRequest,
  AdminDeleteDisplayNameResponse,
  CreateDisplayNameRequest,
  CreateDisplayNameResponse,
  DeleteDisplayNameRequest,
  DeleteDisplayNameResponse
} from './types'
import { formalizeAppID } from '../../../../../appuser/app/local'

export const useDisplayNameStore = defineStore('appGoodDisplayNames', {
  state: () => ({
    DisplayNames: new Map<string, Array<DisplayName>>()
  }),
  getters: {
    displayName (): (appID: string | undefined, id: string) => DisplayName | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.DisplayNames.get(appID)?.find((el: DisplayName) => el.EntID === id)
      }
    },
    displayNames (): (appID?: string) => Array<DisplayName> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.DisplayNames.get(appID) || []
      }
    }
  },
  actions: {
    addDisplayNames (appID: string | undefined, displayNames: Array<DisplayName>) {
      appID = formalizeAppID(appID)
      let _displayNames = this.DisplayNames.get(appID) as Array<DisplayName>
      if (!_displayNames) {
        _displayNames = []
      }
      displayNames.forEach((displayName) => {
        if (!displayName) return
        const index = _displayNames.findIndex((el) => el.EntID === displayName.EntID)
        _displayNames.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, displayName)
      })
      this.DisplayNames.set(appID, _displayNames)
    },
    _deleteDisplayName (appID: string | undefined, displayName: DisplayName) {
      appID = formalizeAppID(appID)
      let _displayNames = this.DisplayNames.get(appID) as Array<DisplayName>
      if (!_displayNames) {
        _displayNames = []
      }
      const index = _displayNames.findIndex((el) => el.EntID === displayName.EntID)
      _displayNames.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.DisplayNames.set(appID, _displayNames)
    },
    getDisplayNames (req: GetDisplayNamesRequest, done?: (error: boolean, rows?: Array<DisplayName>, total?: number) => void) {
      doActionWithError<GetDisplayNamesRequest, GetDisplayNamesResponse>(
        API.GET_GOOD_DISPLAY_NAMES,
        req,
        req.Message,
        (resp: GetDisplayNamesResponse): void => {
          this.addDisplayNames(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    createDisplayName (req: CreateDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<CreateDisplayNameRequest, CreateDisplayNameResponse>(
        API.CREATE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: CreateDisplayNameResponse): void => {
          this.addDisplayNames(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    updateDisplayName (req: UpdateDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<UpdateDisplayNameRequest, UpdateDisplayNameResponse>(
        API.UPDATE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: UpdateDisplayNameResponse): void => {
          this.addDisplayNames(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    deleteDisplayName (req: DeleteDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<DeleteDisplayNameRequest, DeleteDisplayNameResponse>(
        API.DELETE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: DeleteDisplayNameResponse): void => {
          this._deleteDisplayName(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateDisplayName (req: AdminCreateDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<AdminCreateDisplayNameRequest, AdminCreateDisplayNameResponse>(
        API.ADMIN_CREATE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: AdminCreateDisplayNameResponse): void => {
          this.addDisplayNames(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetDisplayNames (req: AdminGetDisplayNamesRequest, done?: (error: boolean, rows?: Array<DisplayName>, total?: number) => void) {
      doActionWithError<AdminGetDisplayNamesRequest, AdminGetDisplayNamesResponse>(
        API.ADMIN_GET_GOOD_DISPLAY_NAMES,
        req,
        req.Message,
        (resp: AdminGetDisplayNamesResponse): void => {
          this.addDisplayNames(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateDisplayName (req: AdminUpdateDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<AdminUpdateDisplayNameRequest, AdminUpdateDisplayNameResponse>(
        API.ADMIN_UPDATE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: AdminUpdateDisplayNameResponse): void => {
          this.addDisplayNames(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteDisplayName (req: AdminDeleteDisplayNameRequest, done?: (error: boolean, row?: DisplayName) => void) {
      doActionWithError<AdminDeleteDisplayNameRequest, AdminDeleteDisplayNameResponse>(
        API.ADMIN_DELETE_GOOD_DISPLAY_NAME,
        req,
        req.Message,
        (resp: AdminDeleteDisplayNameResponse): void => {
          this._deleteDisplayName(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

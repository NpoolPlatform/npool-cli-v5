import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../../request'
import { API } from './const'
import {
  DisplayColor,
  GetDisplayColorsRequest,
  GetDisplayColorsResponse,
  AdminGetDisplayColorsRequest,
  AdminGetDisplayColorsResponse,
  UpdateDisplayColorRequest,
  UpdateDisplayColorResponse,
  AdminCreateDisplayColorRequest,
  AdminCreateDisplayColorResponse,
  AdminUpdateDisplayColorRequest,
  AdminUpdateDisplayColorResponse,
  AdminDeleteDisplayColorRequest,
  AdminDeleteDisplayColorResponse,
  CreateDisplayColorRequest,
  CreateDisplayColorResponse,
  DeleteDisplayColorRequest,
  DeleteDisplayColorResponse
} from './types'
import { formalizeAppID } from '../../../../../appuser/app/local'

export const useDisplayColorStore = defineStore('app-good-descriptions', {
  state: () => ({
    DisplayColors: new Map<string, Array<DisplayColor>>()
  }),
  getters: {
    appFee (): (appID: string | undefined, id: string) => DisplayColor | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.DisplayColors.get(appID)?.find((el: DisplayColor) => el.EntID === id)
      }
    },
    goods (): (appID?: string) => Array<DisplayColor> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.DisplayColors.get(appID) || []
      }
    }
  },
  actions: {
    addDisplayColors (appID: string | undefined, goods: Array<DisplayColor>) {
      appID = formalizeAppID(appID)
      let _goods = this.DisplayColors.get(appID) as Array<DisplayColor>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((good) => {
        if (!good) return
        const index = _goods.findIndex((el) => el.EntID === good.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.DisplayColors.set(appID, _goods)
    },
    _deleteDisplayColor (appID: string | undefined, good: DisplayColor) {
      appID = formalizeAppID(appID)
      let _goods = this.DisplayColors.get(appID) as Array<DisplayColor>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.DisplayColors.set(appID, _goods)
    },
    getDisplayColors (req: GetDisplayColorsRequest, done: (error: boolean, rows?: Array<DisplayColor>, total?: number) => void) {
      doActionWithError<GetDisplayColorsRequest, GetDisplayColorsResponse>(
        API.GET_GOOD_DISPLAY_COLORS,
        req,
        req.Message,
        (resp: GetDisplayColorsResponse): void => {
          this.addDisplayColors(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    createDisplayColors (req: CreateDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<CreateDisplayColorRequest, CreateDisplayColorResponse>(
        API.CREATE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: CreateDisplayColorResponse): void => {
          this.addDisplayColors(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateDisplayColor (req: UpdateDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<UpdateDisplayColorRequest, UpdateDisplayColorResponse>(
        API.UPDATE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: UpdateDisplayColorResponse): void => {
          this.addDisplayColors(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteDisplayColor (req: DeleteDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<DeleteDisplayColorRequest, DeleteDisplayColorResponse>(
        API.DELETE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: DeleteDisplayColorResponse): void => {
          this._deleteDisplayColor(undefined, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminCreateDisplayColors (req: AdminCreateDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<AdminCreateDisplayColorRequest, AdminCreateDisplayColorResponse>(
        API.ADMIN_CREATE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: AdminCreateDisplayColorResponse): void => {
          this.addDisplayColors(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminGetDisplayColors (req: AdminGetDisplayColorsRequest, done: (error: boolean, rows?: Array<DisplayColor>, total?: number) => void) {
      doActionWithError<AdminGetDisplayColorsRequest, AdminGetDisplayColorsResponse>(
        API.ADMIN_GET_GOOD_DISPLAY_COLORS,
        req,
        req.Message,
        (resp: AdminGetDisplayColorsResponse): void => {
          this.addDisplayColors(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    adminUpdateDisplayColors (req: AdminUpdateDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<AdminUpdateDisplayColorRequest, AdminUpdateDisplayColorResponse>(
        API.ADMIN_UPDATE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: AdminUpdateDisplayColorResponse): void => {
          this.addDisplayColors(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeleteDisplayColors (req: AdminDeleteDisplayColorRequest, done: (error: boolean, row?: DisplayColor) => void) {
      doActionWithError<AdminDeleteDisplayColorRequest, AdminDeleteDisplayColorResponse>(
        API.ADMIN_DELETE_GOOD_DISPLAY_COLOR,
        req,
        req.Message,
        (resp: AdminDeleteDisplayColorResponse): void => {
          this._deleteDisplayColor(undefined, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'
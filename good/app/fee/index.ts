import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  AppFee,
  GetAppFeeRequest,
  GetAppFeeResponse,
  GetAppFeesRequest,
  GetAppFeesResponse,
  AdminGetAppFeesRequest,
  AdminGetAppFeesResponse,
  UpdateAppFeeRequest,
  UpdateAppFeeResponse,
  AdminCreateAppFeeRequest,
  AdminCreateAppFeeResponse,
  AdminUpdateAppFeeRequest,
  AdminUpdateAppFeeResponse,
  AdminDeleteAppFeeRequest,
  AdminDeleteAppFeeResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppFeeStore = defineStore('app-fees', {
  state: () => ({
    AppFees: new Map<string, Array<AppFee>>()
  }),
  getters: {
    appFee (): (appID: string | undefined, id: string) => AppFee | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppFees.get(appID)?.find((el: AppFee) => el.EntID === id)
      }
    },
    goods (): (appID?: string) => Array<AppFee> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppFees.get(appID) || []
      }
    }
  },
  actions: {
    addAppFees (appID: string | undefined, goods: Array<AppFee>) {
      appID = formalizeAppID(appID)
      let _goods = this.AppFees.get(appID) as Array<AppFee>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((good) => {
        if (!good) return
        const index = _goods.findIndex((el) => el.EntID === good.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.AppFees.set(appID, _goods)
    },
    deleteAppFee (appID: string | undefined, good: AppFee) {
      appID = formalizeAppID(appID)
      let _goods = this.AppFees.get(appID) as Array<AppFee>
      if (!_goods) {
        _goods = []
      }
      const index = _goods.findIndex((el) => el.EntID === good.EntID)
      _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppFees.set(appID, _goods)
    },
    getAppFee (req: GetAppFeeRequest, done?: (error: boolean, row?: AppFee) => void) {
      doActionWithError<GetAppFeeRequest, GetAppFeeResponse>(
        API.GET_APP_FEE,
        req,
        req.Message,
        (resp: GetAppFeeResponse): void => {
          this.addAppFees(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    getAppFees (req: GetAppFeesRequest, done?: (error: boolean, rows?: Array<AppFee>, total?: number) => void) {
      doActionWithError<GetAppFeesRequest, GetAppFeesResponse>(
        API.GET_APP_FEES,
        req,
        req.Message,
        (resp: GetAppFeesResponse): void => {
          this.addAppFees(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    updateAppFee (req: UpdateAppFeeRequest, done?: (error: boolean, row?: AppFee) => void) {
      doActionWithError<UpdateAppFeeRequest, UpdateAppFeeResponse>(
        API.UPDATE_APP_FEE,
        req,
        req.Message,
        (resp: UpdateAppFeeResponse): void => {
          this.addAppFees(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateAppFee (req: AdminCreateAppFeeRequest, done?: (error: boolean, row?: AppFee) => void) {
      doActionWithError<AdminCreateAppFeeRequest, AdminCreateAppFeeResponse>(
        API.ADMIN_CREATE_APP_FEE,
        req,
        req.Message,
        (resp: AdminCreateAppFeeResponse): void => {
          this.addAppFees(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetAppFees (req: AdminGetAppFeesRequest, done?: (error: boolean, rows?: Array<AppFee>, total?: number) => void) {
      doActionWithError<AdminGetAppFeesRequest, AdminGetAppFeesResponse>(
        API.ADMIN_GET_APP_FEES,
        req,
        req.Message,
        (resp: AdminGetAppFeesResponse): void => {
          this.addAppFees(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdateAppFee (req: AdminUpdateAppFeeRequest, done?: (error: boolean, row?: AppFee) => void) {
      doActionWithError<AdminUpdateAppFeeRequest, AdminUpdateAppFeeResponse>(
        API.ADMIN_UPDATE_APP_FEE,
        req,
        req.Message,
        (resp: AdminUpdateAppFeeResponse): void => {
          this.addAppFees(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeleteAppFee (req: AdminDeleteAppFeeRequest, done?: (error: boolean, row?: AppFee) => void) {
      doActionWithError<AdminDeleteAppFeeRequest, AdminDeleteAppFeeResponse>(
        API.ADMIN_DELETE_APP_FEE,
        req,
        req.Message,
        (resp: AdminDeleteAppFeeResponse): void => {
          this.deleteAppFee(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

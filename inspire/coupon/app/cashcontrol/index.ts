import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateCashControlRequest,
  CreateCashControlResponse,
  GetCashControlsRequest,
  GetCashControlsResponse,
  DeleteCashControlRequest,
  DeleteCashControlResponse,
  CashControl,
  GetAppCashControlsRequest,
  GetAppCashControlsResponse
} from './types'
import { doActionWithError } from '../../../../request/action'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useCashControlStore = defineStore('cash-control', {
  state: () => ({
    CashControls: new Map<string, Array<CashControl>>()
  }),
  getters: {
    cashControl (): (appID: string | undefined, id: number | undefined) => CashControl | undefined {
      return (appID: string | undefined, id: number | undefined) => {
        if (!id) return undefined
        appID = formalizeAppID(appID)
        return this.CashControls.get(appID)?.find((el) => el.ID === id)
      }
    },
    addCashControls (): (appID: string | undefined, scopes: Array<CashControl>) => void {
      return (appID: string | undefined, scopes: Array<CashControl>) => {
        appID = formalizeAppID(appID)
        let _cashControl = this.CashControls.get(appID) as Array<CashControl>
        if (!_cashControl) {
          _cashControl = []
        }
        scopes.forEach((coupon) => {
          const index = _cashControl.findIndex((el) => el.ID === coupon.ID)
          _cashControl.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coupon)
        })
        this.CashControls.set(appID, _cashControl)
      }
    },
    delCashControl (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _cashControl = this.CashControls.get(appID)
        if (!_cashControl) {
          _cashControl = []
        }
        const index = _cashControl.findIndex((el) => el.ID === id)
        _cashControl.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.CashControls.set(appID, _cashControl)
      }
    },
    cashcontrols (): (appID?: string) => Array<CashControl> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.CashControls.get(appID)?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    getCashControls (req: GetCashControlsRequest, done: (error: boolean, rows?: Array<CashControl>) => void) {
      doActionWithError<GetCashControlsRequest, GetCashControlsResponse>(
        API.GET_CASHCONTROLS,
        req,
        req.Message,
        (resp: GetCashControlsResponse): void => {
          this.addCashControls(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createCashControl (req: CreateCashControlRequest, done: (error: boolean, row?: CashControl) => void) {
      doActionWithError<CreateCashControlRequest, CreateCashControlResponse>(
        API.CREATE_CASHCONTROL,
        req,
        req.Message,
        (resp: CreateCashControlResponse): void => {
          this.addCashControls(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteCashControl (req: DeleteCashControlRequest, done: (error: boolean, row?: CashControl) => void) {
      doActionWithError<DeleteCashControlRequest, DeleteCashControlResponse>(
        API.DELETE_CASHCONTROL,
        req,
        req.Message,
        (resp: DeleteCashControlResponse): void => {
          this.delCashControl(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppCashControls (req: GetAppCashControlsRequest, done: (error: boolean, rows?: Array<CashControl>) => void) {
      doActionWithError<GetAppCashControlsRequest, GetAppCashControlsResponse>(
        API.GET_APP_CASHCONTROLS,
        req,
        req.Message,
        (resp: GetAppCashControlsResponse): void => {
          this.addCashControls(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

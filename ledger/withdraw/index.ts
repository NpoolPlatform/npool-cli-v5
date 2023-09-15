import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  Withdraw,
  CreateWithdrawRequest,
  CreateWithdrawResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse,
  GetAppWithdrawsRequest,
  GetAppWithdrawsResponse,
  GetNAppWithdrawsRequest,
  GetNAppWithdrawsResponse
} from './types'
import { formalizeAppID } from '../../appuser/app'

export const useWithdrawStore = defineStore('withdraws', {
  state: () => ({
    Withdraws: new Map<string, Array<Withdraw>>()
  }),
  getters: {
    withdraws (): (appID: string | undefined, userID: string | undefined) => Array<Withdraw> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Withdraws.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        })?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    addWithdraws (): (appID: string | undefined, withdraws: Array<Withdraw>) => void {
      return (appID: string | undefined, withdraws: Array<Withdraw>) => {
        appID = formalizeAppID(appID)
        let _withdraws = this.Withdraws.get(appID) as Array<Withdraw>
        if (!_withdraws) {
          _withdraws = []
        }
        withdraws.forEach((withdraw) => {
          const index = _withdraws.findIndex((el) => el.ID === withdraw.ID)
          _withdraws.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, withdraw)
        })
        this.Withdraws.set(appID, _withdraws)
      }
    }
  },
  actions: {
    getWithdraws (req: GetWithdrawsRequest, done: (error: boolean, rows: Array<Withdraw>) => void) {
      doActionWithError<GetWithdrawsRequest, GetWithdrawsResponse>(
        API.GET_WITHDRAWS,
        req,
        req.Message,
        (resp: GetWithdrawsResponse): void => {
          this.addWithdraws(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Withdraw>)
        }
      )
    },
    createWithdraw (req: CreateWithdrawRequest, done: (error: boolean, row: Withdraw) => void) {
      doActionWithError<CreateWithdrawRequest, CreateWithdrawResponse>(
        API.CREATE_WITHDRAW,
        req,
        req.Message,
        (resp: CreateWithdrawResponse): void => {
          this.addWithdraws(undefined, [resp.Info])
          done(false, resp.Info)
        },
        () => {
          done(true, {} as Withdraw)
        }
      )
    },

    getAppWithdraws (req: GetAppWithdrawsRequest, done: (error: boolean, rows: Array<Withdraw>) => void) {
      doActionWithError<GetAppWithdrawsRequest, GetAppWithdrawsResponse>(
        API.GET_APP_WITHDRAWS,
        req,
        req.Message,
        (resp: GetAppWithdrawsResponse): void => {
          this.addWithdraws(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Withdraw>)
        }
      )
    },

    getNAppWithdraws (req: GetNAppWithdrawsRequest, done: (error: boolean, rows?: Array<Withdraw>) => void) {
      doActionWithError<GetNAppWithdrawsRequest, GetNAppWithdrawsResponse>(
        API.GET_N_APP_WITHDRAWS,
        req,
        req.Message,
        (resp: GetNAppWithdrawsResponse): void => {
          this.addWithdraws(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

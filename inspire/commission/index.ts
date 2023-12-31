import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateCommissionRequest,
  UpdateCommissionResponse,
  GetAppCommissionsRequest,
  GetAppCommissionsResponse,
  CreateCommissionRequest,
  CreateCommissionResponse,
  CreateUserCommissionRequest,
  CreateUserCommissionResponse,
  CloneCommissionsRequest,
  CloneCommissionsResponse,
  Commission,
  CloneAppCommissionsRequest,
  CloneAppCommissionsResponse,
  GetCommissionHistoriesRequest,
  GetCommissionHistoriesResponse
} from './types'
import { doActionWithError } from '../../request/action'
import { formalizeAppID } from '../../appuser/app/local'

export const useCommissionStore = defineStore('commissions', {
  state: () => ({
    Commissions: new Map<string, Array<Commission>>()
  }),
  getters: {
    commissions (): (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, current?: boolean) => Array<Commission> {
      return (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, current?: boolean) => {
        appID = formalizeAppID(appID)
        return this.Commissions.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          if (current) ok &&= el.EndAt === 0
          return ok
        })?.sort((a, b) => {
          if (a.GoodName !== b.GoodName) return a.GoodName.localeCompare(b.GoodName)
          return a.StartAt < b.StartAt ? 1 : -1
        }) || []
      }
    }
  },
  actions: {
    addCommissions (appID: string | undefined, commissions: Array<Commission>) {
      appID = formalizeAppID(appID)
      let _commissions = this.Commissions.get(appID) as Array<Commission>
      if (!_commissions) {
        _commissions = []
      }
      commissions.forEach((commission) => {
        const index = _commissions.findIndex((el) => el.ID === commission.ID)
        _commissions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, commission)
      })
      this.Commissions.set(appID, _commissions)
    },
    getAppCommissions (req: GetAppCommissionsRequest, done: (error: boolean, rows?: Array<Commission>) => void) {
      doActionWithError<GetAppCommissionsRequest, GetAppCommissionsResponse>(
        API.GET_APP_COMMISSIONS,
        req,
        req.Message,
        (resp: GetAppCommissionsResponse): void => {
          this.addCommissions(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateCommission (req: UpdateCommissionRequest, done: (error: boolean, row?: Commission) => void) {
      doActionWithError<UpdateCommissionRequest, UpdateCommissionResponse>(
        API.UPDATE_COMMISSION,
        req,
        req.Message,
        (resp: UpdateCommissionResponse): void => {
          this.addCommissions(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createCommission (req: CreateCommissionRequest, done: (error: boolean, row?: Commission) => void) {
      doActionWithError<CreateCommissionRequest, CreateCommissionResponse>(
        API.CREATE_COMMISSION,
        req,
        req.Message,
        (resp: CreateCommissionResponse): void => {
          this.addCommissions(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createUserCommission (req: CreateUserCommissionRequest, done: (error: boolean, row?: Commission) => void) {
      doActionWithError<CreateUserCommissionRequest, CreateUserCommissionResponse>(
        API.CREATE_USER_COMMISSION,
        req,
        req.Message,
        (resp: CreateUserCommissionResponse): void => {
          this.addCommissions(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    cloneCommissions (req: CloneCommissionsRequest, done: (error: boolean) => void) {
      doActionWithError<CloneCommissionsRequest, CloneCommissionsResponse>(
        API.CLONE_COMMISSIONS,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        }
      )
    },
    cloneAppCommissions (req: CloneAppCommissionsRequest, done: (error: boolean) => void) {
      doActionWithError<CloneAppCommissionsRequest, CloneAppCommissionsResponse>(
        API.CLONE_APP_COMMISSIONS,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        }
      )
    },
    getCommissionHistories (req: GetCommissionHistoriesRequest, done: (error: boolean, rows?: Array<Commission>) => void) {
      doActionWithError<GetCommissionHistoriesRequest, GetCommissionHistoriesResponse>(
        API.GET_COMMISSION_HISTORIES,
        req,
        req.Message,
        (resp: GetCommissionHistoriesResponse): void => {
          this.addCommissions(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

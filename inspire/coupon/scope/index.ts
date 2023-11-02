import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateScopeRequest,
  CreateScopeResponse,
  AppGoodScope,
  GetScopesRequest,
  GetScopesResponse,
  DeleteScopeRequest,
  DeleteScopeResponse
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useScopeStore = defineStore('coupon-scope', {
  state: () => ({
    Scopes: new Map<string, Array<AppGoodScope>>()
  }),
  getters: {
    addScopes (): (appID: string | undefined, scopes: Array<AppGoodScope>) => void {
      return (appID: string | undefined, scopes: Array<AppGoodScope>) => {
        appID = formalizeAppID(appID)
        let _scopes = this.Scopes.get(appID) as Array<AppGoodScope>
        if (!_scopes) {
          _scopes = []
        }
        scopes.forEach((coupon) => {
          const index = _scopes.findIndex((el) => el.ID === coupon.ID)
          _scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coupon)
        })
        this.Scopes.set(appID, _scopes)
      }
    },
    delScope (): (appID: string | undefined, scopeID: string) => void {
      return (appID: string | undefined, scopeID: string) => {
        appID = formalizeAppID(appID)
        let _scopes = this.Scopes.get(appID)
        if (!_scopes) {
          _scopes = []
        }
        const index = _scopes.findIndex((el) => el.ID === scopeID)
        _scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        this.Scopes.set(appID, _scopes)
      }
    },
    scopes (): (appID?: string) => Array<AppGoodScope> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Scopes.get(appID)?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    getScopes (req: GetScopesRequest, done: (error: boolean, rows?: Array<AppGoodScope>) => void) {
      doActionWithError<GetScopesRequest, GetScopesResponse>(
        API.GET_SCOPES,
        req,
        req.Message,
        (resp: GetScopesResponse): void => {
          this.addScopes(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createScope (req: CreateScopeRequest, done: (error: boolean, row?: AppGoodScope) => void) {
      doActionWithError<CreateScopeRequest, CreateScopeResponse>(
        API.CREATE_SCOPE,
        req,
        req.Message,
        (resp: CreateScopeResponse): void => {
          this.addScopes(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteScope (req: DeleteScopeRequest, done: (error: boolean, row?: AppGoodScope) => void) {
      doActionWithError<DeleteScopeRequest, DeleteScopeResponse>(
        API.DELETE_SCOPE,
        req,
        req.Message,
        (resp: DeleteScopeResponse): void => {
          this.delScope(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

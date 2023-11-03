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

export const useScopeStore = defineStore('scope-scope', {
  state: () => ({
    Scopes: [] as Array<AppGoodScope>
  }),
  getters: {
    scope (): (id: string) => AppGoodScope | undefined {
      return (id: string) => {
        return this.Scopes.find((el) => el.ID === id)
      }
    },
    addScopes (): (scopes: Array<AppGoodScope>) => void {
      return (scopes: Array<AppGoodScope>) => {
        scopes.forEach((scope) => {
          const index = this.Scopes.findIndex((el) => el.ID === scope.ID)
          this.Scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, scope)
        })
      }
    },
    delScope (): (scopeID: string) => void {
      return (scopeID: string) => {
        const index = this.Scopes.findIndex((el) => el.ID === scopeID)
        this.Scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      }
    },
    scopes (): () => Array<AppGoodScope> {
      return () => {
        return this.Scopes.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
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
          this.addScopes(resp.Infos)
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
          this.addScopes([resp.Info])
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
          this.delScope(req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

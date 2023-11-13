import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateScopeRequest,
  CreateScopeResponse,
  Scope,
  GetScopesRequest,
  GetScopesResponse,
  DeleteScopeRequest,
  DeleteScopeResponse
} from './types'
import { doActionWithError } from '../../../request/action'

export const useScopeStore = defineStore('scope-scope', {
  state: () => ({
    Scopes: [] as Array<Scope>
  }),
  getters: {
    scope (): (id: number) => Scope | undefined {
      return (id: number) => {
        return this.Scopes.find((el) => el.ID === id)
      }
    },
    addScopes (): (scopes: Array<Scope>) => void {
      return (scopes: Array<Scope>) => {
        scopes.forEach((scope) => {
          const index = this.Scopes.findIndex((el) => el.ID === scope.ID)
          this.Scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, scope)
        })
      }
    },
    delScope (): (id: number) => void {
      return (id: number) => {
        const index = this.Scopes.findIndex((el) => el.ID === id)
        this.Scopes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      }
    },
    scopes (): () => Array<Scope> {
      return () => {
        return this.Scopes.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    }
  },
  actions: {
    getScopes (req: GetScopesRequest, done: (error: boolean, rows?: Array<Scope>) => void) {
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
    createScope (req: CreateScopeRequest, done: (error: boolean, row?: Scope) => void) {
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
    deleteScope (req: DeleteScopeRequest, done: (error: boolean, row?: Scope) => void) {
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

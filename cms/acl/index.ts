import { defineStore } from 'pinia'
import { API } from './const'
import {
  ACL,
  GetACLsRequest,
  GetACLsResponse,
  CreateACLRequest,
  CreateACLResponse,
  DeleteACLRequest,
  DeleteACLResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useACLStore = defineStore('acls', {
  state: () => ({
    ACLs: new Map<string, Array<ACL>>(),
    ArticleACLs: new Map<string, Map<string, Array<ACL>>>()
  }),
  getters: {
    acl (): (appID: string | undefined, id: number) => ACL | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.ACLs.get(appID)?.find((el) => el.ID === id)
      }
    },
    getACLByEntID (): (appID: string | undefined, entID: string) => ACL | undefined {
      return (appID: string | undefined, entID: string) => {
        appID = formalizeAppID(appID)
        return this.ACLs.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    acls (): (appID: string | undefined) => Array<ACL> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.ACLs.get(appID) || []
      }
    },
    articleACLs (): (appID: string | undefined, articleKey: string) => Array<ACL> {
      return (appID: string | undefined, articleKey: string) => {
        appID = formalizeAppID(appID)
        const articleACLs = this.ArticleACLs.get(appID)
        return articleACLs?.get(articleKey) || []
      }
    },
    addArticleACLs (): (appID: string | undefined, articleKey: string, acls: Array<ACL>) => void {
      return (appID: string | undefined, articleKey: string, acls: Array<ACL>) => {
        appID = formalizeAppID(appID)
        let articleACLs = this.ArticleACLs.get(appID)
        if (!articleACLs) {
          articleACLs = new Map<string, Array<ACL>>()
        }
        let _acls = articleACLs.get(articleKey) as Array<ACL>
        if (!_acls) {
          _acls = []
        }
        _acls.push(...acls)
        articleACLs.set(articleKey, _acls)
        this.ArticleACLs.set(appID, articleACLs)
      }
    },
    delArticleACL (): (appID: string | undefined, articleKey: string, id: number) => void {
      return (appID: string | undefined, articleKey: string, id: number) => {
        appID = formalizeAppID(appID)
        const articleACLs = this.ArticleACLs.get(appID)
        if (!articleACLs) {
          return
        }
        const _acls = articleACLs.get(articleKey) as Array<ACL>
        if (!_acls) {
          return
        }
        const index = _acls.findIndex((el) => el.ID === id)
        _acls.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
        articleACLs.set(articleKey, _acls)
        this.ArticleACLs.set(appID, articleACLs)
      }
    },
    addACLs (): (appID: string | undefined, acls: Array<ACL>) => void {
      return (appID: string | undefined, acls: Array<ACL>) => {
        appID = formalizeAppID(appID)
        let _acls = this.ACLs.get(appID) as Array<ACL>
        if (!_acls) {
          _acls = []
        }
        acls.forEach((acl) => {
          const index = _acls.findIndex((el) => el.ID === acl.ID)
          _acls.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, acl)
        })
        this.ACLs.set(appID, _acls)
      }
    },
    delACL (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _acls = this.ACLs.get(appID) as Array<ACL>
        if (!_acls) {
          _acls = []
        }
        const index = _acls.findIndex((el) => el.ID === id)
        _acls.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.ACLs.set(appID, _acls)
      }
    }
  },
  actions: {
    getACLs (req: GetACLsRequest, done: (error: boolean, rows: Array<ACL>) => void) {
      doActionWithError<GetACLsRequest, GetACLsResponse>(
        API.GET_ACLS,
        req,
        req.Message,
        (resp: GetACLsResponse): void => {
          this.addACLs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<ACL>)
        }
      )
    },
    getArticleACLs (req: GetACLsRequest, done: (error: boolean, rows?: Array<ACL>) => void) {
      doActionWithError<GetACLsRequest, GetACLsResponse>(
        API.GET_ACLS,
        req,
        req.Message,
        (resp: GetACLsResponse): void => {
          this.addArticleACLs(undefined, req.ArticleKey, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createACL (req: CreateACLRequest, done: (error: boolean, row: ACL) => void) {
      doActionWithError<CreateACLRequest, CreateACLResponse>(
        API.CREATE_ACL,
        req,
        req.Message,
        (resp: CreateACLResponse): void => {
          this.addACLs(undefined, [resp.Info])
          this.addArticleACLs(undefined, req.ArticleKey, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as ACL)
        }
      )
    },
    deleteACL (req: DeleteACLRequest, done: (error: boolean, row: ACL) => void) {
      doActionWithError<DeleteACLRequest, DeleteACLResponse>(
        API.DELETE_ACL,
        req,
        req.Message,
        (resp: DeleteACLResponse): void => {
          this.delACL(undefined, req.ID)
          this.delArticleACL(undefined, resp.Info.ArticleKey, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as ACL)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

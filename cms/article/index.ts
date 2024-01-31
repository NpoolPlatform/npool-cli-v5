import { defineStore } from 'pinia'
import { API } from './const'
import {
  Article,
  GetArticleRequest,
  GetArticleResponse,
  GetArticlesRequest,
  GetArticlesResponse,
  GetArticleContentRequest,
  GetArticleContentResponse,
  GetContentRequest,
  GetContentResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleRequest,
  DeleteArticleResponse,
  GetContentListRequest,
  GetContentListResponse
} from './types'
import { doActionWithError, doGetWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    Articles: new Map<string, Array<Article>>()
  }),
  getters: {
    article (): (appID: string | undefined, id: number) => Article | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Articles.get(appID)?.find((el) => el.ID === id)
      }
    },
    getArticleByEntID (): (appID: string | undefined, entID: string) => Article | undefined {
      return (appID: string | undefined, entID: string) => {
        appID = formalizeAppID(appID)
        return this.Articles.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    articles (): (appID: string | undefined) => Array<Article> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Articles.get(appID) || []
      }
    },
    articleContent (): (appID: string | undefined, contentUrl: string) => string {
      return (appID: string | undefined, contentUrl: string) => {
        appID = formalizeAppID(appID)
        return this.Articles.get(appID)?.find((el) => el.ContentURL === contentUrl)?.Content || ''
      }
    }
  },
  actions: {
    addArticles (appID: string | undefined, articles: Array<Article>) {
      appID = formalizeAppID(appID)
      let _articles = this.Articles.get(appID) as Array<Article>
      if (!_articles) {
        _articles = []
      }
      articles.forEach((article) => {
        const index = _articles.findIndex((el) => el.ID === article.ID)
        _articles.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, article)
      })
      this.Articles.set(appID, _articles)
    },
    delArticle (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _articles = this.Articles.get(appID) as Array<Article>
      if (!_articles) {
        _articles = []
      }
      const index = _articles.findIndex((el) => el.ID === id)
      _articles.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
      this.Articles.set(appID, _articles)
    },
    getArticle (req: GetArticleRequest, done: (error: boolean, rows: Article) => void) {
      doActionWithError<GetArticleRequest, GetArticleResponse>(
        API.GET_ARTICLE,
        req,
        req.Message,
        (resp: GetArticleResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as Article)
        }
      )
    },
    getArticles (req: GetArticlesRequest, done: (error: boolean, rows: Array<Article>) => void) {
      doActionWithError<GetArticlesRequest, GetArticlesResponse>(
        API.GET_ARTICLES,
        req,
        req.Message,
        (resp: GetArticlesResponse): void => {
          this.addArticles(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Article>)
        }
      )
    },
    getArticleList (req: GetArticlesRequest, done: (error: boolean, rows: Array<Article>) => void) {
      doActionWithError<GetArticlesRequest, GetArticlesResponse>(
        API.GET_ARTICLES,
        req,
        req.Message,
        (resp: GetArticlesResponse): void => {
          this.addArticles(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Article>)
        }
      )
    },
    getArticleContent (req: GetArticleContentRequest, done: (error: boolean, row: string) => void) {
      doActionWithError<GetArticleContentRequest, GetArticleContentResponse>(
        API.GET_ARTICLE_CONTENT,
        req,
        req.Message,
        (resp: GetArticleContentResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, '')
        }
      )
    },
    getContent (req: GetContentRequest, done?: (error: boolean, row?: string) => void) {
      doGetWithError<GetContentRequest, GetContentResponse>(
        API.GET_CONTENT + req.ContentURL,
        req,
        req.Message,
        (resp: GetContentResponse): void => {
          done?.(false, String(resp))
        }, () => {
          done?.(true)
        }
      )
    },
    updateArticle (req: UpdateArticleRequest, done: (error: boolean, row: Article) => void) {
      doActionWithError<UpdateArticleRequest, UpdateArticleResponse>(
        API.UPDATE_ARTICLE,
        req,
        req.Message,
        (resp: UpdateArticleResponse): void => {
          if (req.ID !== resp.Info.ID) {
            const oldArticle = this.article(undefined, req.ID)
            if (oldArticle) {
              oldArticle.Latest = false
            }
            this.delArticle(undefined, req.ID)
            this.addArticles(undefined, oldArticle ? [oldArticle] : [])
          }
          this.addArticles(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Article)
        }
      )
    },
    createArticle (req: CreateArticleRequest, done: (error: boolean, row: Article) => void) {
      doActionWithError<CreateArticleRequest, CreateArticleResponse>(
        API.CREATE_ARTICLE,
        req,
        req.Message,
        (resp: CreateArticleResponse): void => {
          this.addArticles(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Article)
        }
      )
    },
    deleteArticle (req: DeleteArticleRequest, done: (error: boolean, row: Article) => void) {
      doActionWithError<DeleteArticleRequest, DeleteArticleResponse>(
        API.DELETE_ARTICLE,
        req,
        req.Message,
        (resp: DeleteArticleResponse): void => {
          this.delArticle(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Article)
        }
      )
    },
    getContentList (req: GetContentListRequest, done: (error: boolean, rows: Article[]) => void) {
      doActionWithError<GetContentListRequest, GetContentListResponse>(
        API.GET_CONTENT_LIST,
        req,
        req.Message,
        (resp: GetContentListResponse): void => {
          this.addArticles(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    }
  }
})

export * from './const'
export * from './types'

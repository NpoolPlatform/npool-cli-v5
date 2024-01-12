import { BaseRequest } from '../../request'

export interface Article {
  ID: number
  EntID: string
  AppID: string
  ISO: string
  TargetLangID: string
  CategoryID: string
  CategoryName: string
  AuthorID: string
  ArticleKey: string
  Title: string
  Subtitle: string
  Digest: string
  Status: string
  Version: string
  ContentURL: string
  Latest: boolean
  Content: string
  ACLEnabled: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface ArticleReq {
  EntID: string
  TargetLangID: string
  CategoryID: string
  Title: string
  Subtitle: string
  Digest: string
  Status: string
}

export interface CreateArticleRequest extends BaseRequest{
  TargetLangID: string
  CategoryID: string
  Title: string
  Subtitle: string
  Digest: string
  Status: string
  Content: string
  ACLEnabled: boolean
}

export interface CreateArticleResponse {
  Info: Article
}

export interface GetArticlesRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetArticlesResponse {
  Infos: Article[]
  Total: number
}

export interface UpdateArticleRequest extends BaseRequest{
  ID: number
  EntID: string
  CategoryID: string
  Title: string
  Subtitle: string
  Digest: string
  Status: string
  UpdateContent: boolean
  Content: string
  ACLEnabled: boolean
}

export interface UpdateArticleResponse {
  Info: Article
}

export interface DeleteArticleRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteArticleResponse {
  Info: Article
}

export interface GetArticleContentRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface GetArticleContentResponse {
  Info: string
}

export interface GetContentRequest extends BaseRequest{
  ContentURL: string
}

export interface GetContentResponse {
  Info: string
}

export interface GetArticleListRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetArticleListResponse {
  Infos: Article[]
  Total: number
}

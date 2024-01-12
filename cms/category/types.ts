import { BaseRequest } from '../../request'

export interface Category {
  ID: number
  EntID: string
  AppID: string
  ParentName: string
  ParentID: string
  Name: string
  Slug: string
  FullSlug: string
  Enabled: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CategoryReq {
  EntID: string
  ParentID: string
  Name: string
  Slug: string
  Enabled: boolean
}

export interface CreateCategoryRequest extends BaseRequest{
  ParentID: string
  Name: string
  Slug: string
  Enabled: boolean
}

export interface CreateCategoryResponse {
  Info: Category
}

export interface GetCategoriesRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetCategoriesResponse {
  Infos: Category[]
  Total: number
}

export interface UpdateCategoryRequest extends BaseRequest{
  ID: number
  EntID: string
  ParentID: string
  Name: string
  Slug: string
  Enabled: boolean
}

export interface UpdateCategoryResponse {
  Info: Category
}

export interface DeleteCategoryRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteCategoryResponse {
  Info: Category
}

export interface GetCategoryListRequest extends BaseRequest{
  AppID?: string
}

export interface GetCategoryListResponse {
  Infos: Category[]
  Total: number
}

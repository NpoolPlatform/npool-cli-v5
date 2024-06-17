import { BaseRequest } from '../../../../request'
import { GoodType } from '../../../base'

export interface PosterInfo {
  AppGoodID: string
  Poster: string
  Index: number
}

export interface Poster extends PosterInfo {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  GoodID: string
  GoodName: string
  GoodType: GoodType
  AppGoodName: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CreatePosterRequest extends BaseRequest {
  AppGoodID: string
  Poster: string
  Index?: number
}

export interface CreatePosterResponse {
  Info: Poster
}

export interface UpdatePosterRequest extends BaseRequest {
  ID: number
  EntID: string
  Poster?: string
  Index?: number
}

export interface UpdatePosterResponse {
  Info: Poster
}

export interface GetPostersRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetPostersResponse {
  Infos: Poster[]
  Total: number
}

export interface DeletePosterRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeletePosterResponse {
  Info: Poster
}

export interface AdminCreatePosterRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  Poster: string
  Index?: number
}

export interface AdminCreatePosterResponse {
  Info: Poster
}

export interface AdminUpdatePosterRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Poster?: string
  Index?: number
}

export interface AdminUpdatePosterResponse {
  Info: Poster
}

export interface AdminGetPostersRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetPostersResponse {
  Infos: Poster[]
  Total: number
}

export interface AdminDeletePosterRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeletePosterResponse {
  Info: Poster
}

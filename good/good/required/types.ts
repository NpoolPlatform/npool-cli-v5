import { BaseRequest } from '../../../request'

export interface Required {
  ID: number
  EntID: string
  MainGoodID: string
  MainGoodName: string
  RequiredGoodID: string
  RequiredGoodName: string
  Must: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateRequiredRequest extends BaseRequest {
  MainGoodID: string
  RequiredGoodID: string
  Must: boolean
}

export interface CreateRequiredResponse {
  Info: Required
}

export interface UpdateRequiredRequest extends BaseRequest {
  ID: number
  EntID: string
  Must: boolean
}

export interface UpdateRequiredResponse {
  Info: Required
}

export interface GetRequiredsRequest extends BaseRequest {
  GoodID?: string
  Offset: number
  Limit: number
}

export interface GetRequiredsResponse {
  Infos: Required[]
  Total: number
}

export interface DeleteRequiredRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteRequiredResponse {
  Info: Required
}

import { BaseRequest } from '../../request'

export interface ACL {
  ID: number
  EntID: string
  AppID: string
  RoleID: string
  Role: string
  ArticleKey: string
  CreatedAt: number
  UpdatedAt: number
}

export interface ACLReq {
  EntID: string
  RoleID: string
  ArticleKey: string
}

export interface CreateACLRequest extends BaseRequest{
  RoleID: string
  ArticleKey: string
}

export interface CreateACLResponse {
  Info: ACL
}

export interface GetACLsRequest extends BaseRequest{
  Offset: number
  Limit: number
  ArticleKey: string
}

export interface GetACLsResponse {
  Infos: ACL[]
  Total: number
}

export interface DeleteACLRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteACLResponse {
  Info: ACL
}

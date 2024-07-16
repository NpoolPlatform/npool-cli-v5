import { BaseRequest } from '../../request'
import { MiningpoolType } from '../base'

export interface RootUser {
  ID: number
  EntID: string
  PoolID: string
  Name: string
  Email: string
  AuthToken: string
  Authed: boolean
  Remark: string
  MiningpoolType: MiningpoolType
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateRootUserRequest extends BaseRequest{
  PoolID: string
  Name: string
  Email: string
  AuthToken: string
  Remark: string
}

export interface AdminCreateRootUserResponse {
  Info: RootUser
}

export interface AdminGetRootUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetRootUsersResponse {
  Infos: RootUser[]
  Total: number
}

export interface AdminUpdateRootUserRequest extends BaseRequest{
  ID: number
  EntID: string
  Name: string
  Email: string
  AuthToken: string
  Remark: string
}

export interface AdminUpdateRootUserResponse {
  Info: RootUser
}

export interface AdminDeleteRootUserRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface AdminDeleteRootUserResponse {
  Info: RootUser
}

import { BaseRequest } from '../../request'
import { App } from '../app'
import { Auth } from '../authing'
import { Role } from '../role'
import { User } from '../user'

export type CreateAdminAppsRequest = BaseRequest

export interface CreateAdminAppsResponse {
  Infos: Array<App>
}

export type CreateGenesisRolesRequest = BaseRequest

export interface CreateGenesisRolesResponse {
  Infos: Array<Role>
}

export interface CreateGenesisUserRequest extends BaseRequest {
  TargetAppID: string
  EmailAddress: string
  PasswordHash: string
}

export interface CreateGenesisUserResponse {
  Info: User
}

export type GetAdminAppsRequest = BaseRequest

export interface GetAdminAppsResponse {
  Infos: Array<App>
}

export type AuthorizeGenesisRequest = BaseRequest

export interface AuthorizeGenesisResponse {
  Infos: Array<Auth>
  Total: number
}

export type GetGenesisRolesRequest = BaseRequest

export interface GetGenesisRolesResponse {
  Infos: Array<Role>
  Total: number
}

export type GetGenesisUsersRequest = BaseRequest

export interface GetGenesisUsersResponse {
  Infos: Array<User>
  Total: number
}

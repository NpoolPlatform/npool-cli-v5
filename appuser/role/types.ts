import { BaseRequest } from '../../request'

export interface Role {
  ID: number
  EntID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
  AppID: string
  AppName: string
  AppLogo: string
  CreatedAt: number
}

export interface AppRoleUser {
  ID: number
  EntID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
  AppID: string
  AppName: string
  AppLogo: string
  CreatedAt: number
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Genesis: boolean
}

export interface RoleUser {
  ID: number
  EntID: string
  AppID: string
  RoleID: string
  UserID: string
}

export interface GetRolesRequest extends BaseRequest{
  Offset: number
  Limit: number
}
export interface GetRolesResponse {
  Infos: Array<Role>
  Total: number
}

export interface GetRoleUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
  RoleID: string
}

export interface GetRoleUsersResponse {
  Infos: Array<AppRoleUser>
  Total: number
}

export interface CreateRoleUserRequest extends BaseRequest{
  TargetUserID: string
  AppID?: string
  RoleID: string
}

export interface CreateRoleUserResponse {
  Info: AppRoleUser
}

export interface DeleteRoleUserRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetUserID: string
}

export interface DeleteRoleUserResponse {
  Info: RoleUser
}

export interface UpdateRoleRequest extends BaseRequest {
  ID: number
  EntID: string
  AppID: string
  RoleName?: string
  Default?: boolean
  Description?: string
}

export interface UpdateRoleResponse {
  Info: Role
}

export interface UpdateAppRoleRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  RoleName?: string
  Default?: boolean
  Description?: string
}

export interface UpdateAppRoleResponse {
  Info: Role
}

export interface GetAppRolesRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppRolesResponse {
  Infos: Array<Role>
}

export interface ChurchRoleState {
  Roles: Map<string, Array<Role>>
  AppRoleUsers: Map<string, Array<AppRoleUser>>
}

export interface CreateAppRoleRequest extends BaseRequest {
  TargetAppID: string
  RoleName: string
  Default?: boolean
  Description?: string
}

export interface CreateAppRoleResponse {
  Info: Role
}

export interface GetAppRoleUsersRequest extends BaseRequest {
  TargetAppID: string
  RoleID: string
  Offset: number
  Limit: number
}

export interface GetAppRoleUsersResponse {
  Infos: Array<AppRoleUser>
}

export interface CreateAppRoleUserRequest extends BaseRequest{
  TargetAppID: string
  TargetUserID: string
  RoleID: string
}

export interface CreateAppRoleUserResponse{
  Info: AppRoleUser
}

export interface DeleteAppRoleUserRequest extends BaseRequest{
  TargetAppID: string
  TargetUserID: string
}

export interface DeleteAppRoleUserResponse{
  Info: RoleUser
}

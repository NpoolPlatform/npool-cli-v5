import { BaseRequest } from '../../../../../request'
import { GoodType } from '../../../../base'

export interface DisplayNameInfo {
  AppGoodID: string
  Name: string
  Index: number
}

export interface DisplayName extends DisplayNameInfo {
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

export interface CreateDisplayNameRequest extends BaseRequest {
  AppGoodID: string
  Name: string
  Index?: number
}

export interface CreateDisplayNameResponse {
  Info: DisplayName
}

export interface UpdateDisplayNameRequest extends BaseRequest {
  ID: number
  EntID: string
  Name?: string
  Index?: number
}

export interface UpdateDisplayNameResponse {
  Info: DisplayName
}

export interface GetDisplayNamesRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetDisplayNamesResponse {
  Infos: DisplayName[]
  Total: number
}

export interface DeleteDisplayNameRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteDisplayNameResponse {
  Info: DisplayName
}

export interface AdminCreateDisplayNameRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  Name: string
  Index?: number
}

export interface AdminCreateDisplayNameResponse {
  Info: DisplayName
}

export interface AdminUpdateDisplayNameRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Name?: string
  Index?: number
}

export interface AdminUpdateDisplayNameResponse {
  Info: DisplayName
}

export interface AdminGetDisplayNamesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetDisplayNamesResponse {
  Infos: DisplayName[]
  Total: number
}

export interface AdminDeleteDisplayNameRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteDisplayNameResponse {
  Info: DisplayName
}

import { BaseRequest } from '../../../../request'
import { GoodType } from '../../../base'

export interface DescriptionInfo {
  AppGoodID: string
  Description: string
  Index: number
}

export interface Description extends DescriptionInfo {
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

export interface CreateDescriptionRequest extends BaseRequest {
  AppGoodID: string
  Description: string
  Index?: number
}

export interface CreateDescriptionResponse {
  Info: Description
}

export interface UpdateDescriptionRequest extends BaseRequest {
  ID: number
  EntID: string
  Description?: string
  Index?: number
}

export interface UpdateDescriptionResponse {
  Info: Description
}

export interface GetDescriptionsRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetDescriptionsResponse {
  Infos: Description[]
  Total: number
}

export interface DeleteDescriptionRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteDescriptionResponse {
  Info: Description
}

export interface AdminCreateDescriptionRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  Description: string
  Index?: number
}

export interface AdminCreateDescriptionResponse {
  Info: Description
}

export interface AdminUpdateDescriptionRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Description?: string
  Index?: number
}

export interface AdminUpdateDescriptionResponse {
  Info: Description
}

export interface AdminGetDescriptionsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetDescriptionsResponse {
  Infos: Description[]
  Total: number
}

export interface AdminDeleteDescriptionRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteDescriptionResponse {
  Info: Description
}

import { BaseRequest } from '../../../../../request'
import { GoodType } from '../../../../base'

export interface DisplayColorInfo {
  AppGoodID: string
  Color: string
  Index: number
}

export interface DisplayColor extends DisplayColorInfo {
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

export interface CreateDisplayColorRequest extends BaseRequest {
  AppGoodID: string
  Color: string
  Index?: number
}

export interface CreateDisplayColorResponse {
  Info: DisplayColor
}

export interface UpdateDisplayColorRequest extends BaseRequest {
  ID: number
  EntID: string
  Color?: string
  Index?: number
}

export interface UpdateDisplayColorResponse {
  Info: DisplayColor
}

export interface GetDisplayColorsRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetDisplayColorsResponse {
  Infos: DisplayColor[]
  Total: number
}

export interface DeleteDisplayColorRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteDisplayColorResponse {
  Info: DisplayColor
}

export interface AdminCreateDisplayColorRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  Color: string
  Index?: number
}

export interface AdminCreateDisplayColorResponse {
  Info: DisplayColor
}

export interface AdminUpdateDisplayColorRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Color?: string
  Index?: number
}

export interface AdminUpdateDisplayColorResponse {
  Info: DisplayColor
}

export interface AdminGetDisplayColorsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetDisplayColorsResponse {
  Infos: DisplayColor[]
  Total: number
}

export interface AdminDeleteDisplayColorRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteDisplayColorResponse {
  Info: DisplayColor
}

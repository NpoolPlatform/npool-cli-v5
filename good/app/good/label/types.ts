import { BaseRequest } from '../../../../request'
import { GoodLabel, GoodType } from '../../../base'

export interface LabelInfo {
  AppGoodID: string
  Icon: string
  IconBgColor: string
  Label: GoodLabel
  LabelBgColor: string
  Index: number
}

export interface Label extends LabelInfo {
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

export interface CreateLabelRequest extends BaseRequest {
  AppGoodID: string
  Label: string
  Index?: number
}

export interface CreateLabelResponse {
  Info: Label
}

export interface UpdateLabelRequest extends BaseRequest {
  ID: number
  EntID: string
  Label?: string
  Index?: number
}

export interface UpdateLabelResponse {
  Info: Label
}

export interface GetLabelsRequest extends BaseRequest {
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetLabelsResponse {
  Infos: Label[]
  Total: number
}

export interface DeleteLabelRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteLabelResponse {
  Info: Label
}

export interface AdminCreateLabelRequest extends BaseRequest {
  TargetAppID: string
  AppGoodID: string
  Label: string
  Index?: number
}

export interface AdminCreateLabelResponse {
  Info: Label
}

export interface AdminUpdateLabelRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  Label?: string
  Index?: number
}

export interface AdminUpdateLabelResponse {
  Info: Label
}

export interface AdminGetLabelsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetLabelsResponse {
  Infos: Label[]
  Total: number
}

export interface AdminDeleteLabelRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeleteLabelResponse {
  Info: Label
}

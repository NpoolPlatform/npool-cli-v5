import { BaseRequest } from '../../../request'
import { CancelMode, GoodDurationType, GoodSettlementType, GoodType } from '../../base'

export interface AppFee {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  GoodID: string
  GoodType: GoodType
  GoodName: string
  AppGoodID: string
  AppGoodName: string
  ProductPage: string
  SettlementType: GoodSettlementType
  Banner: string
  UnitValue: string
  DurationDisplayType: GoodDurationType
  CancelMode: CancelMode
  MinOrderDurationSeconds: number
  GoodOnline: boolean
  GoodPurchasable: boolean
  AppGoodOnline: boolean
  AppGoodPurchasable: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface GetAppFeesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppFeesResponse {
  Infos: AppFee[]
  Total: number
}

export interface GetAppFeeRequest extends BaseRequest {
  AppGoodID: string
}

export interface GetAppFeeResponse {
  Info: AppFee
}

export interface UpdateAppFeeRequest extends BaseRequest {
  ID: number
  EntID: string
  AppID: string
  AppGoodID: string
  ProductPage?: string
  Name?: string
  Banner?: string
  UnitValue?: string
  MinOrderDurationSeconds?: number
}

export interface UpdateAppFeeResponse {
  Info: AppFee
}

export interface AdminCreateAppFeeRequest extends BaseRequest {
  TargetAppID: string
  GoodID: string
  ProductPage?: string
  Name: string
  Banner: string
  UnitValue: string
  MinOrderDurationSeconds: number
}

export interface AdminCreateAppFeeResponse {
  Info: AppFee
}

export interface AdminGetAppFeesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetAppFeesResponse {
  Infos: AppFee[]
  Total: number
}

export interface AdminUpdateAppFeeRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string
  ProductPage?: string
  Name?: string
  Banner?: string
  UnitValue?: string
  MinOrderDurationSeconds?: number
}

export interface AdminUpdateAppFeeResponse {
  Info: AppFee
}

export interface AdminDeleteAppFeeRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string
}

export interface AdminDeleteAppFeeResponse {
  Info: AppFee
}

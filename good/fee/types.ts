import { BaseRequest } from 'src/npoolstore/request'
import { GoodDurationType, GoodSettlementType, GoodType } from '../base'

export interface Fee {
  ID: number
  EntID: string
  GoodID: string
  GoodType: GoodType
  Name: string
  SettlementType: GoodSettlementType
  UnitValue: string
  DurationDisplayType: GoodDurationType
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateFeeRequest extends BaseRequest {
  GoodType: GoodType
  Name: string
  SettlementType: GoodSettlementType
  UnitValue: string
  DurationDisplayType: GoodDurationType
}

export interface AdminCreateFeeResponse {
  Info: Fee
}

export interface AdminUpdateFeeRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
  GoodType?: GoodType
  Name?: string
  SettlementType?: GoodSettlementType
  UnitValue?: string
  DurationDisplayType?: GoodDurationType
}

export interface AdminUpdateFeeResponse {
  Info: Fee
}

export interface GetFeeRequest extends BaseRequest {
  GoodID: string
}

export interface GetFeeResponse {
  Info: Fee
}

export interface GetFeesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetFeesResponse {
  Infos: Fee[]
  Total: number
}

export interface AdminDeleteFeeRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
}

export interface AdminDeleteFeeResponse {
  Info: Fee
}

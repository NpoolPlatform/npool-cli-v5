import { BaseRequest } from '../../request'
import { GoodType } from '../../good/base'
import { CompensateType } from './const'

export interface Compensate {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  GoodID: string
  GoodType: GoodType
  GoodName: string
  AppGoodID: string
  AppGoodName: string
  OrderID: string
  CompensateFromID: string
  CompensateType: CompensateType
  CompensateSeconds: number
  CompensateName: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetCompensatesRequest extends BaseRequest {
  TargetUserID?: string
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetCompensatesResponse {
  Infos: Compensate[]
  Total: number
}

export interface GetMyCompensatesRequest extends BaseRequest {
  OrderID?: string
  Offset: number
  Limit: number
}

export interface GetMyCompensatesResponse {
  Infos: Compensate[]
  Total: number
}

export interface AdminGetCompensatesRequest extends BaseRequest {
  TargetAppID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetCompensatesResponse {
  Infos: Compensate[]
  Total: number
}

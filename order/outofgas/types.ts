import { BaseRequest } from '../../request'
import { GoodType } from '../../good/base'

export interface OutOfGas {
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
  StartAt: number
  EndAt: number
  CreatedAt: number
  UpdatedAt: number
}

export interface GetOutOfGasesRequest extends BaseRequest {
  TargetUserID?: string
  AppGoodID?: string
  Offset: number
  Limit: number
}

export interface GetOutOfGasesResponse {
  Infos: OutOfGas[]
  Total: number
}

export interface GetMyOutOfGasesRequest extends BaseRequest {
  OrderID?: string
  Offset: number
  Limit: number
}

export interface GetMyOutOfGasesResponse {
  Infos: OutOfGas[]
  Total: number
}

export interface AdminGetOutOfGasesRequest extends BaseRequest {
  TargetAppID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetOutOfGasesResponse {
  Infos: OutOfGas[]
  Total: number
}

import { BaseRequest } from '../../../request'
import { Compensate, CompensateType } from '../../compensate'

export interface AdminCreateCompensateRequest extends BaseRequest {
  TargetAppID: string
  GoodID?: string
  OrderID?: string
  CompensateFromID: string
  CompensateType: CompensateType
}

export interface AdminCreateCompensateResponse {
  Info: Compensate
}

export interface AdminDeleteCompensateRequest extends BaseRequest {
  ID: number
  EntID: string
  OrderID: string
  TargetAppID: string
  TargetUserID: string
}

export interface AdminDeleteCompensateResponse {
  Info: Compensate
}

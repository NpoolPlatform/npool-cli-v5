import { BaseRequest } from '../../../request'
import { OutOfGas } from '../../outofgas'

export interface AdminDeleteOutOfGasRequest extends BaseRequest {
  ID: number
  EntID: string
  OrderID: string
  TargetAppID: string
  TargetUserID: string
}

export interface AdminDeleteOutOfGasResponse {
  Info: OutOfGas
}

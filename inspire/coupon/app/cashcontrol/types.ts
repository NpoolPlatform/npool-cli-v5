import { BaseRequest } from '../../../../request'
import { ControlType, CouponType } from '../../const'

export interface CashControl {
    ID: number
    EntID: string
    AppID: string
    CouponID: string
    CouponName: string
    CouponTypeStr: string
    CouponType: CouponType
    CouponDenomination: string
    ControlTypeStr: string
    ControlType: ControlType
    Value: string
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateCashControlRequest extends BaseRequest {
    CouponID: string
    ControlType: ControlType
    Value?: string
}

export interface CreateCashControlResponse {
    Info: CashControl
}

export interface DeleteCashControlRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface DeleteCashControlResponse {
    Info: CashControl
}
export interface UpdateCashControlRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    Value: string
}

export interface UpdateCashControlResponse {
    Info: CashControl
}
export interface GetCashControlsRequest extends BaseRequest {
    TargetAppID: string
    Offset: number
    Limit: number
}

export interface GetCashControlsResponse {
    Infos: CashControl[]
    Total: number
}

export interface GetAppCashControlsRequest extends BaseRequest {
    AppID?: string
    Offset: number
    Limit: number
}

export interface GetAppCashControlsResponse {
    Infos: CashControl[]
    Total: number
}

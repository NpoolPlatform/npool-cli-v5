import { BaseRequest, NotifyRequest } from '../../../request'
import { GoodType } from '../../base'

export interface Malfunction {
    ID: number
    EntID: string
    GoodID: string
    GoodType: GoodType
    GoodName: string
    Title: string
    Message: string
    StartAt: number
    DurationSeconds: number
    CompensateSeconds: number
    CompensateOrders: number
    CreatedAt: number
    UpdatedAt: number
}

export interface AdminCreateMalfunctionRequest extends NotifyRequest {
    GoodID: string
    Title: string
    Message: string
    StartAt: number
    DurationSeconds?: number
    CompensateSeconds?: number
}

export interface AdminCreateMalfunctionResponse {
    Info: Malfunction
}

export interface AdminUpdateMalfunctionRequest extends NotifyRequest {
    ID: number
    EntID: string
    Title?: string
    Message?: string
    StartAt?: number
    DurationSeconds?: number
    CompensateSeconds?: number
}

export interface AdminUpdateMalfunctionResponse {
    Info: Malfunction
}

export interface GetMalfunctionsRequest extends BaseRequest {
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetMalfunctionsResponse {
    Infos: Malfunction[]
    Total: number
}

export interface AdminDeleteMalfunctionRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface AdminDeleteMalfunctionResponse {
    Info: Malfunction
}

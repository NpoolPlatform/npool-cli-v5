import { BaseRequest } from '../../../../request'

export interface RewardHistory {
    ID: number
    EntID: string
    GoodID: string
    GoodName: string
    RewardDate: number
    TID: string
    Amount: string
    UnitAmount: string
    CreatedAt: number
    UpdatedAt: number
}

export interface GetHistoriesRequest extends BaseRequest {
    GoodID?: string
    StartAt?: number
    EndAt?: number
    Offset: number
    Limit: number
}

export interface GetHistoriesResponse {
    Infos: RewardHistory[]
    Total: number
}

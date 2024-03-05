import { BaseRequest } from '../../../request'

export enum CoinUsedForOption {
    CoinUsedForCouponCash = 'CoinUsedForCouponCash',
    CoinUsedForGoodFee = 'CoinUsedForGoodFee',
}

export interface CoinUsedFor {
    ID: number
    EntID: string
    CoinTypeID: string
    CoinName: string
    CoinLogo: string
    CoinUnit: string
    CoinENV: string
    UsedForStr: string
    UsedFor: CoinUsedForOption
    Priority: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateCoinUsedForRequest extends BaseRequest {
    CoinTypeID: string
    UsedFor: CoinUsedForOption
    Priority: number
}

export interface CreateCoinUsedForResponse {
    Info: CoinUsedFor
}

export interface DeleteCoinUsedForRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteCoinUsedForResponse {
    Info: CoinUsedFor
}

export interface GetCoinUsedForsRequest extends BaseRequest {
    CoinTypeIDs?: string[]
    UsedFors?: CoinUsedForOption[]
    Offset: number
    Limit: number
}

export interface GetCoinUsedForsResponse {
    Infos: CoinUsedFor[]
    Total: number
}

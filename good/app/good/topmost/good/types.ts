import { GoodTopMostType, GoodType } from '../../../../../good/base'
import { BaseRequest } from '../../../../../request'
import { PosterInfo } from '../poster'

export interface TopMostGood {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    GoodID: string
    GoodType: GoodType
    GoodName: string
    AppGoodID: string
    AppGoodName: string
    TopMostID: string
    TopMostType: GoodTopMostType
    TopMostTitle: string
    TopMostMessage: string
    TopMostTargetUrl: string
    Posters: PosterInfo[]
    UnitPrice: string
    DisplayIndex: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostGoodRequest extends BaseRequest {
    TopMostID: string
    AppGoodID: string
    UnitPrice: string
    DisplayIndex?: number
}

export interface CreateTopMostGoodResponse {
    Info: TopMostGood
}

export interface UpdateTopMostGoodRequest extends BaseRequest {
    ID: number
    EntID: string
    UnitPrice?: string
    DisplayIndex?: number
}

export interface UpdateTopMostGoodResponse {
    Info: TopMostGood
}

export interface DeleteTopMostGoodRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteTopMostGoodResponse {
    Info: TopMostGood
}

export interface GetTopMostGoodsRequest extends BaseRequest {
    Offset: number
    Limit: number
}

export interface GetTopMostGoodsResponse {
    Infos: TopMostGood[]
    Total: number
}

export interface AdminCreateTopMostGoodRequest extends BaseRequest {
    TargetAppID: string
    TopMostID: string
    AppGoodID: string
    UnitPrice: string
    DisplayIndex?: number
}

export interface AdminCreateTopMostGoodResponse {
    Info: TopMostGood
}

export interface AdminUpdateTopMostGoodRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    UnitPrice?: string
    DisplayIndex?: number
}

export interface AdminUpdateTopMostGoodResponse {
    Info: TopMostGood
}

export interface AdminDeleteTopMostGoodRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface AdminDeleteTopMostGoodResponse {
    Info: TopMostGood
}

export interface AdminGetTopMostGoodsRequest extends BaseRequest {
    TargetAppID: string
    Offset: number
    Limit: number
}

export interface AdminGetTopMostGoodsResponse {
    Infos: TopMostGood[]
    Total: number
}

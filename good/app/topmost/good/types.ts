import { GoodTopMostType } from 'src/npoolstore/good/base'
import { BaseRequest } from 'src/npoolstore/request'

export interface TopMostGood {
    ID: string
    AppID: string
    AppName: string
    GoodID: string
    GoodName: string
    AppGoodID: string
    AppGoodName: string
    CoinTypeID: string
    CoinName: string
    CoinLogo: string
    CoinEnv: string
    CoinUnit: string
    TopMostID: string
    TopMostType: GoodTopMostType
    TopMostTitle: string
    TopMostMessage: string
    Posters: string[]
    Price: string
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostGoodRequest extends BaseRequest {
    AppID: string
    TopMostID: string
    AppGoodID: string
    Posters: string[]
    Price: string
}

export interface CreateTopMostGoodResponse {
    Info: TopMostGood
}

export interface UpdateTopMostGoodRequest extends BaseRequest {
    ID: string
    AppID: string
    Posters: string[]
    Price: string
}

export interface UpdateTopMostGoodResponse {
    Info: TopMostGood
}

export interface DeleteTopMostGoodRequest extends BaseRequest {
    ID: string
    AppID: string
}

export interface DeleteTopMostGoodResponse {
    Info: TopMostGood
}

export interface GetTopMostGoodsRequest extends BaseRequest {
    AppID: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetTopMostGoodsResponse {
    Infos: TopMostGood[]
    /** @format int64 */
    Total: number
}

export interface CreateNTopMostGoodRequest extends BaseRequest {
    TargetAppID: string
    TopMostID: string
    AppGoodID: string
    Posters: string[]
    Price: string
}

export interface CreateNTopMostGoodResponse {
    Info: TopMostGood
}

export interface GetNTopMostGoodsRequest extends BaseRequest {
    TargetAppID: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetNTopMostGoodsResponse {
    Infos: TopMostGood[]
    /** @format int64 */
    Total: number
}

export interface UpdateNTopMostGoodRequest extends BaseRequest {
    ID: string
    TargetAppID: string
    Posters: string[]
    Price: string
}

export interface UpdateNTopMostGoodResponse {
    Info: TopMostGood
}

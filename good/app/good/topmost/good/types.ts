import { GoodTopMostType, GoodType } from '../../../../../good/base'
import { BaseRequest } from '../../../../../request'

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
    UnitPrice: string
    PackagePrice: string
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostGoodRequest extends BaseRequest {
    TopMostID: string
    AppGoodID: string
    Posters: string[]
    UnitPrice?: string
    PackagePrice?: string
}

export interface CreateTopMostGoodResponse {
    Info: TopMostGood
}

export interface UpdateTopMostGoodRequest extends BaseRequest {
    ID: number
    EntID: string
    Posters: string[]
    UnitPrice?: string
    PackagePrice?: string
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
    UnitPrice?: string
    PackagePrice?: string
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
    ID: number
    EntID: string
    TargetAppID: string
    Posters: string[]
    UnitPrice?: string
    PackagePrice?: string
}

export interface UpdateNTopMostGoodResponse {
    Info: TopMostGood
}

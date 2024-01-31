import { BaseRequest, NotifyRequest } from '../../../request'

export interface Recommend {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    RecommenderID: string
    Username: string
    EmailAddress: string
    PhoneNO: string
    Avatar: string
    GoodID: string
    AppGoodID: string
    GoodName: string
    Title: string
    Message: string
    RecommendIndex: number
    /** @format int64 */
    CreatedAt: number
    /** @format int64 */
    UpdatedAt: number
}

export interface CreateRecommendRequest extends NotifyRequest {
    GoodID: string
    RecommendIndex: number
    Message: string
}

export interface CreateRecommendResponse {
    Info: Recommend
}

export interface DeleteRecommendRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteRecommendResponse {
    Info: Recommend
}

export interface DeleteAppRecommendRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetUserID: string
}

export interface DeleteAppRecommendResponse {
    Info: Recommend
}

export interface GetRecommendsRequest extends BaseRequest {
    GoodID?: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetRecommendsResponse {
    Infos: Recommend[]
    /** @format int64 */
    Total: number
}

export interface GetMyRecommendsRequest extends BaseRequest {
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetMyRecommendsResponse {
    Infos: Recommend[]
    /** @format int64 */
    Total: number
}

export interface UpdateRecommendRequest extends NotifyRequest {
    ID: number
    EntID: string
    RecommendIndex?: number
    Message?: string
}

export interface UpdateRecommendResponse {
    Info: Recommend
}

import { GoodCommentHideReason } from 'src/npoolstore/good/base'
import { BaseRequest, NotifyRequest } from '../../../../request'

export interface Recommend {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    UserID: string
    Username: string
    EmailAddress: string
    PhoneNO: string
    GoodID: string
    AppGoodID: string
    GoodName: string
    RecommendIndex: string
    Message: string
    Hide: boolean
    HideReason: GoodCommentHideReason
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateRecommendRequest extends NotifyRequest {
    AppGoodID: string
    RecommendIndex: string
    Message: string
}

export interface CreateRecommendResponse {
    Info: Recommend
}

export interface UpdateRecommendRequest extends NotifyRequest {
    ID: number
    EntID: string
    RecommendIndex: string
    Message: string
}

export interface UpdateRecommendResponse {
    Info: Recommend
}

export interface GetMyRecommendsRequest extends BaseRequest {
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface GetMyRecommendsResponse {
    Infos: Recommend[]
    Total: number
}

export interface GetRecommendsRequest extends BaseRequest {
    TargetUserID?: string
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface GetRecommendsResponse {
    Infos: Recommend[]
    Total: number
}

export interface DeleteRecommendRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteRecommendResponse {
    Info: Recommend
}

export interface UpdateUserRecommendRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetUserID: string
    Hide?: boolean
    HideReason?: GoodCommentHideReason
}

export interface UpdateUserRecommendResponse {
    Info: Recommend
}

export interface AdminUpdateRecommendRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    TargetUserID: string
    Hide?: boolean
    HideReason?: GoodCommentHideReason
}

export interface AdminUpdateRecommendResponse {
    Info: Recommend
}

export interface AdminGetRecommendsRequest extends BaseRequest {
    TargetAppID: string
    TargetUserID?: string
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface AdminGetRecommendsResponse {
    Infos: Recommend[]
    Total: number
}

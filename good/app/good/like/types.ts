import { BaseRequest } from '../../../../request'

export interface Like {
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
    Like: boolean
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateLikeRequest extends BaseRequest {
    AppGoodID: string
    Like: boolean
}

export interface CreateLikeResponse {
    Info: Like
}

export interface GetMyLikesRequest extends BaseRequest {
    AppGoodID?: string
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetMyLikesResponse {
    Infos: Like[]
    Total: number
}

export interface GetLikesRequest extends BaseRequest {
    TargetUserID?: string
    AppGoodID?: string
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetLikesResponse {
    Infos: Like[]
    Total: number
}

export interface DeleteLikeRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteLikeResponse {
    Info: Like
}

import { GoodCommentHideReason } from 'src/npoolstore/good/base'
import { BaseRequest } from '../../../../request'

export interface Comment {
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
    OrderID?: string
    Content: string
    ReplyToID: string
    Anonymous: boolean
    PurchasedUser: boolean
    TrialUser: boolean
    Score: string
    Hide: boolean
    HideReason: GoodCommentHideReason
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateCommentRequest extends BaseRequest {
    AppGoodID: string
    OrderID?: string
    Content: string
    ReplyToID: string
    Anonymous?: boolean
    Score?: string
}

export interface CreateCommentResponse {
    Info: Comment
}

export interface UpdateCommentRequest extends BaseRequest {
    ID: number
    EntID: string
    Content: string
    Anonymous?: boolean
}

export interface UpdateCommentResponse {
    Info: Comment
}

export interface GetMyCommentsRequest extends BaseRequest {
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface GetMyCommentsResponse {
    Infos: Comment[]
    Total: number
}

export interface GetCommentsRequest extends BaseRequest {
    TargetUserID?: string
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface GetCommentsResponse {
    Infos: Comment[]
    Total: number
}

export interface DeleteCommentRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteCommentResponse {
    Info: Comment
}

export interface UpdateUserCommentRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetUserID: string
    Hide?: boolean
    HideReason?: GoodCommentHideReason
}

export interface UpdateUserCommentResponse {
    Info: Comment
}

export interface DeleteUserCommentRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetUserID: string
}

export interface DeleteUserCommentResponse {
    Info: Comment
}

export interface AdminUpdateCommentRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    TargetUserID: string
    Hide?: boolean
    HideReason?: GoodCommentHideReason
}

export interface AdminUpdateCommentResponse {
    Info: Comment
}

export interface AdminDeleteCommentRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    TargetUserID: string
}

export interface AdminDeleteCommentResponse {
    Info: Comment
}

export interface AdminGetCommentsRequest extends BaseRequest {
    TargetAppID: string
    TargetUserID?: string
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface AdminGetCommentsResponse {
    Infos: Comment[]
    Total: number
}

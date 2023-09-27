import { BaseRequest } from 'src/npoolstore/request'

export interface Comment {
    ID: string
    AppID: string
    AppName: string
    UserID: string
    Username: string
    EmailAddress: string
    PhoneNO: string
    GoodID: string
    GoodName: string
    OrderID: string
    Content: string
    ReplyToID: string
    /** @format int64 */
    CreatedAt: number
    /** @format int64 */
    UpdatedAt: number
}

export interface CreateCommentRequest extends BaseRequest {
    AppID?: string
    UserID?: string
    GoodID: string
    OrderID: string
    Content: string
    ReplyToID: string
}

export interface CreateCommentResponse {
    Info: Comment
}

export interface DeleteCommentRequest extends BaseRequest {
    ID: string
    AppID: string
    UserID: string
}

export interface DeleteCommentResponse {
    Info: Comment
}

export interface GetCommentsRequest extends BaseRequest {
    GoodID?: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetCommentsResponse {
    Infos: Comment[]
    /** @format int64 */
    Total: number
}

export interface GetMyCommentsRequest extends BaseRequest {
    AppID?: string
    UserID?: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetMyCommentsResponse {
    Infos: Comment[]
    /** @format int64 */
    Total: number
}

export interface UpdateCommentRequest extends BaseRequest {
    ID: string
    AppID: string
    UserID: string
    Content: string
}

export interface UpdateCommentResponse {
    Info: Comment
}

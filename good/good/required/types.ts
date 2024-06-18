import { BaseRequest } from '../../../request'

export interface Required {
    ID: number
    EntID: string
    AppID: string
    MainGoodID: string
    MainGoodName: string
    RequiredGoodID: string
    RequiredGoodName: string
    Must: boolean
    CreatedAt: number
    UpdatedAt: number
}

export interface AdminCreateRequiredRequest extends BaseRequest {
    MainGoodID: string
    RequiredGoodID: string
    Must?: boolean
}

export interface AdminCreateRequiredResponse {
    Info: Required
}

export interface AdminUpdateRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
    Must?: boolean
}

export interface AdminUpdateRequiredResponse {
    Info: Required
}

export interface GetRequiredsRequest extends BaseRequest {
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetRequiredsResponse {
    Infos: Required[]
    Total: number
}

export interface AdminDeleteRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface AdminDeleteRequiredResponse {
    Info: Required
}

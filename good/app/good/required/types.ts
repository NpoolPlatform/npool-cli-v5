import { BaseRequest } from '../../../../request'

export interface Required {
    ID: number
    EntID: string
    AppID: string
    MainGoodID: string
    MainGoodName: string
    MainAppGoodID: string
    MainAppGoodName: string
    RequiredGoodID: string
    RequiredGoodName: string
    RequiredAppGoodID: string
    RequiredAppGoodName: string
    Must: boolean
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateRequiredRequest extends BaseRequest {
    MainAppGoodID: string
    RequiredAppGoodID: string
    Must: boolean
}

export interface CreateRequiredResponse {
    Info: Required
}

export interface UpdateRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
    Must?: boolean
}

export interface UpdateRequiredResponse {
    Info: Required
}

export interface GetRequiredsRequest extends BaseRequest {
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface GetRequiredsResponse {
    Infos: Required[]
    Total: number
}

export interface DeleteRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteRequiredResponse {
    Info: Required
}

export interface AdminCreateRequiredRequest extends BaseRequest {
    TargetAppID: string
    MainAppGoodID: string
    RequiredAppGoodID: string
    Must: boolean
}

export interface AdminCreateRequiredResponse {
    Info: Required
}

export interface AdminUpdateRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    Must: boolean
}

export interface AdminUpdateRequiredResponse {
    Info: Required
}

export interface AdminGetRequiredsRequest extends BaseRequest {
    TargetAppID: string
    AppGoodID?: string
    Offset: number
    Limit: number
}

export interface AdminGetRequiredsResponse {
    Infos: Required[]
    Total: number
}

export interface AdminDeleteRequiredRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface AdminDeleteRequiredResponse {
    Info: Required
}

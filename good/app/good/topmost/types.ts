import { BaseRequest, NotifyRequest } from '../../../../request'
import { GoodTopMostType } from '../../../base'
import { PosterInfo } from './poster'

export interface TopMost {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    TargetUrl: string
    StartAt: number
    EndAt: number
    Posters: PosterInfo[]
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostRequest extends NotifyRequest {
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    TargetUrl?: string
    StartAt: number
    EndAt: number
}

export interface CreateTopMostResponse {
    Info: TopMost
}

export interface DeleteTopMostRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteTopMostResponse {
    Info: TopMost
}

export interface UpdateTopMostRequest extends NotifyRequest {
    ID: number
    EntID: string
    Title?: string
    Message?: string
    TargetUrl?: string
    StartAt?: number
    EndAt?: number
}

export interface UpdateTopMostResponse {
    Info: TopMost
}

export interface GetTopMostsRequest extends BaseRequest {
    Offset: number
    Limit: number
}

export interface GetTopMostsResponse {
    Infos: TopMost[]
    Total: number
}

export interface AdminCreateTopMostRequest extends NotifyRequest {
    TargetAppID: string
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    TargetUrl?: string
    StartAt: number
    EndAt: number
}

export interface AdminCreateTopMostResponse {
    Info: TopMost
}

export interface AdminDeleteTopMostRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface AdminDeleteTopMostResponse {
    Info: TopMost
}

export interface AdminUpdateTopMostRequest extends NotifyRequest {
    ID: number
    EntID: string
    TargetAppID: string
    Title?: string
    Message?: string
    TargetUrl?: string
    StartAt?: number
    EndAt?: number
}

export interface AdminUpdateTopMostResponse {
    Info: TopMost
}

export interface AdminGetTopMostsRequest extends BaseRequest {
    TargetAppID: string
    Offset: number
    Limit: number
}

export interface AdminGetTopMostsResponse {
    Infos: TopMost[]
    Total: number
}

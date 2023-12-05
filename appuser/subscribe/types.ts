import { BaseRequest } from '../../request'

export interface Subscribe {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    EmailAddress: string
    Registered: boolean
    CreateAt: number
    UpdatedAt: number
}

export interface CreateSubscribeRequest extends BaseRequest {
    AppID?: string
    SubscribeAppID?: string
    EmailAddress: string
}

export interface CreateSubscribeResponse {
    Info: Subscribe
}

export interface GetSubscribesRequest extends BaseRequest {
    AppID?: string
    Offset: number
    Limit: number
}

export interface GetSubscribesResponse {
    Infos: Array<Subscribe>
    Total: number
}

export interface DeleteSubscribeRequest extends BaseRequest {
    ID: number
    EntID: string
    EmailAddress: string
}

export interface DeleteSubscribeResponse {
    Info: Subscribe
}

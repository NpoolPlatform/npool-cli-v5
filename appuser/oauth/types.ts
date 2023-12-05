import { BaseRequest } from '../../request'
import { SignMethodType } from '../base'
import { User } from '../user'

export interface GetOAuthLoginURLRequest extends BaseRequest {
    ClientName: SignMethodType
}

export interface GetOAuthLoginURLResponse {
    Info: string
}

export interface OAuthLoginRequest extends BaseRequest {
    Code: string
    State: string
}

export interface OAuthLoginResponse {
    Info: User
}

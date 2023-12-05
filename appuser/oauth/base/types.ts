import { SignMethodType } from '../../base'

export interface AppOAuthThirdParty {
    ID: number
    EntID: string
    AppID: string
    ThirdPartyID: string
    ClientID: string
    ClientSecret: string
    CallbackURL: string
    ClientName: SignMethodType
    ClientLogoURL: string
    ClientOAuthURL: string
    ResponseTypes: string
    Scope: string
    Salt: string
    CreatedAt: number
    UpdatedAt: number
}

export interface OAuthThirdParty {
    ID: number
    EntID: string
    ClientName: SignMethodType
    ClientTag: string
    ClientLogoURL: string
    ClientOAuthURL: string
    ResponseType: string
    Scope: string
    CreatedAt: number
    UpdatedAt: number
}

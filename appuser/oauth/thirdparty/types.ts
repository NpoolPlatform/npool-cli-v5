import { BaseRequest } from '../../../request'
import { SignMethodType } from '../../base'

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

export interface CreateOAuthThirdPartyRequest extends BaseRequest {
  ClientName: SignMethodType
  ClientTag: string
  ClientLogoURL: string
  ClientOAuthURL: string
  ResponseType: string
  Scope: string
}

export interface CreateOAuthThirdPartyResponse {
  Info: OAuthThirdParty
}

export interface UpdateOAuthThirdPartyRequest extends BaseRequest {
  ID: number
  EntID: string
  ClientName?: SignMethodType
  ClientTag?: string
  ClientLogoURL?: string
  ClientOAuthURL?: string
  ResponseType?: string
  Scope?: string
}

export interface UpdateOAuthThirdPartyResponse {
  Info: OAuthThirdParty
}

export interface GetOAuthThirdPartiesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetOAuthThirdPartiesResponse {
  Infos: Array<OAuthThirdParty>
}

export interface DeleteOAuthThirdPartyRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteOAuthThirdPartyResponse {
  Info: OAuthThirdParty
}

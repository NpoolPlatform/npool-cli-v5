import { BaseRequest } from '../../request'
import { User } from '../user'

export interface SetupGoogleAuthRequest extends BaseRequest {
  AppID: string
  UserID: string
}

export interface SetupGoogleAuthResponse {
  Info: User
}

export interface VerifyGoogleAuthRequest extends BaseRequest {
  AppID: string
  UserID: string
  Code: string
}

export interface VerifyGoogleAuthResponse {
  Info: User
}

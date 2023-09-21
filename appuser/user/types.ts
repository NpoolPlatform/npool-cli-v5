import { BaseRequest } from '../../request'
import { SignMethodType, SigninVerifyType } from '../base'
import { LoginHistory, User } from './base'

export interface SignupRequest extends BaseRequest{
  Account: string
  PasswordHash: string
  AccountType: SignMethodType
  VerificationCode: string
  InvitationCode: string
}

export interface SignupResponse {
  Info: User
}

export interface LoginRequest extends BaseRequest {
  Account: string
  PasswordHash: string
  AccountType: SignMethodType
  ManMachineSpec: string
  EnvironmentSpec?: string
}

export interface LoginResponse {
  Info: User
}

export interface LoginVerifyRequest extends BaseRequest {
  UserID: string
  Account: string
  AccountType: SignMethodType
  Token: string
  VerificationCode: string
}

export interface LoginVerifyResponse {
  Info: User
}

export interface LogoutRequest extends BaseRequest {
  Token?: string
}

export interface LogoutResponse {
  Info: User
}

export interface UpdateUserRequest extends BaseRequest {
  Account?: string
  NewAccount?:string
  AccountType?: SignMethodType
  NewAccountType?: SignMethodType
  VerificationCode?: string
  NewVerificationCode?:string
  EmailAddress?: string
  PhoneNO?: string
  Username?: string
  AddressFields?: string[]
  Gender?: string
  PostalCode?: string
  Age?: number
  Birthday?: number
  Avatar?: string
  Organization?: string
  FirstName?: string
  LastName?: string
  IDNumber?: string
  SigninVerifyType?: SigninVerifyType
  PasswordHash?: string
  OldPasswordHash?:string
  SigninVerifyByGoogleAuth?: boolean
  GoogleAuthVerified?: boolean
  InvitationCodeID?: string
  InvitationCodeConfirmed?: boolean
  KolConfirmed?: boolean
  SelectedLangID?: string
}

export interface UpdateUserResponse {
  Info: User
}

export interface ResetUserRequest extends BaseRequest {
  Account: string
  AccountType: SignMethodType
  VerificationCode: string
  PasswordHash?: string
  RecoveryCode?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResetUserResponse {
}

export interface GetLoginHistoriesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetLoginHistoriesResponse {
  Infos: Array<LoginHistory>
  Total: number
}

export interface UpdateUserKolRequest extends BaseRequest {
  TargetUserID: string
  Kol: boolean
}

export interface UpdateUserKolResponse {
  Info: User
}

export interface GetUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetUsersResponse {
  Infos: Array<User>
  Total: number
}

export interface UpdateAppUserRequest extends BaseRequest {
  TargetUserID: string
  Kol?: boolean
  EmailAddress?: string
}

export interface UpdateAppUserResponse {
  Info: User
}

export interface GetAppUsersRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppUsersResponse {
  Infos: Array<User>
}

export interface CreateAppUserRequest extends BaseRequest {
  TargetAppID: string
  EmailAddress: string
  PhoneNO: string
  PasswordHash: string
}

export interface CreateAppUserResponse {
  Info: User
}

export interface ChurchUserState {
  Users: Map<string, Array<User>>
}

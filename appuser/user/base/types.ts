import { SignMethodType, SigninVerifyType } from '../../base'
import { KYCState } from '../../kyc'

export interface User {
  ID: string
  AppID: string
  EmailAddress: string
  PhoneNO: string
  ImportedFromAppID: string
  ImportedFromAppName: string
  ImportedFromAppLogo: string
  ImportedFromAppHome: string
  Username: string
  AddressFields: Array<string>
  AddressFieldsString: string
  Gender: string
  PostalCode: string
  Age: number
  Birthday: number
  Avatar: string
  Organization: string
  FirstName: string
  LastName: string
  IDNumber: string
  SigninVerifyType: SigninVerifyType
  SigninVerifyTypeStr: string
  GoogleAuthVerified: boolean
  GoogleAuthVerifiedInt: number
  GoogleSecret: string
  HasGoogleSecret: boolean
  GoogleOTPAuth: string
  SigninVerifyByGoogleAuth: boolean
  SigninVerifyByGoogleAuthInt: number
  BanAppUserID: string
  Banned: boolean
  BanMessage: string
  Roles: Array<string>
  Logined: boolean
  LoginAccount: string
  LoginAccountType: SignMethodType
  LoginToken: string
  LoginClientIP: string
  LoginClientUserAgent: string
  CreatedAt: number
  Kol: boolean
  KolConfirmed: boolean
  InvitationCodeID: string
  InvitationCode: string
  InvitationCodeConfirmed: boolean
  LoginVerified: boolean
  State: KYCState
  KycStateStr: string
  SelectedLangID: string
}

export interface LoginHistory {
  AppID: string
  ID: string
  UserID: string
  ClientIP: string
  UserAgent: string
  Location: string
  CreatedAt: number
}

import { BaseRequest } from '../../request'
import { EntityType, DocumentType, KYCState, ImageType } from './const'

export interface KYC {
  ID: string
  AppID: string
  AppName: string
  AppLogo: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  DocumentType: DocumentType
  IDNumber: string
  FrontImg: string
  BackImg: string
  SelfieImg: string
  EntityType: EntityType
  ReviewID: string
  State: KYCState
  CreatedAt: number
  UpdatedAt: number
  ReviewMessage: string
}

export interface CreateKYCRequest extends BaseRequest {
  IDNumber: string
  FrontImg: string
  BackImg: string
  SelfieImg: string
  DocumentType: DocumentType
  EntityType: EntityType
}

export interface CreateKYCResponse {
  Info: KYC
}

export type GetKYCRequest = BaseRequest

export interface GetKYCResponse {
  Info: KYC
}

export interface GetKYCImageRequest extends BaseRequest{
  ImageType: ImageType
}

export interface GetKYCImageResponse {
  Info: string
}

export interface UpdateKYCRequest extends BaseRequest {
  KycID: string
  IDNumber: string
  FrontImg: string
  BackImg?: string
  SelfieImg: string
  DocumentType?: DocumentType
}

export interface UpdateKYCResponse {
  Info: KYC
}

export interface UploadKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  ImageBase64: string
}

export interface UploadKYCImageResponse {
  Info: string
}

export interface KYCImage {
  Type: ImageType
  URI: string
  Base64: string
}

export interface GetUserKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  TargetUserID: string
}

export interface GetUserKYCImageResponse {
  Info: string
}

export interface GetAppUserKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  TargetUserID: string
  TargetAppID: string
}

export interface GetAppUserKYCImageResponse {
  Info: string
}

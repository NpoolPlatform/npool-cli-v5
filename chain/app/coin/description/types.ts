import { CoinDescriptionUsedFor } from './const'
import { BaseRequest, NotifyRequest } from '../../../../request'

export interface CoinDescription {
  ID: string
  AppID: string
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  CoinENV: string
  UsedForStr: string
  UsedFor: CoinDescriptionUsedFor
  Title: string
  Message: string
  CreatedAt: number
  UpdatedAt: number
}

export interface CreateCoinDescriptionRequest extends NotifyRequest {
  AppID: string
  CoinTypeID: string
  UsedFor: CoinDescriptionUsedFor
  Title: string
  Message: string
}

export interface CreateCoinDescriptionResponse {
  Info: CoinDescription
}

export interface GetCoinDescriptionsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetCoinDescriptionsResponse {
  Infos: CoinDescription[]
  Total: number
}

export interface UpdateCoinDescriptionRequest extends NotifyRequest {
  ID: string
  AppID: string
  Title: string
  Message: string
}

export interface UpdateCoinDescriptionResponse {
  Info: CoinDescription
}

export interface CreateAppCoinDescriptionRequest extends NotifyRequest {
  TargetAppID: string
  CoinTypeID: string
  UsedFor: CoinDescriptionUsedFor
  Title: string
  Message: string
}

export interface CreateAppCoinDescriptionResponse {
  Info:CoinDescription
}

export interface GetAppCoinDescriptionsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppCoinDescriptionsResponse {
  Infos:CoinDescription[]
  Total: number
}

export interface UpdateAppCoinDescriptionRequest extends NotifyRequest {
  TargetAppID: string
  ID: string
  AppID: string
  Title: string
  Message: string
}

export interface UpdateAppCoinDescriptionResponse {
  Info: CoinDescription
}

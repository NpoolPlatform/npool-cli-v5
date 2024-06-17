import { BaseRequest } from '../../../request'
import { BenefitType, GoodType, StartMode } from '../../base'

export interface Good {
  ID: number
  EntID: string
  AppID: string
  GoodID: string
  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  ServiceStartAt: number
  StartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  GoodPurchasable: boolean
  GoodOnline: boolean
  AppGoodPurchasable: boolean
  AppGoodOnline: boolean
  EnableProductPage: boolean
  ProductPage: string
  Visible: boolean
  AppGoodName: string
  DisplayIndex: number
  Banner: string
  CreatedAt: number
  UpdatedAt: number
}

export interface GetAppGoodsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppGoodsResponse {
  Infos: Good[]
  Total: number
}

export interface AdminGetAppGoodsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetAppGoodsResponse {
  Infos: Good[]
  Total: number
}

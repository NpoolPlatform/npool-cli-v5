import { BaseRequest } from '../../../request'
import { BenefitType, GoodCoinInfo, GoodType } from '../../base'
import { CancelMode } from './const'

export interface Good {
  ID: string
  AppID: string
  GoodID: string
  Online: boolean
  Visible: boolean
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  Commission: boolean
  CommissionPercent: number
  BenefitIntervalHours: number
  PromotionStartAt: number
  PromotionEndAt: number
  PromotionMessage: string
  PromotionPrice: string
  PromotionPosters: string[]
  RecommenderID: string
  RecommenderEmailAddress: string
  RecommenderPhoneNO: string
  RecommenderUsername: string
  RecommenderFirstName: string
  RecommenderLastName: string
  RecommendMessage: string
  RecommendIndex: number
  RecommendAt: number
  DeviceType: string
  DeviceManufacturer: string
  DevicePowerConsumption: number
  DeviceShipmentAt: number
  DevicePosters: string[]
  DurationDays: number
  VendorLocationCountry: string
  CoinTypeID: string
  CoinLogo: string
  GoodBanner: string
  CoinName: string
  CoinUnit: string
  CoinPreSale: boolean
  CoinEnv: string
  CoinSpecs: string
  CoinHomePage: string
  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  ProductPage: string
  Unit: string
  UnitAmount: number
  TestOnly: boolean
  Posters: string[]
  Labels: string[]
  VoteCount: number
  Rating: number
  SupportCoins: GoodCoinInfo[]
  GoodTotal: string
  GoodSpotQuantity: string
  RquiredGoods: Good[]
  StartAt: number
  CreatedAt: number
  SaleStartAt: number
  SaleEndAt: number
  ServiceStartAt: number
  TechnicalFeeRatio: number
  ElectricityFeeRatio: number
  DailyRewardAmount: string
  Descriptions: string[]
  DisplayNames: string[]
  DisplayColors: string[]
  EnablePurchase: boolean
  EnableProductPage: boolean
  EnableSetCommission: boolean
  UserPurchaseLimit: string
  CancelMode: CancelMode
  CancellableBeforeStart: number
  AppGoodLocked: string
  AppGoodWaitStart: string
  AppGoodInService: string
  AppGoodSold: string
}

export interface GetAppGoodsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppGoodsResponse {
  Infos: Good[]
  Total: number
}
export interface GetAppGoodRequest extends BaseRequest {
  GoodID: string
}

export interface GetAppGoodResponse {
  Info: Good
}

export interface UpdateAppGoodRequest extends BaseRequest {
  ID: string
  Online: boolean
  Visible: boolean
  GoodName: string
  ProductPage?: string
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  CommissionPercent: number
  SaleStartAt?: number
  SaleEndAt?: number
  ServiceStartAt?: number
  TechnicalFeeRatio?: number
  ElectricityFeeRatio?: number
  DailyRewardAmount?: string
  Descriptions?: string[]
  DisplayColors?: string[]
  GoodBanner?: string
  DisplayNames?: string[]
  EnablePurchase?: boolean
  EnableProductPage?: boolean
  EnableSetCommission?: boolean
  UserPurchaseLimit?: string
  CancelMode?: CancelMode
  CancellableBeforeStart?: number
}

export interface UpdateAppGoodResponse {
  Info: Good
}

export interface GetNAppGoodsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetNAppGoodsResponse {
  Infos: Good[]
  Total: number
}

export interface UpdateNAppGoodRequest extends BaseRequest {
  ID: string
  TargetAppID: string
  Online: boolean
  Visible: boolean
  GoodName: string
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  CommissionPercent: number
  SaleStartAt?: number
  SaleEndAt?: number
  ServiceStartAt?: number
  TechnicalFeeRatio?: number
  ElectricityFeeRatio?: number
  DailyRewardAmount?: string
  CancelMode?: CancelMode
  CancellableBeforeStart?: number
  EnablePurchase?: boolean
  EnableProductPage?: boolean
  EnableSetCommission?: boolean
  UserPurchaseLimit?: string
}

export interface UpdateNAppGoodResponse {
  Info: Good
}

export interface CreateAppGoodRequest extends BaseRequest {
  TargetAppID: string
  GoodID: string
  Online: boolean
  Visible: boolean
  GoodName: string
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  CommissionPercent: number
  OpenPurchase?: boolean
  IntoProductPage?: boolean
  CancelableBefore?: number
  CancellableBeforeStart?: number
  UserPurchaseLimit?: string
  EnablePurchase?: boolean
  EnableProductPage?: boolean
  EnableSetCommission?: boolean
  CancelMode?: CancelMode
}

export interface CreateAppGoodResponse {
  Info: Good
}

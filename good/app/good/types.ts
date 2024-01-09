import { BaseRequest } from '../../../request'
import { BenefitType, GoodCoinInfo, GoodLabel, GoodType, StartMode } from '../../base'
import { CancelMode } from './const'

export interface Good {
  ID: number
  EntID: string
  AppID: string
  GoodID: string
  Online: boolean
  Visible: boolean
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  Commission: boolean
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
  AppGoodPosters: string[]
  Labels: GoodLabel[]
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
  TechnicalFeeRatio: string
  ElectricityFeeRatio: string
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
  AppSpotQuantity: number
  AppGoodLocked: string
  AppGoodWaitStart: string
  AppGoodInService: string
  AppGoodSold: string
  StartMode: StartMode
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
  EntID: string
}

export interface GetAppGoodResponse {
  Info: Good
}

export interface UpdateAppGoodRequest extends BaseRequest {
  ID: number
  EntID: string
  Online?: boolean
  Visible?: boolean
  GoodName?: string
  ProductPage?: string
  Price?: string
  DisplayIndex?: number
  PurchaseLimit?: number
  CommissionPercent?: number
  SaleStartAt?: number
  SaleEndAt?: number
  ServiceStartAt?: number
  TechnicalFeeRatio?: string
  ElectricityFeeRatio?: string
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
  ID: number
  EntID: string
  TargetAppID: string
  Online: boolean
  Visible: boolean
  GoodName: string
  Price: string
  DisplayIndex: number
  PurchaseLimit: number
  SaleStartAt?: number
  SaleEndAt?: number
  ServiceStartAt?: number
  TechnicalFeeRatio?: string
  ElectricityFeeRatio?: string
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

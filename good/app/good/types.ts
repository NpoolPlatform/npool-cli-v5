import { BaseRequest } from '../../../request'
import { BenefitType, GoodDurationType, GoodSettlementType, GoodLabel, GoodType, GoodUnitCalculateType, GoodUnitType, StartMode } from '../../base'
import { CancelMode } from './const'

export interface Good {
  ID: number
  EntID: string
  AppID: string
  GoodID: string
  Online: boolean
  Visible: boolean
  UnitPrice: string
  PackagePrice: string
  DisplayIndex: number
  DeviceType: string
  DeviceManufacturer: string
  DevicePowerConsumption: number
  DeviceShipmentAt: number
  DevicePosters: string[]
  DurationDays: number
  VendorLocationCountry: string
  VendorBrandName: string
  VendorBrandLogo: string
  CoinTypeID: string
  CoinLogo: string
  CoinName: string
  CoinUnit: string
  CoinPreSale: boolean
  CoinEnv: string
  CoinHomePage: string
  CoinSpecs: string
  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  QuantityUnit: string
  QuantityUnitAmount: string
  BenefitIntervalHours: number
  TestOnly: boolean
  Posters: string[]
  Labels: GoodLabel[]
  GoodTotal: string
  GoodSpotQuantity: string
  StartAt: number
  StartMode: StartMode
  SaleStartAt: number
  SaleEndAt: number
  ServiceStartAt: number
  TechnicalFeeRatio: string
  ElectricityFeeRatio: string
  Descriptions: string[]
  GoodBanner: string
  DisplayNames: string[]
  EnablePurchase: boolean
  EnableProductPage: boolean
  CancelMode: CancelMode
  DisplayColors: string[]
  CancellableBeforeStart: number
  ProductPage: string
  EnableSetCommission: boolean
  Likes: number
  Dislikes: number
  Score: string
  ScoreCount: number
  RecommendCount: number
  CommentCount: number
  AppSpotQuantity: number
  AppGoodLocked: string
  AppGoodWaitStart: string
  AppGoodInService: string
  AppGoodSold: string
  LastRewardAmount: string
  LastUnitRewardAmount: string
  TotalRewardAmount: string
  AppGoodPosters: string[]
  MinOrderAmount: string
  MaxOrderAmount: string
  MaxUserAmount: string
  MinOrderDuration: number
  MaxOrderDuration: number
  UnitType: GoodUnitType
  QuantityCalculateType: GoodUnitCalculateType
  DurationType: GoodDurationType
  DurationCalculateType: GoodUnitCalculateType
  PackageWithRequireds: boolean
  SettlementType: GoodSettlementType
  DealUnitsLastWeek: string
  DealUnitsLastMonth: string
  DealUsersLastWeek: number
  DealUsersLastMonth: number
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
  UnitPrice?: string
  PackagePrice?: string
  DisplayIndex?: number
  SaleStartAt?: number
  SaleEndAt?: number
  ServiceStartAt?: number
  TechnicalFeeRatio?: string
  ElectricityFeeRatio?: string
  Descriptions?: string[]
  DisplayColors?: string[]
  GoodBanner?: string
  DisplayNames?: string[]
  EnablePurchase?: boolean
  EnableProductPage?: boolean
  EnableSetCommission?: boolean
  CancelMode?: CancelMode
  CancellableBeforeStart?: number
  Posters: string[]
  MinOrderAmount?: string
  MaxOrderAmount?: string
  MaxUserAmount?: string
  MinOrderDuration?: string
  MaxOrderDuration?: string
  PackageWithRequireds?: boolean
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
  UnitPrice: string
  PackagePrice: string
  DisplayIndex: number
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
  Posters: string[]
  MinOrderAmount?: string
  MaxOrderAmount?: string
  MaxUserAmount?: string
  MinOrderDuration?: number
  MaxOrderDuration?: number
  PackageWithRequireds?: boolean
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
  UnitPrice: string
  PackagePrice: string
  DisplayIndex: number
  OpenPurchase?: boolean
  IntoProductPage?: boolean
  CancelableBefore?: number
  CancellableBeforeStart?: number
  EnablePurchase?: boolean
  EnableProductPage?: boolean
  EnableSetCommission?: boolean
  CancelMode?: CancelMode
  Posters: string[]
  MinOrderAmount?: string
  MaxOrderAmount?: string
  MaxUserAmount?: string
  MinOrderDuration?: number
  MaxOrderDuration?: number
  PackageWithRequireds?: boolean
}

export interface CreateAppGoodResponse {
  Info: Good
}

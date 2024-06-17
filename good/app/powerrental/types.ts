import { BaseRequest } from '../../../request'
import { BenefitType, CancelMode, GoodDurationType, GoodSaleMode, GoodStockMode, GoodType, StartMode } from '../../base'
import { GoodCoin } from '../../good/coin'
import { RewardInfo } from '../../good/coin/reward/types'
import { MiningGoodStockInfo } from '../../good/stock'

export interface AppPowerRental {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  GoodID: string
  AppGoodID: string

  DeviceTypeID: string
  DeviceType: string
  DeviceManufacturerName: string
  DeviceManufacturerLogo: string
  DevicePowerConsumption: number
  DeviceShipmentAt: number

  VendorLocationID: string
  VendorBrand: string
  VendorLogo: string
  VendorCountry: string
  VendorProvince: string

  UnitPrice: string
  QuantityUnit: string
  QuantityUnitAmount: string
  DeliveryAt: number
  UnitLockDeposit: string
  DurationDisplayType: GoodDurationType

  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  ServiceStartAt: number
  GoodStartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  GoodPurchase: boolean
  GoodOnline: boolean
  StockMode: GoodStockMode

  AppGoodPurchasable: boolean
  AppGoodOnline: boolean
  EnableProductPage: boolean
  ProductPage: boolean
  Visible: boolean
  AppGoodName: string
  DisplayIndex: number
  Banner: string
  CancelMode: CancelMode
  CancelableBeforeStartSeconds: number
  EnableSetCommission: boolean
  MinOrderAmount: string
  MaxOrderAmount: string
  MaxUserAmount: string
  MinOrderDurationSeconds: number
  MaxOrderDurationSeconds: number
  SaleStartAt: number
  SaleEndAt: number
  SaleMode: GoodSaleMode
  FixedDuration: boolean
  PackageWithRequireds: boolean

  TechniqueFeeRatio?: number

  GoodStockID: string
  GoodTotal: string
  GoodSpotQuantity: string

  AppGoodStockID: string
  AppGoodReserved: string
  AppGoodSpotQuantity: string
  AppGoodLocked: string
  AppGoodInService: string
  AppGoodWaitStart: string
  AppGoodSold: string

  Likes: number
  Dislikes: number
  Score: string
  ScoreCount: number
  RecommendCount: number
  CommentCount: number

  LastRewardAt: number
  AppGoodStartMode: StartMode

  GoodCoins: GoodCoin[]
  MiningGoodStocks: MiningGoodStockInfo[]
  Rewards: RewardInfo[]

  CreatedAt: number
  UpdatedAt: number
}

export interface GetAppPowerRentalsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppPowerRentalsResponse {
  Infos: AppPowerRental[]
  Total: number
}

export interface GetAppPowerRentalRequest extends BaseRequest {
  AppGoodID: string
}

export interface GetAppPowerRentalResponse {
  Info: AppPowerRental
}

export interface UpdateAppPowerRentalRequest extends BaseRequest {
  ID: number
  EntID: string
  AppID: string
  AppGoodID: string
  ProductPage?: string
  Name?: string
  Banner?: string
  UnitValue?: string
  MinOrderDurationSeconds?: number
}

export interface UpdateAppPowerRentalResponse {
  Info: AppPowerRental
}

export interface AdminCreateAppPowerRentalRequest extends BaseRequest {
  TargetAppID: string
  GoodID: string
  ProductPage?: string
  Name: string
  Banner: string
  UnitValue: string
  MinOrderDurationSeconds: number
}

export interface AdminCreateAppPowerRentalResponse {
  Info: AppPowerRental
}

export interface AdminGetAppPowerRentalsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetAppPowerRentalsResponse {
  Infos: AppPowerRental[]
  Total: number
}

export interface AdminUpdateAppPowerRentalRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string
  ProductPage?: string
  Name?: string
  Banner?: string
  UnitValue?: string
  MinOrderDurationSeconds?: number
}

export interface AdminUpdateAppPowerRentalResponse {
  Info: AppPowerRental
}

export interface AdminDeleteAppPowerRentalRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string
}

export interface AdminDeleteAppPowerRentalResponse {
  Info: AppPowerRental
}

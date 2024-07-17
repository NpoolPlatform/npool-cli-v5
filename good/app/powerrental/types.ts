import { BaseRequest } from '../../../request'
import { BenefitType, CancelMode, GoodDurationType, GoodSaleMode, GoodStockMode, GoodType, StartMode } from '../../base'
import { GoodCoinInfo } from '../../good/coin'
import { RewardInfo } from '../../good/coin/reward/types'
import { MiningGoodStockInfo } from '../../good/stock'
import { DescriptionInfo } from '../good/description'
import { DisplayColorInfo } from '../good/display/color'
import { DisplayNameInfo } from '../good/display/name'
import { LabelInfo } from '../good/label'
import { Poster } from '../good/poster'
import { RequiredInfo } from '../good/required'
import { StockInfo } from '../good/stock/mining'

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
  GoodPurchasable: boolean
  GoodOnline: boolean
  StockMode: GoodStockMode

  AppGoodPurchasable: boolean
  AppGoodOnline: boolean
  EnableProductPage: boolean
  ProductPage: string
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
  DurationDays: number
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

  GoodCoins: GoodCoinInfo[]
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinENV: string
  CoinLogo: string

  Descriptions: DescriptionInfo[]
  MiningGoodStocks: MiningGoodStockInfo[]
  Rewards: RewardInfo[]
  Posters: Poster[]
  DisplayNames: DisplayNameInfo[]
  DisplayColors: DisplayColorInfo[]
  AppMiningGoodStocks: StockInfo[]
  Labels: LabelInfo[]
  Requireds: RequiredInfo[]

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

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name?: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt?: number
  CancelMode?: CancelMode
  CancelableBeforeStartSeconds?: number
  EnableSetCommission?: boolean
  MinOrderAmount?: string
  MaxOrderAmount?: string
  MaxUserAmount?: string
  MinOrderDurationSeconds?: number
  MaxOrderDurationSeconds?: number
  UnitPrice?: string
  SaleStartAt?: number
  SaleEndAt?: number
  SaleMode?: GoodSaleMode
  FixedDuration?: boolean
  PackageWithRequireds?: boolean
  StartMode?: StartMode
}

export interface UpdateAppPowerRentalResponse {
  Info: AppPowerRental
}

export interface AdminCreateAppPowerRentalRequest extends BaseRequest {
  TargetAppID: string
  GoodID: string

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt: number
  CancelMode?: CancelMode
  CancelableBeforeStartSeconds?: number
  EnableSetCommission?: boolean
  MinOrderAmount: string
  MaxOrderAmount: string
  MaxUserAmount?: string
  MinOrderDurationSeconds: number
  MaxOrderDurationSeconds?: number
  UnitPrice: string
  SaleStartAt: number
  SaleEndAt: number
  SaleMode: GoodSaleMode
  FixedDuration?: boolean
  PackageWithRequireds?: boolean
  StartMode?: StartMode
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

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name?: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt?: number
  CancelMode?: CancelMode
  CancelableBeforeStartSeconds?: number
  EnableSetCommission?: boolean
  MinOrderAmount?: string
  MaxOrderAmount?: string
  MaxUserAmount?: string
  MinOrderDurationSeconds?: number
  MaxOrderDurationSeconds?: number
  UnitPrice?: string
  SaleStartAt?: number
  SaleEndAt?: number
  SaleMode?: GoodSaleMode
  FixedDuration?: boolean
  PackageWithRequireds?: boolean
  StartMode?: StartMode
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

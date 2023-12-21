import { BaseRequest } from '../request'
import { BenefitType, GoodCoinInfo, GoodType, StartMode } from './base'

export interface Good {
  ID: number
  EntID: string
  DeviceInfoID: string
  DeviceType: string
  DeviceManufacturer: string
  DevicePowerConsumption: number
  DeviceShipmentAt: number
  DevicePosters: string[]
  DurationDays: number
  CoinTypeID: string
  CoinLogo: string
  CoinName: string
  CoinUnit: string
  CoinPreSale: boolean
  CoinEnv: string
  InheritFromGoodID: string
  InheritFromGoodName: string
  InheritFromGoodType: GoodType
  InheritFromGoodBenefitType: BenefitType
  VendorLocationID: string
  VendorLocationCountry: string
  VendorLocationProvince: string
  VendorLocationCity: string
  VendorLocationAddress: string
  GoodType: GoodType
  BenefitType: BenefitType
  Price: string
  Title: string
  Unit: string
  UnitAmount: number
  TestOnly: boolean
  Posters: string[]
  Labels: string[]
  SupportCoins: GoodCoinInfo[]
  SupportCoinTypeIDs: string[]
  Total: string
  Locked: string
  InService: string
  WaitStart: string
  Sold: string
  DeliveryAt: number
  BenefitIntervalHours: number
  UnitLockDeposit: string
  StartMode: StartMode
  StartAt: number
  CreatedAt: number
  UpdatedAt: number
  DeletedAt: number
}

export interface CreateGoodRequest extends BaseRequest {
  DeviceInfoID: string
  DurationDays: number
  CoinTypeID: string
  InheritFromGoodID?: string
  VendorLocationID: string
  Price: string
  BenefitType: string
  GoodType: string
  Title: string
  Unit: string
  UnitAmount: number
  SupportCoinTypeIDs?: string[]
  DeliveryAt: number
  StartAt: number
  TestOnly: boolean
  Total: string
  Locked?: string
  InService?: string
  Sold?: string
  Posters: string[]
  Labels: string[]
}

export interface CreateGoodResponse {
  Info: Good
}

export interface GetGoodsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetGoodsResponse {
  Infos: Array<Good>
  Total: number
}

export interface GetGoodRequest extends BaseRequest {
  EntID: string
}

export interface GetGoodResponse {
  Info: Good
}

export interface UpdateGoodRequest extends BaseRequest {
  ID: number
  EntID: string
  DeviceInfoID: string
  DurationDays: number
  CoinTypeID: string
  InheritFromGoodID?: string
  VendorLocationID: string
  Price: string
  Title: string
  Unit: string
  UnitAmount: number
  SupportCoinTypeIDs?: string[]
  DeliveryAt: number
  StartAt: number
  TestOnly?: boolean
  Total: string
  Sold?: string
  Posters?: string[]
  Labels?: string[]
}

export interface UpdateGoodResponse {
  Info: Good
}

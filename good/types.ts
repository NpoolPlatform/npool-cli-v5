import { BaseRequest } from '../request'
import { BenefitType, GoodDurationType, GoodLabel, GoodType, GoodUnitCalculateType, GoodUnitType, StartMode } from './base'

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
  VendorLocationID: string
  VendorLocationCountry: string
  VendorLocationProvince: string
  VendorLocationCity: string
  VendorLocationAddress: string
  VendorLocationName: string
  VendorBranchLogo: string
  GoodType: GoodType
  BenefitType: BenefitType
  UnitPrice: string
  Title: string
  QuantityUnit: string
  QuantityUnitAmount: string
  TestOnly: boolean
  Posters: string[]
  Labels: GoodLabel[]
  Total: string
  Locked: string
  SpotQuantity: string
  InService: string
  WaitStart: string
  Sold: string
  AppReserved: string
  DeliveryAt: number
  BenefitIntervalHours: number
  UnitLockDeposit: string
  StartMode: StartMode
  UnitType: GoodUnitType
  QuantityCalculateType: GoodUnitCalculateType
  DurationType: GoodDurationType
  DurationCalculateType: GoodUnitCalculateType
  StartAt: number
  CreatedAt: number
  UpdatedAt: number
  DeletedAt: number
}

export interface CreateGoodRequest extends BaseRequest {
  DeviceInfoID: string
  DurationDays: number
  CoinTypeID: string
  VendorLocationID: string
  UnitPrice: string
  BenefitType: string
  GoodType: string
  Title: string
  QuantityUnit: string
  QuantityUnitAmount: string
  DeliveryAt: number
  StartAt: number
  StartMode: StartMode
  TestOnly: boolean
  Total: string
  Posters: string[]
  Labels: GoodLabel[]
  BenefitIntervalHours: number
  UnitLockDeposit: string
  UnitType: GoodUnitType
  QuantityCalculateType: GoodUnitCalculateType
  DurationType: GoodDurationType
  DurationCalculateType: GoodUnitCalculateType
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
  DeviceInfoID?: string
  DurationDays?: number
  CoinTypeID?: string
  VendorLocationID?: string
  UnitPrice?: string
  Title?: string
  QuantityUnit?: string
  QuantityUnitAmount?: string
  DeliveryAt?: number
  StartMode?: StartMode
  StartAt?: number
  TestOnly?: boolean
  Total?: string
  Posters?: string[]
  Labels?: string[]
  BenefitIntervalHours?: number
  UnitLockDeposit?: string
  UnitType?: GoodUnitType
  QuantityCalculateType?: GoodUnitCalculateType
  DurationType?: GoodDurationType
  DurationCalculateType?: GoodUnitCalculateType
}

export interface UpdateGoodResponse {
  Info: Good
}

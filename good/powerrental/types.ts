import { BaseRequest } from 'src/npoolstore/request'
import { BenefitState, BenefitType, GoodDurationType, GoodStockMode, GoodType, StartMode } from '../base'
import { GoodCoin } from '../good/coin'
import { MiningGoodStock, MiningGoodStockInfo } from '../good/stock'
import { RewardInfo } from '../good/coin/reward/types'

export interface PowerRental {
  ID: number
  EntID: string
  GoodID: string

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
  Name: string
  ServiceStartAt: number
  StartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  Purchasable: boolean
  Online: boolean
  StockMode: GoodStockMode

  StockID: string
  Total: string
  SpotQuantity: string
  Locked: string
  InService: string
  WaitStart: string
  Sold: string
  AppReserved: string

  RewardState: BenefitState
  LastRewardAt: number

  GoodCoins: GoodCoin[]
  MiningGoodStocks: MiningGoodStockInfo[]
  Rewards: RewardInfo[]

  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreatePowerRentalRequest extends BaseRequest {
  DeviceTypeID: string
  VendorLocationID: string
  UnitPrice: string
  QuantityUnit: string
  QuantityUnitAmount: string
  DeliveryAt?: number
  UnitLockDeposit?: string
  DurationDisplayType: GoodDurationType
  GoodType: GoodType
  Name: string
  ServiceStartAt?: number
  StartMode: StartMode
  TestOnly?: boolean
  BenefitIntervalHours?: number
  Purchasable?: boolean
  Online?: boolean
  StockMode: GoodStockMode
  Total: string
  MiningGoodStocks: MiningGoodStock[]
}

export interface AdminCreatePowerRentalResponse {
  Info: PowerRental
}

export interface AdminUpdatePowerRentalRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
  DeviceTypeID?: string
  VendorLocationID?: string
  UnitPrice?: string
  QuantityUnit?: string
  QuantityUnitAmount?: string
  DeliveryAt?: number
  UnitLockDeposit?: string
  DurationDisplayType?: GoodDurationType
  GoodType?: GoodType
  Name?: string
  ServiceStartAt?: number
  StartMode?: StartMode
  TestOnly?: boolean
  BenefitIntervalHours?: number
  Purchasable?: boolean
  Online?: boolean
  StockMode?: GoodStockMode
  Total?: string
  MiningGoodStocks: MiningGoodStock[]
}

export interface AdminUpdatePowerRentalResponse {
  Info: PowerRental
}

export interface GetPowerRentalRequest extends BaseRequest {
  GoodID: string
}

export interface GetPowerRentalResponse {
  Info: PowerRental
}

export interface GetPowerRentalsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetPowerRentalsResponse {
  Infos: PowerRental[]
  Total: number
}

export interface AdminDeletePowerRentalRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
}

export interface AdminDeletePowerRentalResponse {
  Info: PowerRental
}

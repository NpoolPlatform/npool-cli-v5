import { BaseRequest } from '../../request'
import { MiningpoolType, CoinType, RevenueType } from '../base'

export interface Coin {
  ID: number
  EntID: string
  PoolID: string
  CoinTypeID: string
  CoinType: CoinType
  RevenueType: RevenueType
  FeeRatio: string
  FixedRevenueAble: boolean
  LeastTransferAmount: string
  BenefitIntervalSeconds: number
  MiningpoolType: MiningpoolType
  Remark: string
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateCoinRequest extends BaseRequest{
  PoolID: string
  CoinTypeID: string
  CoinType: CoinType
  RevenueType: RevenueType
  FeeRatio: string
  FixedRevenueAble: boolean
  LeastTransferAmount: string
  BenefitIntervalSeconds: number
  Remark: string
}

export interface AdminCreateCoinResponse { Info: Coin }

export interface AdminUpdateCoinRequest extends BaseRequest{
  ID: number
  EntID: string
  RevenueType: RevenueType
  FeeRatio: string
  FixedRevenueAble: boolean
  LeastTransferAmount: string
  BenefitIntervalSeconds: number
  Remark: string
}

export interface AdminUpdateCoinResponse { Info: Coin }

export interface AdminGetCoinsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetCoinsResponse {
  Infos: Coin[]
  Total: number
}

export interface AdminDeleteCoinRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface AdminDeleteCoinResponse { Info: Coin }

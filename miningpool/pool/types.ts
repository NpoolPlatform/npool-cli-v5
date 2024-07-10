import { BaseRequest } from '../../request'
import { MiningpoolType, CoinType, RevenueType } from '../base'

export interface Coin {
  EntID: string
  PoolID: string
  CoinTypeID: string
  CoinType: CoinType
  RevenueType: RevenueType
  FeeRatio: string
  FixedRevenueAble: boolean
  LeastTransferAmount: string
  BenefitIntervalSeconds: number
  Remark: string
  CreatedAt: number
  UpdatedAt: number
}

export interface FractionRule {
  EntID: string
  PoolCoinTypeID: string
  WithdrawInterval: number
  MinAmount: string
  WithdrawRate: string
  CreatedAt: number
  UpdatedAt: number
}

export interface Pool {
  ID: number
  EntID: string
  MiningpoolType: MiningpoolType
  Name: string
  Site: string
  Logo: string
  Description: string
  CreatedAt: number
  UpdatedAt: number
  Coins: Coin[]
  FractionRules: FractionRule[]
}

export interface AdminCreatePoolRequest extends BaseRequest{
  MiningpoolType: MiningpoolType
  Name: string
  Site: string
  Logo: string
  Description: string
}

export interface AdminCreatePoolResponse {
  Info: Pool
}

export interface AdminUpdatePoolRequest extends BaseRequest{
  ID: number
  EntID: string
  Name: string
  Site: string
  Logo: string
  Description: string
}

export interface AdminUpdatePoolResponse {
  Info: Pool
}

export interface AdminGetPoolsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetPoolsResponse {
  Infos: Pool[]
  Total: number
}

export interface AdminDeletePoolRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface AdminDeletePoolResponse {
  Info: Pool
}

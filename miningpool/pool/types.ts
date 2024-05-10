import { BaseRequest } from '../../request'
import { MiningpoolType, CoinType, RevenueType } from '../base'

export interface Coin {
  EntID: string
  PoolID: string
  CoinType: CoinType
  RevenueType: RevenueType
  FeeRatio: string
  FixedRevenueAble: boolean
  LeastTransferAmount: string
  BenefitIntervalSeconds: number
  Remark: string
  MiningpoolType: MiningpoolType
}

export interface FractionRule {
  EntID: string
  CoinID: string
  WithdrawInterval: number
  MinAmount: string
  WithdrawRate: string
  MiningpoolTypeStr: string
  MiningpoolType: MiningpoolType
  CoinType: CoinType
}

export interface Pool {
  ID: number
  EntID: string
  MiningpoolType: MiningpoolType
  Name: string
  Site: string
  Logo: string
  Description: string
  Coins: Coin[]
  FractionRules: FractionRule[]
}

export interface AdminGetPoolsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetPoolsResponse {
  Infos: Pool[]
  Total: number
}

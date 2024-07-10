import { BaseRequest } from '../../../request'
import { MiningpoolType, CoinType, RevenueType } from '../../base'

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
}

export interface Pool {
  ID: number
  EntID: string
  AppID: string
  PoolID: string
  MiningpoolType: MiningpoolType
  Name: string
  Site: string
  Logo: string
  Description: string
  Coins: Coin[]
  FractionRules: FractionRule[]
}

export interface AdminCreatePoolRequest extends BaseRequest{
  PoolID: string
  TargetAppID: string
}

export interface AdminCreatePoolResponse {
  Info: Pool
}

export interface GetPoolRequest extends BaseRequest{
  EntID: string
  AppID: string
}

export interface GetPoolResponse {
  Info: Pool
}

export interface GetPoolsRequest extends BaseRequest{
  AppID: string
  Offset: number
  Limit: number
}

export interface GetPoolsResponse {
  Infos: Pool[]
  Total: number
}

export interface AdminGetPoolsRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetPoolsResponse{
  Infos: Pool[]
  Total: number
}

export interface AdminDeletePoolRequest extends BaseRequest{
  ID: number
  EntID: string
  TargetAppID: string
}

export interface AdminDeletePoolResponse{
  Info: Pool
}

import { BaseRequest } from '../../request'
import { MiningpoolType, CoinType } from '../base'

export interface FractionRule {
  ID: number
  EntID: string
  PoolCoinTypeID: string
  WithdrawInterval: number
  MinAmount: string
  WithdrawRate: string
  MiningpoolType: MiningpoolType
  CoinType: CoinType
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateFractionRuleRequest extends BaseRequest{
  PoolCoinTypeID: string
  WithdrawInterval: number
  MinAmount: string
  WithdrawRate: string
}

export interface AdminCreateFractionRuleResponse {
  Info: FractionRule
}

export interface AdminUpdateFractionRuleRequest extends BaseRequest{
  ID: number
  EntID: string
  WithdrawRate: string
  MinAmount: string
  WithdrawInterval: number
}

export interface AdminUpdateFractionRuleResponse {
  Info: FractionRule
}

export interface AdminGetFractionRulesRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetFractionRulesResponse {
  Infos: FractionRule[]
  Total: number
}

export interface AdminDeleteFractionRuleRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface AdminDeleteFractionRuleResponse {
  Info: FractionRule
}

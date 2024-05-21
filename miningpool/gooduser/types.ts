import { BaseRequest } from '../../request'
import { MiningpoolType, CoinType, RevenueType } from '../base'

export interface GoodUser {
  ID: number
  EntID: string
  RootUserID: string
  Name: string
  ReadPageLink: string
  PoolID: string
  MiningpoolType: MiningpoolType
  PoolCoinTypeID: string
  CoinTypeID: string
  CoinType: CoinType
  RevenueType: RevenueType
  FeeRatio: string
  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreateGoodUserRequest extends BaseRequest{
  PoolCoinTypeID: string
  RootUserID: string
}

export interface AdminCreateGoodUserResponse { Info: GoodUser }

export interface AdminGetGoodUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface AdminGetGoodUsersResponse {
  Infos: GoodUser[]
  Total: number
}

export interface AdminDeleteGoodUserRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface AdminDeleteGoodUserResponse { Info: GoodUser }

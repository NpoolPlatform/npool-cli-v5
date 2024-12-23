import { BaseRequest } from 'src/npoolstore/request'
import { BenefitState, BenefitType, GoodType, StartMode, ContractState } from '../base'
import { GoodCoin } from '../good/coin'
import { RewardInfo } from '../good/coin/reward/types'

export interface Pledge {
  ID: number
  EntID: string
  GoodID: string
  CoinTypeID: string
  ContractDeploymentAddress: string
  ContractCalculateAddress: string
  ContractCodeURL: string
  ContractCodeBranch: string
  ContractState: ContractState

  GoodType: GoodType
  BenefitType: BenefitType
  Name: string
  ServiceStartAt: number
  StartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  Purchasable: boolean
  Online: boolean

  RewardState: BenefitState
  LastRewardAt: number

  GoodCoins: GoodCoin[]
  Rewards: RewardInfo[]

  CreatedAt: number
  UpdatedAt: number
}

export interface AdminCreatePledgeRequest extends BaseRequest {
  ContractCodeURL: string
  ContractCodeBranch: string
  CoinTypeID: string
  GoodType: GoodType
  Name: string
  ServiceStartAt?: number
  StartMode: StartMode
  TestOnly?: boolean
  BenefitIntervalHours?: number
  Purchasable?: boolean
  Online?: boolean
}

export interface AdminCreatePledgeResponse {
  Info: Pledge
}

export interface AdminUpdatePledgeRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
  ContractCodeURL?: string
  ContractCodeBranch?: string
  GoodType?: GoodType
  Name?: string
  ServiceStartAt?: number
  StartMode?: StartMode
  TestOnly?: boolean
  BenefitIntervalHours?: number
  Purchasable?: boolean
  Online?: boolean
}

export interface AdminUpdatePledgeResponse {
  Info: Pledge
}

export interface GetPledgeRequest extends BaseRequest {
  GoodID: string
}

export interface GetPledgeResponse {
  Info: Pledge
}

export interface GetPledgesRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetPledgesResponse {
  Infos: Pledge[]
  Total: number
}

export interface AdminDeletePledgeRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
}

export interface AdminDeletePledgeResponse {
  Info: Pledge
}

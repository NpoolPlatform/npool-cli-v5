import { BaseRequest } from 'src/npoolstore/request'
import { BenefitState, BenefitType, GoodType, StartMode, ContractState } from '../base'
import { GoodCoin } from '../good/coin'
import { RewardInfo } from '../good/coin/reward/types'

export interface DelegatedStaking {
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

export interface AdminCreateDelegatedStakingRequest extends BaseRequest {
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

export interface AdminCreateDelegatedStakingResponse {
  Info: DelegatedStaking
}

export interface AdminUpdateDelegatedStakingRequest extends BaseRequest {
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

export interface AdminUpdateDelegatedStakingResponse {
  Info: DelegatedStaking
}

export interface GetDelegatedStakingRequest extends BaseRequest {
  GoodID: string
}

export interface GetDelegatedStakingResponse {
  Info: DelegatedStaking
}

export interface GetDelegatedStakingsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetDelegatedStakingsResponse {
  Infos: DelegatedStaking[]
  Total: number
}

export interface AdminDeleteDelegatedStakingRequest extends BaseRequest {
  ID: number
  EntID: string
  GoodID: string
}

export interface AdminDeleteDelegatedStakingResponse {
  Info: DelegatedStaking
}

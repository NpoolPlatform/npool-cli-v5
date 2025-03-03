import { BaseRequest } from '../../../request'
import { BenefitType, GoodType, StartMode } from '../../base'
import { GoodCoinInfo } from '../../good/coin'
import { RewardInfo } from '../../good/coin/reward/types'
import { DescriptionInfo } from '../good/description'
import { DisplayColorInfo } from '../good/display/color'
import { DisplayNameInfo } from '../good/display/name'
import { LabelInfo } from '../good/label'
import { Poster } from '../good/poster'
import { RequiredInfo } from '../good/required'

export interface AppDelegatedStaking {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  GoodID: string
  AppGoodID: string

  GoodType: GoodType
  BenefitType: BenefitType
  GoodName: string
  ServiceStartAt: number
  GoodStartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  GoodPurchasable: boolean
  GoodOnline: boolean

  AppGoodPurchasable: boolean
  AppGoodOnline: boolean
  EnableProductPage: boolean
  ProductPage: string
  Visible: boolean
  AppGoodName: string
  DisplayIndex: number
  Banner: string

  Likes: number
  Dislikes: number
  Score: string
  ScoreCount: number
  RecommendCount: number
  CommentCount: number

  LastRewardAt: number
  AppGoodStartMode: StartMode
  EnableSetCommission: boolean

  GoodCoins: GoodCoinInfo[]
  CoinTypeID: string
  CoinName: string
  CoinUnit: string
  CoinEnv: string
  CoinLogo: string

  Descriptions: DescriptionInfo[]
  Rewards: RewardInfo[]
  Posters: Poster[]
  DisplayNames: DisplayNameInfo[]
  DisplayColors: DisplayColorInfo[]
  Labels: LabelInfo[]
  Requireds: RequiredInfo[]

  CreatedAt: number
  UpdatedAt: number
}

export interface GetAppDelegatedStakingsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetAppDelegatedStakingsResponse {
  Infos: AppDelegatedStaking[]
  Total: number
}

export interface GetAppDelegatedStakingRequest extends BaseRequest {
  AppGoodID: string
}

export interface GetAppDelegatedStakingResponse {
  Info: AppDelegatedStaking
}

export interface UpdateAppDelegatedStakingRequest extends BaseRequest {
  ID: number
  EntID: string
  AppID: string
  AppGoodID: string

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name?: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt?: number
  EnableSetCommission?: boolean
  StartMode?: StartMode
}

export interface UpdateAppDelegatedStakingResponse {
  Info: AppDelegatedStaking
}

export interface AdminCreateAppDelegatedStakingRequest extends BaseRequest {
  TargetAppID: string
  GoodID: string

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt: number
  EnableSetCommission?: boolean
  StartMode?: StartMode
}

export interface AdminCreateAppDelegatedStakingResponse {
  Info: AppDelegatedStaking
}

export interface AdminGetAppDelegatedStakingsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface AdminGetAppDelegatedStakingsResponse {
  Infos: AppDelegatedStaking[]
  Total: number
}

export interface AdminUpdateAppDelegatedStakingRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string

  Purchasable?: boolean
  EnableProductPage?: boolean
  ProductPage?: string
  Online?: boolean
  Visible?: boolean
  Name?: string
  DisplayIndex?: number
  Banner?: string

  ServiceStartAt?: number
  EnableSetCommission?: boolean
  StartMode?: StartMode
}

export interface AdminUpdateAppDelegatedStakingResponse {
  Info: AppDelegatedStaking
}

export interface AdminDeleteAppDelegatedStakingRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  AppGoodID: string
}

export interface AdminDeleteAppDelegatedStakingResponse {
  Info: AppDelegatedStaking
}

import { BaseRequest } from '../request'
import { BenefitType, GoodType, StartMode } from './base'

export interface Good {
  ID: number
  EntID: string
  GoodType: GoodType
  BenefitType: BenefitType
  Name: string
  ServiceStartAt: number
  StartMode: StartMode
  TestOnly: boolean
  BenefitIntervalHours: number
  Purchasable: boolean
  Online: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface GetGoodsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetGoodsResponse {
  Infos: Array<Good>
  Total: number
}

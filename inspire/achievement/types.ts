import { BaseRequest } from '../../request'
import { SettleAmountType, SettleInterval, SettleMode, SettleType } from '../commission'

export interface GoodAchievement {
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  GoodID: string
  GoodName: string
  GoodUnit: string
  CommissionValue: string
  CommissionThreshold: string
  CommissionSettleType: SettleType
  CommissionSettleMode: SettleMode
  CommissionSettleAmountType: SettleAmountType
  CommissionSettleInterval: SettleInterval
  TotalUnits: string
  SelfUnits: string
  TotalAmount: string
  SelfAmount: string
  TotalCommission: string
  SelfCommission: string
  SuperiorCommission: string
  AppGoodID: string
}

export interface Achievement {
  AppID: string
  UserID: string
  InviterID: string
  Username: string
  EmailAddress: string
  PhoneNO: string
  FirstName: string
  LastName: string
  CreatedAt: number
  InvitedAt: number
  Kol: boolean
  TotalInvitees: number
  Achievements: Array<GoodAchievement>
}

export interface GetUserAchievementsRequest extends BaseRequest {
  UserIDs: Array<string>
  Offset: number
  Limit: number
}

export interface GetUserAchievementsResponse {
  Infos: Array<Achievement>
}

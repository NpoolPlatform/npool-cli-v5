import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request/action'
import {
  Achievement,
  GetUserAchievementsRequest,
  GetUserAchievementsResponse,
  GetAchievementsRequest,
  GetAchievementsResponse
} from './types'
import { formalizeAppID } from '../../appuser/app/local'
import { formalizeUserID } from '../..//appuser/user'
import { SettleAmountType, SettleInterval, SettleMode, SettleType } from '../commission'

export const useAchievementStore = defineStore('achievement', {
  state: () => ({
    Achievements: new Map<string, Array<Achievement>>()
  }),
  getters: {
    achievement (): (appID: string | undefined, userID: string) => Achievement | undefined {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.find((el) => !userID || el.UserID === userID)
      }
    },
    achievements (): (appID: string | undefined, userID?: string) => Array<Achievement> {
      return (appID: string | undefined, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || el.UserID === userID) || []
      }
    },
    inviteeAchievements (): (appID: string | undefined, userID: string, kol?: boolean) => Array<Achievement> {
      return (appID: string | undefined, userID: string, kol?: boolean) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || (el.InviterID === userID && (kol === undefined || el.Kol === kol))) || []
      }
    },
    inviterAchievements (): (appID: string | undefined, userID: string) => Array<Achievement> {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || el.InviterID !== userID) || []
      }
    },
    totalUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        let units = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.UserID !== userID) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              units += Number(el1.TotalUnits)
            }
          })
        })
        return units
      }
    },
    totalInviteeUnits (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => {
        appID = formalizeAppID(appID)
        let units = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.InviterID !== userID) {
            return
          }
          if (kol !== undefined && el.Kol !== kol) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              units += Number(el1.TotalUnits)
            }
          })
        })
        return units
      }
    },
    totalAmount (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        let amount = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.UserID !== userID) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              amount += Number(el1.TotalAmount)
            }
          })
        })
        return amount
      }
    },
    totalInviteeAmount (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => {
        appID = formalizeAppID(appID)
        let amount = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.InviterID !== userID) {
            return
          }
          if (kol !== undefined && el.Kol !== kol) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              amount += Number(el1.TotalAmount)
            }
          })
        })
        return amount
      }
    },
    commissionAmount (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return Number(this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.TotalCommission) || 0
      }
    },
    commissionPercent (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return Number(this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionValue) || 0
      }
    },
    settleType (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => SettleType | undefined {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionSettleType
      }
    },
    settleAmountType (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => SettleAmountType | undefined {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionSettleAmountType
      }
    },
    settleMode (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => SettleMode | undefined {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionSettleMode
      }
    },
    settleInterval (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => SettleInterval | undefined {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionSettleInterval
      }
    },
    threshold (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return Number(this.Achievements.get(appID)?.find((el) => el.UserID === userID)?.Achievements.find((el1) => {
          let ok = true
          if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el1.AppGoodID === appGoodID
          return ok
        })?.CommissionThreshold) || 0
      }
    },
    totalSuperiorCommission (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string) => {
        appID = formalizeAppID(appID)
        let amount = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.UserID !== userID) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              amount += Number(el1.SuperiorCommission)
            }
          })
        })
        return amount
      }
    },
    totalInviteeSuperiorCommission (): (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => number {
      return (appID: string | undefined, userID: string | undefined, coinTypeID?: string, appGoodID?: string, kol?: boolean) => {
        appID = formalizeAppID(appID)
        let amount = 0
        this.Achievements.get(appID)?.forEach((el) => {
          if (userID && el.InviterID !== userID) {
            return
          }
          if (kol !== undefined && el.Kol !== kol) {
            return
          }
          el.Achievements.forEach((el1) => {
            let ok = true
            if (coinTypeID) ok &&= el1.CoinTypeID === coinTypeID
            if (appGoodID) ok &&= el1.AppGoodID === appGoodID
            if (ok) {
              amount += Number(el1.SuperiorCommission)
            }
          })
        })
        return amount
      }
    }
  },
  actions: {
    addAchievements (appID: string | undefined, achievements: Array<Achievement>) {
      appID = formalizeAppID(appID)
      let _achievements = this.Achievements.get(appID) as Array<Achievement>
      if (!_achievements) {
        _achievements = []
      }
      achievements.forEach((achievement) => {
        const index = _achievements.findIndex((el) => el.UserID === achievement.UserID)
        _achievements.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, achievement)
      })
      this.Achievements.set(appID, _achievements)
    },
    getUserAchievements (req: GetUserAchievementsRequest, done: (error: boolean, rows?: Array<Achievement>) => void) {
      doActionWithError<GetUserAchievementsRequest, GetUserAchievementsResponse>(
        API.GET_USER_ACHIEVEMENTS,
        req,
        req.Message,
        (resp: GetUserAchievementsResponse): void => {
          this.addAchievements(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getAchievements (req: GetAchievementsRequest, done: (error: boolean, rows?: Array<Achievement>) => void) {
      doActionWithError<GetAchievementsRequest, GetAchievementsResponse>(
        API.GET_ACHIEVEMENTS,
        req,
        req.Message,
        (resp: GetAchievementsResponse): void => {
          this.addAchievements(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

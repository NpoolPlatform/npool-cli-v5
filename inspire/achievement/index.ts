import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request/action'
import { Achievement, GetUserAchievementsRequest, GetUserAchievementsResponse } from './types'
import { formalizeAppID } from 'src/npoolstore/appuser/app/local'

export const useAchievementStore = defineStore('achievement', {
  state: () => ({
    Achievements: new Map<string, Array<Achievement>>()
  }),
  getters: {
    achievements (): (appID: string | undefined, userID?: string) => Array<Achievement> {
      return (appID: string | undefined, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || el.UserID === userID) || []
      }
    },
    inviteeAchievements (): (appID: string | undefined, userID: string) => Array<Achievement> {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || el.InviterID === userID) || []
      }
    },
    inviterAchievements (): (appID: string | undefined, userID: string) => Array<Achievement> {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.Achievements.get(appID)?.filter((el) => !userID || el.InviterID !== userID) || []
      }
    },
    addAchievements (): (appID: string | undefined, achievements: Array<Achievement>) => void {
      return (appID: string | undefined, achievements: Array<Achievement>) => {
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
      }
    }
  },
  actions: {
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
    }
  }
})

export * from './types'
export * from './const'

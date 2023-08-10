import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from 'npool-cli-v4'
import { Achievement, GetUserAchievementsRequest, GetUserAchievementsResponse } from './types'

export const useAchievementStore = defineStore('achievement', {
  state: () => ({
    Achievements: [] as Array<Achievement>
  }),
  getters: {
    achievements (): (userID?: string) => Array<Achievement> {
      return (userID?: string) => {
        return userID ? this.Achievements.filter((el) => el.UserID === userID) : this.Achievements
      }
    },
    inviteeAchievements (): (userID: string) => Array<Achievement> {
      return (userID: string) => {
        return this.Achievements.filter((el) => el.InviterID === userID)
      }
    },
    inviterAchievements (): (userID: string) => Array<Achievement> {
      return (userID: string) => {
        return this.Achievements.filter((el) => el.InviterID !== userID)
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
          resp.Infos.forEach((el) => {
            const index = this.Achievements.findIndex((el1) => el.UserID === el1.UserID)
            if (index >= 0) {
              return
            }
            this.Achievements.push(el)
          })
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

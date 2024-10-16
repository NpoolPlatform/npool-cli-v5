import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetUserRewardsRequest,
  AdminGetUserRewardsResponse,
  UserGetUserRewardsRequest,
  UserGetUserRewardsResponse,
  UserReward
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useUserRewardStore = defineStore('user-rewards', {
  state: () => ({
    UserRewards: new Map<string, Array<UserReward>>()
  }),
  getters: {
    userRewards (): (appID?: string) => Array<UserReward> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.UserRewards.get(appID) || []
      }
    }
  },
  actions: {
    addUserRewards (appID: string | undefined, userRewards: Array<UserReward>) {
      appID = formalizeAppID(appID)
      let _userRewards = this.UserRewards.get(appID) as Array<UserReward>
      if (!_userRewards) {
        _userRewards = []
      }
      userRewards.forEach((userReward) => {
        const index = _userRewards.findIndex((el) => el.ID === userReward.ID)
        _userRewards.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, userReward)
      })
      this.UserRewards.set(appID, _userRewards)
    },
    adminGetUserRewards (req: AdminGetUserRewardsRequest, done: (error: boolean, rows?: Array<UserReward>) => void) {
      doActionWithError<AdminGetUserRewardsRequest, AdminGetUserRewardsResponse>(
        API.ADMIN_GET_USERREWARDS,
        req,
        req.Message,
        (resp: AdminGetUserRewardsResponse): void => {
          this.addUserRewards(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    userGetConfigs (req: UserGetUserRewardsRequest, done: (error: boolean, rows?: Array<UserReward>) => void) {
      doActionWithError<UserGetUserRewardsRequest, UserGetUserRewardsResponse>(
        API.USER_GET_USERREWARDS,
        req,
        req.Message,
        (resp: UserGetUserRewardsResponse): void => {
          this.addUserRewards(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetUserCoinRewardsRequest,
  AdminGetUserCoinRewardsResponse,
  UserGetUserCoinRewardsRequest,
  UserGetUserCoinRewardsResponse,
  UserCoinReward
} from './types'
import { doActionWithError } from '../../../../request/action'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useUserCoinRewardStore = defineStore('user-coin-rewards', {
  state: () => ({
    UserCoinRewards: new Map<string, Array<UserCoinReward>>()
  }),
  getters: {
    userCoinRewards (): (appID?: string) => Array<UserCoinReward> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.UserCoinRewards.get(appID) || []
      }
    }
  },
  actions: {
    addUserCoinRewards (appID: string | undefined, userCoinRewards: Array<UserCoinReward>) {
      appID = formalizeAppID(appID)
      let _userCoinRewards = this.UserCoinRewards.get(appID) as Array<UserCoinReward>
      if (!_userCoinRewards) {
        _userCoinRewards = []
      }
      userCoinRewards.forEach((userCoinReward) => {
        const index = _userCoinRewards.findIndex((el) => el.ID === userCoinReward.ID)
        _userCoinRewards.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, userCoinReward)
      })
      this.UserCoinRewards.set(appID, _userCoinRewards)
    },
    adminGetUserCoinRewards (req: AdminGetUserCoinRewardsRequest, done: (error: boolean, rows?: Array<UserCoinReward>) => void) {
      doActionWithError<AdminGetUserCoinRewardsRequest, AdminGetUserCoinRewardsResponse>(
        API.ADMIN_GET_USERCOINREWARDS,
        req,
        req.Message,
        (resp: AdminGetUserCoinRewardsResponse): void => {
          this.addUserCoinRewards(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    userGetCoinConfigs (req: UserGetUserCoinRewardsRequest, done: (error: boolean, rows?: Array<UserCoinReward>) => void) {
      doActionWithError<UserGetUserCoinRewardsRequest, UserGetUserCoinRewardsResponse>(
        API.USER_GET_USERCOINREWARDS,
        req,
        req.Message,
        (resp: UserGetUserCoinRewardsResponse): void => {
          this.addUserCoinRewards(undefined, resp.Infos)
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

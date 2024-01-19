import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  RewardHistory,
  GetHistoriesRequest,
  GetHistoriesResponse
} from './types'

export const useRewardHistoryStore = defineStore('rewardhistory', {
  state: () => ({
    Rewards: [] as Array<RewardHistory>
  }),
  getters: {
    rewardHistories (): (goodID?: string) => Array<RewardHistory> {
      return (goodID?: string) => {
        return this.Rewards.filter((el) => el.GoodID === goodID) || []
      }
    }
  },
  actions: {
    addRewardHistories (rewards: Array<RewardHistory>) {
      rewards.forEach((reward) => {
        if (!reward) return
        const index = this.Rewards.findIndex((el) => el.EntID === reward.EntID)
        this.Rewards.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, reward)
      })
    },
    getRewardHistories (req: GetHistoriesRequest, done: (error: boolean, rows?: Array<RewardHistory>, total?: number) => void) {
      doActionWithError<GetHistoriesRequest, GetHistoriesResponse>(
        API.GET_GOODREWARDHISTORIES,
        req,
        req.Message,
        (resp: GetHistoriesResponse): void => {
          this.addRewardHistories(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'


import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../../../request'
import {
  RewardHistory,
  GetHistoriesRequest,
  GetHistoriesResponse
} from './types'

export const useRewardHistoryStore = defineStore('rewardHistories', {
  state: () => ({
    RewardHistories: [] as Array<RewardHistory>
  }),
  getters: {
    rewardHistories () {
      return () => this.RewardHistories
    }
  },
  actions: {
    addRewardHistories (rewardHistories: Array<RewardHistory>) {
      rewardHistories.forEach((rewardHistory) => {
        const index = this.RewardHistories.findIndex((el: RewardHistory) => el.EntID === rewardHistory.EntID)
        this.RewardHistories.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, rewardHistory)
      })
    },
    getRewardHistories (req: GetHistoriesRequest, done: (error: boolean, rewardHistories?: Array<RewardHistory>) => void) {
      doActionWithError<GetHistoriesRequest, GetHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetHistoriesResponse): void => {
          this.addRewardHistories(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

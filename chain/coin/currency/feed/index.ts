import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFeedRequest,
  CreateFeedResponse,
  CoinFeed,
  GetFeedsRequest,
  GetFeedsResponse,
  UpdateFeedRequest,
  UpdateFeedResponse
} from './types'
import { doActionWithError } from '../../../../request'

export const useCoinFeedStore = defineStore('coin-feeds', {
  state: () => ({
    Feeds: [] as Array<CoinFeed>
  }),
  getters: {
    feeds () {
      return () => this.Feeds.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    addFeeds (): (feeds: Array<CoinFeed>) => void {
      return (feeds: Array<CoinFeed>) => {
        feeds.forEach((feed) => {
          const index = this.Feeds.findIndex((el) => el.ID === feed.ID)
          this.Feeds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feed)
        })
      }
    }
  },
  actions: {
    getFeeds (req: GetFeedsRequest, done: (error: boolean, rows?: Array<CoinFeed>) => void) {
      doActionWithError<GetFeedsRequest, GetFeedsResponse>(
        API.GET_FEEDS,
        req,
        req.Message,
        (resp: GetFeedsResponse): void => {
          this.addFeeds(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createFeed (req: CreateFeedRequest, done: (error: boolean, row?: CoinFeed) => void) {
      doActionWithError<CreateFeedRequest, CreateFeedResponse>(
        API.CREATE_FEED,
        req,
        req.Message,
        (resp: CreateFeedResponse): void => {
          this.addFeeds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    updateFeed (req: UpdateFeedRequest, done: (error: boolean, row?: CoinFeed) => void) {
      doActionWithError<UpdateFeedRequest, UpdateFeedResponse>(
        API.UPDATE_FEED,
        req,
        req.Message,
        (resp: UpdateFeedResponse): void => {
          this.addFeeds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

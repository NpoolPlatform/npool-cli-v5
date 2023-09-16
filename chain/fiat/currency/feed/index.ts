import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFiatFeedRequest,
  CreateFiatFeedResponse,
  FiatFeed,
  GetFiatFeedsRequest,
  GetFiatFeedsResponse,
  UpdateFiatFeedRequest,
  UpdateFiatFeedResponse
} from './types'
import { doActionWithError } from '../../../../request'

export const useFiatFeedStore = defineStore('fiatfeed-v4', {
  state: () => ({
    Feeds: [] as Array<FiatFeed>
  }),
  getters: {
    feeds () {
      return () => this.Feeds.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    addFeeds (): (feeds: Array<FiatFeed>) => void {
      return (feeds: Array<FiatFeed>) => {
        feeds.forEach((feed) => {
          const index = this.Feeds.findIndex((el) => el.ID === feed.ID)
          this.Feeds.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feed)
        })
      }
    }
  },
  actions: {
    getFeeds (req: GetFiatFeedsRequest, done: (error: boolean, rows: Array<FiatFeed>) => void) {
      doActionWithError<GetFiatFeedsRequest, GetFiatFeedsResponse>(
        API.GET_FEEDS,
        req,
        req.Message,
        (resp: GetFiatFeedsResponse): void => {
          this.addFeeds(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatFeed>)
        }
      )
    },
    createFeed (req: CreateFiatFeedRequest, done: (error: boolean, row: FiatFeed) => void) {
      doActionWithError<CreateFiatFeedRequest, CreateFiatFeedResponse>(
        API.CREATE_FEED,
        req,
        req.Message,
        (resp: CreateFiatFeedResponse): void => {
          this.addFeeds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatFeed)
        }
      )
    },
    updateFeed (req: UpdateFiatFeedRequest, done: (error: boolean, row: FiatFeed) => void) {
      doActionWithError<UpdateFiatFeedRequest, UpdateFiatFeedResponse>(
        API.UPDATE_FEED,
        req,
        req.Message,
        (resp: UpdateFiatFeedResponse): void => {
          this.addFeeds([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatFeed)
        }
      )
    }
  }
})

export * from './types'

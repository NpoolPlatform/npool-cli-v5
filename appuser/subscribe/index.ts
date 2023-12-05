import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import {
  Subscribe,
  CreateSubscribeRequest,
  DeleteSubscribeRequest,
  DeleteSubscribeResponse,
  GetSubscribesRequest,
  GetSubscribesResponse,
  CreateSubscribeResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../app/local'

export const useSubscribeStore = defineStore('app-subscribe', {
  state: () => ({
    Subscribes: new Map<string, Array<Subscribe>>()
  }),
  getters: {
    subscribes (): (appID?: string | undefined) => Array<Subscribe> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Subscribes.get(appID) || []
      }
    }
  },
  actions: {
    createSubscribe (req: CreateSubscribeRequest, done: (error: boolean, row?: Subscribe) => void) {
      doActionWithError<CreateSubscribeRequest, CreateSubscribeResponse>(
        APIEnum.CREATE_SUBSCRIBE,
        req,
        req.Message,
        (resp: CreateSubscribeResponse): void => {
          let subscribes = this.Subscribes.get(resp.Info.AppID)
          if (!subscribes) {
            subscribes = []
          }
          subscribes.push(resp.Info)
          this.Subscribes.set(resp.Info.AppID, subscribes)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getSubscribes (req: GetSubscribesRequest, done: (error: boolean, rows?: Array<Subscribe>) => void) {
      doActionWithError<GetSubscribesRequest, GetSubscribesResponse>(
        APIEnum.GET_SUBSCRIBES,
        req,
        req.Message,
        (resp: GetSubscribesResponse): void => {
          resp.Infos.forEach((el) => {
            let subscribes = this.Subscribes.get(el.AppID)
            if (!subscribes) {
              subscribes = []
            }
            subscribes.push(el)
            this.Subscribes.set(el.AppID, subscribes)
          })
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    deleteSubscribe (req: DeleteSubscribeRequest, done: (error: boolean, row?: Subscribe) => void) {
      doActionWithError<DeleteSubscribeRequest, DeleteSubscribeResponse>(
        APIEnum.DELETE_SUBSCRIBE,
        req,
        req.Message,
        (resp: DeleteSubscribeResponse): void => {
          const subscribes = this.Subscribes.get(resp.Info.AppID) as Array<Subscribe>
          if (!subscribes) {
            done(true)
            return
          }
          const index = subscribes.findIndex((el) => el.ID === resp.Info.ID)
          subscribes.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
          this.Subscribes.set(resp.Info.AppID, subscribes)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

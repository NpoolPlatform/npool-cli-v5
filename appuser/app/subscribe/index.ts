import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import {
  AppSubscribe,
  CreateAppSubscribeRequest,
  CreateAppSubscribeResponse,
  DeleteAppSubscribeRequest,
  DeleteAppSubscribeResponse,
  GetAppSubscribesRequest,
  GetAppSubscribesResponse
} from './types'
import { doActionWithError } from '../../../request'

export const useAppSubscribeStore = defineStore('app-subscribe', {
  state: () => ({
    AppSubscribes: new Map<string, Array<AppSubscribe>>()
  }),
  getters: {
  },
  actions: {
    createAppSubscribe (req: CreateAppSubscribeRequest, done: (error: boolean, row?: AppSubscribe) => void) {
      doActionWithError<CreateAppSubscribeRequest, CreateAppSubscribeResponse>(
        APIEnum.CREATE_APP_SUBSCRIBE,
        req,
        req.Message,
        (resp: CreateAppSubscribeResponse): void => {
          let subscribes = this.AppSubscribes.get(req.TargetAppID)
          if (!subscribes) {
            subscribes = []
          }
          subscribes.push(resp.Info)
          this.AppSubscribes.set(req.TargetAppID, subscribes)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getAppSubscribes (req: GetAppSubscribesRequest, done: (error: boolean, rows?: Array<AppSubscribe>) => void) {
      doActionWithError<GetAppSubscribesRequest, GetAppSubscribesResponse>(
        APIEnum.GET_APP_SUBSCRIBES,
        req,
        req.Message,
        (resp: GetAppSubscribesResponse): void => {
          this.AppSubscribes.set(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    deleteAppSubscribe (req: DeleteAppSubscribeRequest, done: (error: boolean, row?: AppSubscribe) => void) {
      doActionWithError<DeleteAppSubscribeRequest, DeleteAppSubscribeResponse>(
        APIEnum.DELETE_APP_SUBSCRIBE,
        req,
        req.Message,
        (resp: DeleteAppSubscribeResponse): void => {
          const subscribes = this.AppSubscribes.get(req.TargetAppID) as Array<AppSubscribe>
          if (!subscribes) {
            done(true)
            return
          }
          const index = subscribes.findIndex((el) => el.ID === resp.Info.ID)
          subscribes.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
          this.AppSubscribes.set(req.TargetAppID, subscribes)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

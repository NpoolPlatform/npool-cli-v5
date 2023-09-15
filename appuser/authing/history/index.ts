import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  AuthHistory,
  GetAppAuthHistoriesRequest,
  GetAppAuthHistoriesResponse
} from './types'
import { formalizeAppID } from '../../app/local'

export const useChurchAuthingStore = defineStore('church-authing-v3', {
  state: () => ({
    Histories: new Map<string, Array<AuthHistory>>()
  }),
  getters: {
    addhistories (): (appID: string | undefined, auths: Array<AuthHistory>) => void {
      return (appID: string | undefined, auths: Array<AuthHistory>) => {
        appID = formalizeAppID(appID)
        let _auths = this.Histories.get(appID) as Array<AuthHistory>
        if (!_auths) {
          _auths = []
        }
        auths.forEach((auth) => {
          const index = _auths.findIndex((el) => el.ID === auth.ID)
          _auths.splice(index, 1, auth)
        })
        this.Histories.set(appID, _auths)
      }
    }
  },
  actions: {
    getAppAuthHistories (req: GetAppAuthHistoriesRequest, done: (error: boolean, histories?: Array<AuthHistory>) => void) {
      doActionWithError<GetAppAuthHistoriesRequest, GetAppAuthHistoriesResponse>(
        API.GET_APP_AUTHHISTORIES,
        req,
        req.Message,
        (resp: GetAppAuthHistoriesResponse): void => {
          let histories = this.Histories.get(req.TargetAppID)
          if (!histories) {
            histories = []
          }
          histories.push(...resp.Infos)
          this.Histories.set(req.TargetAppID, histories)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

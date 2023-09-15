import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppSendStatesRequest,
  GetAppSendStatesResponse,
  SendState
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAdminSendStateStore = defineStore('admin-sendstate-v4', {
  state: () => ({
    SendStates: new Map<string, Array<SendState>>()
  }),
  getters: {
    addStates (): (appID: string | undefined, states: Array<SendState>) => void {
      return (appID: string | undefined, states: Array<SendState>) => {
        appID = formalizeAppID(appID)
        let _states = this.SendStates.get(appID) as Array<SendState>
        if (!_states) {
          _states = []
        }
        states.forEach((state) => {
          const index = _states.findIndex((el) => el.ID === state.ID)
          _states.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, state)
        })
        this.SendStates.set(appID, _states)
      }
    }
  },
  actions: {
    getAppSendStates (req: GetAppSendStatesRequest, done: (error: boolean, rows: Array<SendState>) => void) {
      doActionWithError<GetAppSendStatesRequest, GetAppSendStatesResponse>(
        API.GET_APP_SENDSTATES,
        req,
        req.Message,
        (resp: GetAppSendStatesResponse): void => {
          this.addStates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<SendState>)
        }
      )
    }
  }
})

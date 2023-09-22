import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppReadStatesRequest,
  GetAppReadStatesResponse,
  CreateReadStateRequest,
  CreateReadStateResponse,
  ReadState,
  GetNAppReadStatesResponse,
  GetNAppReadStatesRequest
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useReadStateStore = defineStore('announcement-read-states', {
  state: () => ({
    ReadStates: new Map<string, Array<ReadState>>()
  }),
  getters: {
    states (): (appID?: string) => Array<ReadState> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.ReadStates.get(appID) || []
      }
    },
    addStates (): (appID: string | undefined, states: Array<ReadState>) => void {
      return (appID: string | undefined, states: Array<ReadState>) => {
        appID = formalizeAppID(appID)
        let _states = this.ReadStates.get(appID) as Array<ReadState>
        if (!_states) {
          _states = []
        }
        states.forEach((state) => {
          const index = _states.findIndex((el) => el.ID === state.ID)
          _states.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, state)
        })
        this.ReadStates.set(appID, _states)
      }
    }
  },
  actions: {
    getAppReadStates (req: GetAppReadStatesRequest, done: (error: boolean, rows: Array<ReadState>) => void) {
      doActionWithError<GetAppReadStatesRequest, GetAppReadStatesResponse>(
        API.GET_APP_READSTATES,
        req,
        req.Message,
        (resp: GetAppReadStatesResponse): void => {
          this.addStates(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<ReadState>)
        }
      )
    },
    createReadState (req: CreateReadStateRequest, done: (error: boolean, row: ReadState) => void) {
      doActionWithError<CreateReadStateRequest, CreateReadStateResponse>(
        API.CREATE_READSTATE,
        req,
        req.Message,
        (resp: CreateReadStateResponse): void => {
          this.addStates(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as ReadState)
        }
      )
    },
    getNAppReadStates (req: GetNAppReadStatesRequest, done: (error: boolean, rows: Array<ReadState>) => void) {
      doActionWithError<GetNAppReadStatesRequest, GetNAppReadStatesResponse>(
        API.GET_N_APP_READSTATES,
        req,
        req.Message,
        (resp: GetNAppReadStatesResponse): void => {
          this.addStates(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<ReadState>)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

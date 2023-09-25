import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppOpLogsRequest,
  GetAppOpLogsResponse,
  OpLog
} from './types'
import { doActionWithError } from '../request/action'
import { formalizeAppID } from '../appuser/app/local'

export const useOpLogStore = defineStore('oplog', {
  state: () => ({
    OpLogs: new Map<string, Array<OpLog>>(),
    Total: 0
  }),
  getters: {
    oplogs (): (appID?: string) => Array<OpLog> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.OpLogs.get(appID) || []
      }
    }
  },
  actions: {
    addLogs (appID?: string, logs?: Array<OpLog>) {
      appID = formalizeAppID(appID)
      this.OpLogs.set(appID, logs || [])
    },
    getAppOpLogs (req: GetAppOpLogsRequest, done: (error: boolean, rows?: Array<OpLog>, total?: number) => void) {
      doActionWithError<GetAppOpLogsRequest, GetAppOpLogsResponse>(
        API.GET_OP_LOGS,
        req,
        req.Message,
        (resp: GetAppOpLogsResponse): void => {
          this.addLogs(undefined, resp.Infos)
          this.Total = resp.Total
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

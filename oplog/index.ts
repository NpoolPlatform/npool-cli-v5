import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppOpLogsRequest,
  GetAppOpLogsResponse,
  OpLog
} from './types'
import { doActionWithError } from 'npool-cli-v4'

export const useOpLogStore = defineStore('oplog', {
  state: () => ({
    OpLogs: [] as Array<OpLog>
  }),
  getters: {},
  actions: {
    getAppOpLogs (req: GetAppOpLogsRequest, done: (error: boolean, rows: Array<OpLog>) => void) {
      doActionWithError<GetAppOpLogsRequest, GetAppOpLogsResponse>(
        API.GET_OP_LOGS,
        req,
        req.Message,
        (resp: GetAppOpLogsResponse): void => {
          this.OpLogs.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<OpLog>)
        }
      )
    }
  }
})

export * from './types'

import { defineStore } from 'pinia'
import { APIS as APIEnum } from './const'
import { API, GetAPIsRequest, GetAPIsResponse, UpdateAPIRequest, UpdateAPIResponse } from './types'
import { doActionWithError } from '../request'

export const useNpoolAPIStore = defineStore('npool-api', {
  state: () => ({
    APIs: [] as Array<API>
  }),
  getters: {
  },
  actions: {
    getAPIs (req: GetAPIsRequest, done: (error: boolean, rows?: Array<API>) => void) {
      doActionWithError<GetAPIsRequest, GetAPIsResponse>(
        APIEnum.GET_APIS,
        req,
        req.Message,
        (resp: GetAPIsResponse): void => {
          this.APIs.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateAPI (req: UpdateAPIRequest, done: (error: boolean, row?: API) => void) {
      doActionWithError<UpdateAPIRequest, UpdateAPIResponse>(
        APIEnum.UPDATE_API,
        req,
        req.Message,
        (resp: UpdateAPIResponse): void => {
          const index = this.APIs.findIndex((el) => el.ID === resp.Info.ID)
          this.APIs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

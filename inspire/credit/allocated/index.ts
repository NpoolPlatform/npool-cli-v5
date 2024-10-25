import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetCreditAllocatedsRequest,
  AdminGetCreditAllocatedsResponse,
  GetMyCreditAllocatedsRequest,
  GetMyCreditAllocatedsResponse,
  CreditAllocated
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useCreditAllocatedStore = defineStore('credit-allocateds', {
  state: () => ({
    CreditAllocateds: new Map<string, Array<CreditAllocated>>()
  }),
  getters: {
    creditAllocateds (): (appID?: string) => Array<CreditAllocated> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.CreditAllocateds.get(appID) || []
      }
    }
  },
  actions: {
    addCreditAllocateds (appID: string | undefined, UserTasks: Array<CreditAllocated>) {
      appID = formalizeAppID(appID)
      let _userTasks = this.CreditAllocateds.get(appID) as Array<CreditAllocated>
      if (!_userTasks) {
        _userTasks = []
      }
      UserTasks.forEach((UserTask) => {
        const index = _userTasks.findIndex((el) => el.ID === UserTask.ID)
        _userTasks.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, UserTask)
      })
      this.CreditAllocateds.set(appID, _userTasks)
    },
    adminGetCreditAllocateds (req: AdminGetCreditAllocatedsRequest, done: (error: boolean, rows?: Array<CreditAllocated>) => void) {
      doActionWithError<AdminGetCreditAllocatedsRequest, AdminGetCreditAllocatedsResponse>(
        API.ADMIN_GET_ALLOCATEDCREDITS,
        req,
        req.Message,
        (resp: AdminGetCreditAllocatedsResponse): void => {
          this.addCreditAllocateds(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getMyCreditAllocateds (req: GetMyCreditAllocatedsRequest, done: (error: boolean, rows?: Array<CreditAllocated>) => void) {
      doActionWithError<GetMyCreditAllocatedsRequest, GetMyCreditAllocatedsResponse>(
        API.GET_MY_ALLOCATEDCREDITS,
        req,
        req.Message,
        (resp: GetMyCreditAllocatedsResponse): void => {
          this.addCreditAllocateds(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

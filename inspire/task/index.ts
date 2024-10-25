import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminGetTasksRequest,
  AdminGetTasksResponse,
  GetMyTasksRequest,
  GetMyTasksResponse,
  UserTask
} from './types'
import { doActionWithError } from '../../request/action'
import { formalizeAppID } from '../../appuser/app/local'

export const useUserTaskStore = defineStore('user-tasks', {
  state: () => ({
    UserTasks: new Map<string, Array<UserTask>>()
  }),
  getters: {
    userTasks (): (appID?: string) => Array<UserTask> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.UserTasks.get(appID) || []
      }
    }
  },
  actions: {
    addUserTasks (appID: string | undefined, UserTasks: Array<UserTask>) {
      appID = formalizeAppID(appID)
      let _userTasks = this.UserTasks.get(appID) as Array<UserTask>
      if (!_userTasks) {
        _userTasks = []
      }
      UserTasks.forEach((UserTask) => {
        const index = _userTasks.findIndex((el) => el.ID === UserTask.ID)
        _userTasks.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, UserTask)
      })
      this.UserTasks.set(appID, _userTasks)
    },
    adminGetTasks (req: AdminGetTasksRequest, done: (error: boolean, rows?: Array<UserTask>) => void) {
      doActionWithError<AdminGetTasksRequest, AdminGetTasksResponse>(
        API.ADMIN_GET_TASKS,
        req,
        req.Message,
        (resp: AdminGetTasksResponse): void => {
          this.addUserTasks(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    getMyTasks (req: GetMyTasksRequest, done: (error: boolean, rows?: Array<UserTask>) => void) {
      doActionWithError<GetMyTasksRequest, GetMyTasksResponse>(
        API.GET_MY_TASKS,
        req,
        req.Message,
        (resp: GetMyTasksResponse): void => {
          this.addUserTasks(undefined, resp.Infos)
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

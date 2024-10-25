import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminCreateTaskConfigRequest,
  AdminCreateTaskConfigResponse,
  AdminUpdateTaskConfigRequest,
  AdminUpdateTaskConfigResponse,
  AdminGetTaskConfigsRequest,
  AdminGetTaskConfigsResponse,
  AdminDeleteTaskConfigRequest,
  AdminDeleteTaskConfigResponse,
  TaskConfig
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useTaskConfigStore = defineStore('task-configs', {
  state: () => ({
    TaskConfigs: new Map<string, Array<TaskConfig>>()
  }),
  getters: {
    taskConfigs (): (appID?: string) => Array<TaskConfig> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.TaskConfigs.get(appID) || []
      }
    },
    delTaskConfig (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _taskConfigs = this.TaskConfigs.get(appID) as Array<TaskConfig>
        if (!_taskConfigs) {
          _taskConfigs = []
        }
        const index = _taskConfigs.findIndex((el) => el.ID === id)
        _taskConfigs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.TaskConfigs.set(appID, _taskConfigs)
      }
    }
  },
  actions: {
    addTaskConfigs (appID: string | undefined, TaskConfigs: Array<TaskConfig>) {
      appID = formalizeAppID(appID)
      let _taskConfigs = this.TaskConfigs.get(appID) as Array<TaskConfig>
      if (!_taskConfigs) {
        _taskConfigs = []
      }
      TaskConfigs.forEach((TaskConfig) => {
        const index = _taskConfigs.findIndex((el) => el.ID === TaskConfig.ID)
        _taskConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, TaskConfig)
      })
      this.TaskConfigs.set(appID, _taskConfigs)
    },
    adminUpdateTaskConfig (req: AdminUpdateTaskConfigRequest, done: (error: boolean, row?: TaskConfig) => void) {
      doActionWithError<AdminUpdateTaskConfigRequest, AdminUpdateTaskConfigResponse>(
        API.ADMIN_UPDATE_TASKCONFIG,
        req,
        req.Message,
        (resp: AdminUpdateTaskConfigResponse): void => {
          this.addTaskConfigs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetTaskConfigs (req: AdminGetTaskConfigsRequest, done: (error: boolean, rows?: Array<TaskConfig>) => void) {
      doActionWithError<AdminGetTaskConfigsRequest, AdminGetTaskConfigsResponse>(
        API.ADMIN_GET_TASKCONFIGS,
        req,
        req.Message,
        (resp: AdminGetTaskConfigsResponse): void => {
          this.addTaskConfigs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteTaskConfig (req: AdminDeleteTaskConfigRequest, done: (error: boolean, row?: TaskConfig) => void) {
      doActionWithError<AdminDeleteTaskConfigRequest, AdminDeleteTaskConfigResponse>(
        API.ADMIN_DELETE_TASKCONFIG,
        req,
        req.Message,
        (resp: AdminDeleteTaskConfigResponse): void => {
          this.delTaskConfig(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateTaskConfig (req: AdminCreateTaskConfigRequest, done: (error: boolean, row?: TaskConfig) => void) {
      doActionWithError<AdminCreateTaskConfigRequest, AdminCreateTaskConfigResponse>(
        API.ADMIN_CREATE_TASKCONFIG,
        req,
        req.Message,
        (resp: AdminCreateTaskConfigResponse): void => {
          this.addTaskConfigs(undefined, [resp.Info])
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

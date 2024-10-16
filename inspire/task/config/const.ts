export enum API {
  ADMIN_UPDATE_TASKCONFIG = '/inspire/v1/admin/update/taskconfig',
  ADMIN_CREATE_TASKCONFIG = '/inspire/v1/admin/create/taskconfig',
  ADMIN_DELETE_TASKCONFIG = '/inspire/v1/admin/delete/taskconfig',
  ADMIN_GET_TASKCONFIGS = '/inspire/v1/admin/get/taskconfigs'
}

export enum TaskType {
  BaseTask = 'BaseTask',
  DailyTask = 'DailyTask',
  GrowthTask = 'GrowthTask'
}
export const TaskTypes = Object.values(TaskType)

export enum TaskState {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Done = 'Done'
}
export const TaskStates = Object.values(TaskState)

export enum RewardState {
  UnIssued = 'UnIssued',
  Issued = 'Issued',
  Revoked = 'Revoked'
}
export const RewardStates = Object.values(RewardState)

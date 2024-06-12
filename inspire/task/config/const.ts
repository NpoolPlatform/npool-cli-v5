export enum API {
  ADMIN_CREATE_TASK_CONFIG = '/inspire/v1/admin/create/taskconfig',
  ADMIN_UPDATE_TASK_CONFIG = '/inspire/v1/admin/update/taskconfig',
  ADMIN_GET_TASK_CONFIGS = '/inspire/v1/admin/get/taskconfigs',
  ADMIN_DELETE_TASK_CONFIG = '/inspire/v1/admin/update/taskconfig',
  USER_GET_TASKS = '/inspire/v1/user/get/tasks',
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

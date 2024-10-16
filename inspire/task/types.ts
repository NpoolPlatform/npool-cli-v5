import { BaseRequest } from '../../request'
import { TaskType, TaskState, RewardState } from './config/const'

export interface UserTask {
  ID: number
  EntID: string
  AppID: string
  EventID: string
  TaskType: TaskType
  Name: string
  TaskDesc: string
  StepGuide: string
  RecommendMessage: string
  Index: string
  LastTaskID: string
  /** @format int64 */
  MaxRewardCount: number
  /** @format int64 */
  CooldownSecord: number
  /** @format int64 */
  CompletionTimes: number
  /** @format int64 */
  NextStartAt: number
  TaskState: TaskState
  RewardState: RewardState
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminGetTasksRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetTasksResponse {
  Infos: UserTask[]
  /** @format int64 */
  Total: number
}

export interface GetMyTasksRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetMyTasksResponse {
  Infos: UserTask[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../../request'
import { TaskType } from './const'
import { EventType } from '../../../base'

export interface TaskConfig {
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
  MaxRewardCount: string
  CooldownSecord: string
  EventType: EventType
  IntervalReset: boolean
  /** @format int64 */
  IntervalResetSecond: number
  /** @format int64 */
  MaxIntervalRewardCount: number
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface AdminCreateTaskConfigRequest extends BaseRequest {
  TargetAppID: string
  EventID: string
  TaskType: TaskType
  Name: string
  TaskDesc: string
  StepGuide: string
  RecommendMessage: string
  Index: string
  MaxRewardCount: string
  CooldownSecord: string
  LastTaskID?: string
  IntervalReset?: boolean
  IntervalResetSecond?: number
  MaxIntervalRewardCount?: number
}

export interface AdminCreateTaskConfigResponse {
  Info: TaskConfig
}

export interface AdminUpdateTaskConfigRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetAppID: string
  TaskType?: TaskType
  Name?: string
  TaskDesc?: string
  StepGuide?: string
  RecommendMessage?: string
  Index?: string
  MaxRewardCount?: string
  CooldownSecord?: string
  LastTaskID?: string
  IntervalReset?: boolean
  IntervalResetSecond?: number
  MaxIntervalRewardCount?: number
}

export interface AdminUpdateTaskConfigResponse {
  Info: TaskConfig
}

export interface AdminGetTaskConfigsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface AdminGetTaskConfigsResponse {
  Infos: TaskConfig[]
  /** @format int64 */
  Total: number
}

export interface AdminDeleteTaskConfigRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface AdminDeleteTaskConfigResponse {
  Info: TaskConfig
}

export interface UserGetTasksRequest extends BaseRequest {
  AppID: string
  UserID: string
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface UserGetTasksResponse {
  Infos: TaskConfig[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../../request'
import { EventType } from '../../../base'
import { NotifType } from '../../base'

export interface User {
  ID: number
  EntID: string
  EventType: EventType
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Username: string
  Title: string
  Content: string
  NotifType: NotifType
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateNotifUserRequest extends BaseRequest {
  TargetUserID: string
  EventType: EventType
}

export interface CreateNotifUserResponse {
  Info: User
}

export interface DeleteNotifUserRequest extends BaseRequest {
  ID: number
  EntID?: string
}

export interface DeleteNotifUserResponse {
  Info: User
}

export interface GetNotifUsersRequest extends BaseRequest {
  EventType?: EventType
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetNotifUsersResponse {
  Infos: User[]
  /** @format int64 */
  Total: number
}

export interface GetAppNotifUsersRequest extends BaseRequest {
  TargetAppID?: string
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppNotifUsersResponse {
  Infos: User[]
  /** @format int64 */
  Total: number
}

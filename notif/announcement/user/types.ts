import { BaseRequest } from '../../../request'
import { NotifType } from '../../base'

export interface User {
  ID: number
  EntID: string
  AnnouncementID: string
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Username: string
  Title: string
  Content: string
  AnnouncementType: NotifType
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateAnnouncementUserRequest extends BaseRequest {
  TargetUserID: string
  AnnouncementID: string
}

export interface CreateAnnouncementUserResponse {
  Info: User
}

export interface DeleteAnnouncementUserRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteAnnouncementUserResponse {
  Info: User
}

export interface GetAnnouncementUsersRequest extends BaseRequest {
  AnnouncementID?: string
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAnnouncementUsersResponse {
  Infos: User[]
  /** @format int64 */
  Total: number
}

export interface GetAppAnnouncementUsersRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppAnnouncementUsersResponse {
  Infos: User[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../request'
import { NotifType, NotifChannel } from '../base'

export interface Announcement {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  LangID: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Username: string
  Title: string
  Content: string
  AlreadyRead: boolean
  AlreadySend: boolean
  /** @format int64 */
  CreatedAt: number
  /** if AlreadySend = true SendChannel valid */
  SendChannel: NotifChannel
  Channel: NotifChannel
  AnnouncementType: NotifType
  /** @format int64 */
  StartAt: number
  EndAt: number
}

export interface CreateAnnouncementRequest extends BaseRequest {
  AppID: string
  TargetLangID: string
  Title: string
  Content: string
  AnnouncementType: NotifType
  Channel: NotifChannel
  /** @format int64 */
  EndAt: number
}

export interface CreateAnnouncementResponse {
  Info: Announcement
}

export interface DeleteAnnouncementRequest extends BaseRequest {
  ID: number
  EntID: string
}

export interface DeleteAnnouncementResponse {
  Info: Announcement
}

export interface GetAppAnnouncementsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppAnnouncementsResponse {
  Infos: Announcement[]
  /** @format int64 */
  Total: number
}

export interface GetAnnouncementsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAnnouncementsResponse {
  Infos: Announcement[]
  /** @format int64 */
  Total: number
}

export interface GetNAppAnnouncementsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetNAppAnnouncementsResponse {
  Infos: Announcement[]
  /** @format int64 */
  Total: number
}

export interface UpdateAnnouncementRequest extends BaseRequest {
  ID: number
  Title: string
  Content: string
  Channel: NotifChannel
  AnnouncementType: NotifType
  /** @format int64 */
  StartAt: number
  EndAt: number
}

export interface UpdateAnnouncementResponse {
  Info: Announcement
}

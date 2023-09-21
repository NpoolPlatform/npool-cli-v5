import { EventType } from '../../base'
import { BaseRequest } from '../../request'
import { NotifChannel } from '../channel/const'

export interface Notif {
  ID: string
  AppID: string
  AppName: string
  UserID: string
  EmailAddress: string
  PhoneNO: string
  Username: string
  EventType: EventType
  UseTemplate: boolean
  Title: string
  Content: string
  Channel: NotifChannel
  Notified: boolean
  CreatedAt: number
  UpdatedAt: number
  LangID: string
  Lang: string
}

export interface GetNotifRequest extends BaseRequest{
  ID: string
}

export interface GetNotifResponse {
  Info: Notif
}

interface _NotifReq {
  ID: string
  Notified?: boolean
}

export interface UpdateNotifsRequest extends BaseRequest{
  Infos: Array<_NotifReq>
}

export interface UpdateNotifsResponse {
  Infos: Notif[]
}

export interface GetNotifsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetNotifsResponse {
  Infos: Notif[]
  /** @format int64 */
  Total: number
}

export interface GetAppNotifsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppNotifsResponse {
  Infos: Notif[]
  /** @format int64 */
  Total: number
}

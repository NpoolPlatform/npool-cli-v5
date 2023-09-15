import { BaseRequest } from '../../request'
import { EventType } from '../../base'
import { NotifChannel } from './const'

export interface TNotifChannel {
  AppID: string
  ID: string
  AppName: string
  EventType: EventType
  Channel: NotifChannel
  /** @format int64 */
  CreatedAt: number
}

export interface CreateNotifChannelRequest extends BaseRequest {
  EventType: EventType
  Channel: NotifChannel
}

export interface CreateNotifChannelResponse {
  Info: TNotifChannel
}

export interface DeleteNotifChannelRequest extends BaseRequest {
  ID: string
}

export interface DeleteNotifChannelResponse {
  Info: TNotifChannel
}

export interface GetAppNotifChannelsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppNotifChannelsResponse {
  Infos: TNotifChannel[]
  /** @format int64 */
  Total: number
}

export interface GetNAppNotifChannelsRequest extends BaseRequest {
  TargetAppID: string
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetNAppNotifChannelsResponse {
  Infos: TNotifChannel[]
  /** @format int64 */
  Total: number
}

import { BaseRequest } from '../../../request'
import { NotifChannel } from '../../base'

export interface SendState {
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
  Channel: NotifChannel
  /** @format int64 */
  CreatedAt: number
}

export interface GetAppSendStatesRequest extends BaseRequest {
  Channel: NotifChannel
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppSendStatesResponse {
  Infos: SendState[]
  /** @format int64 */
  Total: number
}

export interface GetAppUserSendStatesRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  Channel: NotifChannel
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetAppUserSendStatesResponse {
  Infos: SendState[]
  /** @format int64 */
  Total: number
}

export interface GetNAppSendStatesRequest extends BaseRequest {
  TargetAppID: string
  Channel: NotifChannel
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetNAppSendStatesResponse {
  Infos: SendState[]
  /** @format int64 */
  Total: number
}

export interface GetSendStatesRequest extends BaseRequest {
  Channel: NotifChannel
  /** @format int64 */
  Offset: number
  /** @format int64 */
  Limit: number
}

export interface GetSendStatesResponse {
  Infos: SendState[]
  /** @format int64 */
  Total: number
}

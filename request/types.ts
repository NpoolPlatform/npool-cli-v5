import { Notification } from '../notify'

export interface ReqMessage {
  Info?: Notification
  Error?: Notification
}

export interface BaseRequest {
  Message?: ReqMessage
}

export interface NotifyRequest {
  NotifyMessage?: ReqMessage
}

export interface BasePager {
  LoadingPages: number[]
  LoadedPages: number[]
  PageStart: number
  PageLimit: number
  TotalPages: number
  TotalRows: number
}

import { BaseRequest } from '../../../request'

export interface AppSubscribe {
  ID: string
  AppID: string
  AppName: string
  SubscribeAppID: string
  SubscribeAppName: string
  CreateAt: number
  UpdatedAt: number
}

export interface CreateAppSubscribeRequest extends BaseRequest {
  TargetAppID: string
  SubscribeAppID: string
}

export interface CreateAppSubscribeResponse {
  Info: AppSubscribe
}

export interface GetAppSubscribesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppSubscribesResponse {
  Infos: Array<AppSubscribe>
  Total: number
}

export interface DeleteAppSubscribeRequest extends BaseRequest {
  ID: string
  TargetAppID: string
}

export interface DeleteAppSubscribeResponse {
  Info: AppSubscribe
}

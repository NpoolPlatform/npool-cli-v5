import { BaseRequest } from '../../request'

export interface ReconcileRequest extends BaseRequest {
  AppID?: string
  TargetUserID: string
  GoodID: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReconcileResponse {
}

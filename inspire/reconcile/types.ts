import { BaseRequest } from '../../request'

export interface ReconcileRequest extends BaseRequest {
  AppGoodID: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReconcileResponse {
}

import { BaseRequest } from 'npool-cli-v4'

export enum HTTPMethod {
  DefaultMethod = 'DefaultMethod',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

export enum Result {
  DefaultResult = 'DefaultResult',
  Success = 'Success',
  Fail = 'Fail',
}

export interface OpLog {
  ID: number;
  /** @inject_tag: sql:"ent_id" */
  EntID: string;
  /** @inject_tag: sql:"app_id" */
  AppID: string;
  /** @inject_tag: sql:"user_id" */
  UserID: string;
  /** @inject_tag: sql:"path" */
  Path: string;
  /** @inject_tag: sql:"method" */
  MethodStr: string;
  Method: HTTPMethod;
  /** @inject_tag: sql:"arguments" */
  Arguments: string;
  /** @inject_tag: sql:"cur_value" */
  CurValue: string;
  /** @inject_tag: sql:"new_value" */
  NewValue: string;
  /** @inject_tag: sql:"human_readable" */
  HumanReadable: string;
  /** @inject_tag: sql:"result" */
  ResultStr: string;
  Result: Result;
  /** @inject_tag: sql:"fail_reason" */
  FailReason: string;
  /**
   * @inject_tag: sql:"status_code"
   * @format int32
   */
  StatusCode: number;
  /** @inject_tag: sql:"req_headers" */
  ReqHeaders: string;
  /** @inject_tag: sql:"resp_headers" */
  RespHeaders: string;
  /**
   * @inject_tag: sql:"created_at"
   * @format int64
   */
  CreatedAt: number;
  /**
   * @inject_tag: sql:"updated_at"
   * @format int64
   */
  UpdatedAt: number;
}

export interface GetOpLogsRequest extends BaseRequest{
  AppID: string;
  UserID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetOpLogsResponse {
  Infos: OpLog[];
  /** @format int64 */
  Total: number;
}

export interface GetAppOpLogsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppOpLogsResponse {
  Infos: OpLog[];
  /** @format int64 */
  Total: number;
}

export interface GetNAppOpLogsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetNAppOpLogsResponse {
  Infos: OpLog[];
  /** @format int64 */
  Total: number;
}

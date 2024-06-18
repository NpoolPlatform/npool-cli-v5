import { BaseRequest } from '../../../../request'

export interface Score {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    UserID: string
    Username: string
    EmailAddress: string
    PhoneNO: string
    GoodID: string
    AppGoodID: string
    GoodName: string
    Score: string
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateScoreRequest extends BaseRequest {
    AppGoodID: string
    Score: boolean
}

export interface CreateScoreResponse {
    Info: Score
}

export interface GetMyScoresRequest extends BaseRequest {
    AppGoodID?: string
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetMyScoresResponse {
    Infos: Score[]
    Total: number
}

export interface GetScoresRequest extends BaseRequest {
    TargetUserID?: string
    AppGoodID?: string
    GoodID?: string
    Offset: number
    Limit: number
}

export interface GetScoresResponse {
    Infos: Score[]
    Total: number
}

export interface DeleteScoreRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteScoreResponse {
    Info: Score
}

export interface AdminGetScoresRequest extends BaseRequest {
  TargetAppID?: string
  AppGoodID?: string
  GoodID?: string
  Offset: number
  Limit: number
}

export interface AdminGetScoresResponse {
  Infos: Score[]
  Total: number
}

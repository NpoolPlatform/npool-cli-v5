import { BaseRequest, NotifyRequest } from 'src/npoolstore/request'
import { GoodTopMostType } from '../../base'

export interface TopMost {
    ID: string
    AppID: string
    AppName: string
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    Posters: string[]
    StartAt: number
    EndAt: number
    ThresholdCredits: string
    RegisterElapsedSeconds: number
    ThresholdPurchases: number
    ThresholdPaymentAmount: string
    KycMust: boolean
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostRequest extends NotifyRequest {
    AppID: string
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    Posters: string[]
    /** @format int64 */
    StartAt: number
    /** @format int64 */
    EndAt: number
    ThresholdCredits: string
    /** @format int64 */
    RegisterElapsedSeconds: number
    /** @format int64 */
    ThresholdPurchases: number
    ThresholdPaymentAmount: string
    KycMust: boolean
}

export interface CreateTopMostResponse {
    Info: TopMost
}

export interface DeleteTopMostRequest extends BaseRequest {
    ID: string
    AppID?: string
}

export interface DeleteTopMostResponse {
    Info: TopMost
}

export interface UpdateTopMostRequest extends NotifyRequest {
    ID: string
    AppID?: string
    Title: string
    Message: string
    Posters: string[]
    StartAt: number
    EndAt: number
    ThresholdCredits: string
    RegisterElapsedSeconds: number
    ThresholdPurchases: number
    ThresholdPaymentAmount: string
    KycMust: boolean
}

export interface UpdateTopMostResponse {
    Info: TopMost
}

export interface GetTopMostsRequest extends BaseRequest {
    AppID?: string
    Offset: number
    Limit: number
}

export interface GetTopMostsResponse {
    Infos: TopMost[]
    Total: number
}

export interface CreateNTopMostRequest extends NotifyRequest {
    TargetAppID: string
    TopMostType: GoodTopMostType
    Title: string
    Message: string
    Posters: string[]
    /** @format int64 */
    StartAt: number
    /** @format int64 */
    EndAt: number
    ThresholdCredits: string
    /** @format int64 */
    RegisterElapsedSeconds: number
    /** @format int64 */
    ThresholdPurchases: number
    ThresholdPaymentAmount: string
    KycMust: boolean
}

export interface CreateNTopMostResponse {
    Info: TopMost
}
export interface GetNTopMostsRequest extends BaseRequest {
    TargetAppID: string
    /** @format int32 */
    Offset: number
    /** @format int32 */
    Limit: number
}

export interface GetNTopMostsResponse {
    Infos: TopMost[]
    /** @format int64 */
    Total: number
}

export interface UpdateNTopMostRequest extends NotifyRequest {
    ID: string
    TargetAppID: string
    Title: string
    Message: string
    Posters: string[]
    /** @format int64 */
    StartAt: number
    /** @format int64 */
    EndAt: number
    ThresholdCredits: string
    /** @format int64 */
    RegisterElapsedSeconds: number
    /** @format int64 */
    ThresholdPurchases: number
    ThresholdPaymentAmount: string
    KycMust: boolean
}

export interface UpdateNTopMostResponse {
    Info: TopMost
}

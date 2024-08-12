import { BaseRequest } from '../../../../../../request'
import { GoodTopMostConstraint, GoodTopMostType } from '../../../../../base'

export interface TopMostGoodConstraint {
    ID: number
    EntID: string
    AppID: string
    AppName: string
    TopMostID: string
    TopMostType: GoodTopMostType
    TopMostTitle: string
    TopMostMessage: string
    TopMostTargetUrl: string
    Constraint: GoodTopMostConstraint
    TopMostGoodID: string
    AppGoodID: string
    AppGoodName: string
    TargetValue: string
    Index: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostGoodConstraintRequest extends BaseRequest {
    TopMostGoodID: string
    Constraint: GoodTopMostConstraint
    TargetValue?: string
    Index?: number
}

export interface CreateTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

export interface UpdateTopMostGoodConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetValue?: string
    Index?: number
}

export interface UpdateTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

export interface GetTopMostGoodConstraintsRequest extends BaseRequest {
    TopMostGoodID?: string
    Offset: number
    Limit: number
}

export interface GetTopMostGoodConstraintsResponse {
    Infos: TopMostGoodConstraint[]
    Total: number
}

export interface DeleteTopMostGoodConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

export interface AdminCreateTopMostGoodConstraintRequest extends BaseRequest {
    TargetAppID: string
    TopMostGoodID: string
    Constraint: GoodTopMostConstraint
    TargetValue?: string
    Index?: number
}

export interface AdminCreateTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

export interface AdminUpdateTopMostGoodConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    TargetValue?: string
    Index?: number
}

export interface AdminUpdateTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

export interface AdminGetTopMostGoodConstraintsRequest extends BaseRequest {
    TargetAppID: string
    TopMostGoodID?: string
    Offset: number
    Limit: number
}

export interface AdminGetTopMostGoodConstraintsResponse {
    Infos: TopMostGoodConstraint[]
    Total: number
}

export interface AdminDeleteTopMostGoodConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface AdminDeleteTopMostGoodConstraintResponse {
    Info: TopMostGoodConstraint
}

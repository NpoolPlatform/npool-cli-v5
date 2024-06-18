import { BaseRequest } from '../../../../../request'
import { GoodTopMostConstraint, GoodTopMostType } from '../../../../base'

export interface TopMostConstraint {
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
    TargetValue: string
    Index: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTopMostConstraintRequest extends BaseRequest {
    TopMostID: string
    Constraint: GoodTopMostConstraint
    TargetValue?: string
    Index?: number
}

export interface CreateTopMostConstraintResponse {
    Info: TopMostConstraint
}

export interface UpdateTopMostConstraintRequest extends BaseRequest {
  ID: number
  EntID: string
  TargetValue?: string
  Index?: number
}

export interface UpdateTopMostConstraintResponse {
  Info: TopMostConstraint
}

export interface GetTopMostConstraintsRequest extends BaseRequest {
    TopMostID?: string
    Offset: number
    Limit: number
}

export interface GetTopMostConstraintsResponse {
    Infos: TopMostConstraint[]
    Total: number
}

export interface DeleteTopMostConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
}

export interface DeleteTopMostConstraintResponse {
    Info: TopMostConstraint
}

export interface AdminCreateTopMostConstraintRequest extends BaseRequest {
    TargetAppID: string
    TopMostID: string
    Constraint: GoodTopMostConstraint
    TargetValue?: string
    Index?: number
}

export interface AdminCreateTopMostConstraintResponse {
    Info: TopMostConstraint
}

export interface AdminUpdateTopMostConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
    TargetValue?: string
    Index?: number
}

export interface AdminUpdateTopMostConstraintResponse {
    Info: TopMostConstraint
}

export interface AdminGetTopMostConstraintsRequest extends BaseRequest {
    TargetAppID: string
    TopMostID?: string
    Offset: number
    Limit: number
}

export interface AdminGetTopMostConstraintsResponse {
    Infos: TopMostConstraint[]
    Total: number
}

export interface AdminDeleteTopMostConstraintRequest extends BaseRequest {
    ID: number
    EntID: string
    TargetAppID: string
}

export interface AdminDeleteTopMostConstraintResponse {
    Info: TopMostConstraint
}

import { BaseRequest } from '../../../request'
import { WithdrawState } from '../const'

export interface CouponWithdraw {
  /** @format int64 */
  ID: number;
  EntID: string;
  AppID: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  CoinTypeID: string;
  CoinName: string;
  DisplayNames: string[];
  CoinLogo: string;
  CoinUnit: string;
  CouponID: string;
  AllocatedID: string;
  CouponName: string;
  CouponMessage: string;
  Amount: string;
  Message: string;
  State: WithdrawState;
  ReviewID: string;
  ReviewUintID: number;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface CreateCouponWithdrawRequest extends BaseRequest {
  AppID: string;
  UserID: string;
  AllocatedID: string;
}

export interface CreateCouponWithdrawResponse {
  Info: CouponWithdraw;
}

export interface GetAppCouponWithdrawsRequest extends BaseRequest {
  AppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppCouponWithdrawsResponse {
  Infos: CouponWithdraw[];
  Total: number;
}

export interface GetCouponWithdrawsRequest extends BaseRequest {
  AppID: string;
  UserID: string;
  Offset: number;
  Limit: number;
}

export interface GetCouponWithdrawsResponse {
  Infos: CouponWithdraw[];
  Total: number;
}

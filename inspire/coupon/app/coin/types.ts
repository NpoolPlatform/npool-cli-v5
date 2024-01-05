import { BaseRequest } from '../../../../request'
export interface CouponCoin {
  ID: number;
  EntID: string;
  AppID: string;
  AppName: string;
  CoinTypeID: string;
  CoinName: string;
  CoinENV: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface CreateCouponCoinRequest extends BaseRequest {
  TargetAppID: string;
  CoinTypeID: string;
}

export interface CreateCouponCoinResponse {
  Info: CouponCoin;
}

export interface DeleteCouponCoinRequest extends BaseRequest {
  ID: number;
  EntID: string;
  TargetAppID: string;
}

export interface DeleteCouponCoinResponse {
  Info: CouponCoin;
}

export interface GetAppCouponCoinsRequest extends BaseRequest {
  AppID?: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppCouponCoinsResponse {
  Infos: CouponCoin[];
  /** @format int64 */
  Total: number;
}

export interface GetCouponCoinsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetCouponCoinsResponse {
  Infos: CouponCoin[];
  /** @format int64 */
  Total: number;
}

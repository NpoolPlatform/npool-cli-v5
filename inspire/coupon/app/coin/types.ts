import { BaseRequest } from '../../../../request'
export interface CouponCoin {
  ID: number;
  EntID: string;
  AppID: string;
  CouponID: string;
  CouponName: string;
  CouponDenomination: string;
  CoinTypeID: string;
  CoinName: string;
  CoinENV: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface CreateCouponCoinRequest extends BaseRequest {
  AppID: string;
  CouponID: string;
  CoinTypeID: string;
}

export interface CreateCouponCoinResponse {
  Info: CouponCoin;
}

export interface DeleteCouponCoinRequest extends BaseRequest {
  ID: number;
  EntID: string;
  AppID?: string;
}

export interface DeleteCouponCoinResponse {
  Info: CouponCoin;
}

export interface GetCouponCoinsRequest extends BaseRequest {
  AppID?: string;
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

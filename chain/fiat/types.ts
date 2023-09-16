import { BaseRequest } from '../../request'

export interface Fiat {
  ID: string
  Name: string
  Unit: string
  Logo: string
  /** @format int64 */
  CreatedAt: number
  /** @format int64 */
  UpdatedAt: number
}

export interface CreateFiatRequest extends BaseRequest {
  Name: string
}

export interface CreateFiatResponse {
  Info: Fiat
}

export interface GetFiatsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetFiatsResponse {
  Infos: Fiat[]
  /** @format int64 */
  Total: number
}

export interface UpdateFiatRequest extends BaseRequest {
  ID: string
  Name: string
}

export interface UpdateFiatResponse {
  Info: Fiat
}

export interface GetCoinFiatCurrenciesRequest extends BaseRequest {
  FiatIDs: string[]
  CoinTypeIDs: string[]
}

import { BaseRequest } from '../../../../request'
import { CoinCurrency } from '../base'

export interface GetCurrencyHistoriesRequest extends BaseRequest {
  CoinTypeIDs: string[]
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetCurrencyHistoriesResponse extends BaseRequest {
  Infos: CoinCurrency[]
  /** @format int64 */
  Total: number
}

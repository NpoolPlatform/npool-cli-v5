import { BaseRequest } from '../../../../request'
import { FiatCurrency } from '../types'

export interface GetFiatCurrencyHistoriesRequest extends BaseRequest {
  FiatIDs: string[]
  /** @format int64 */
  StartAt: number
  /** @format int64 */
  EndAt: number
  /** @format int32 */
  Offset: number
  /** @format int32 */
  Limit: number
}

export interface GetFiatCurrencyHistoriesResponse {
  Infos: FiatCurrency[]
  /** @format int64 */
  Total: number
}

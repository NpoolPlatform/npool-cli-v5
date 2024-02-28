import { BaseRequest } from '../../../../request'

export interface Profit {
  ID: number
  EntID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  CoinName: string
  DisplayNames: string[]
  CoinLogo: string
  CoinUnit: string
  Incoming: string
}

export interface GetSimulateProfitsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetSimulateProfitsResponse {
  Infos: Profit[]
  Total: number
}

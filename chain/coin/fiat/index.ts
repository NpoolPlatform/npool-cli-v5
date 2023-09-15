import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateCoinFiatRequest,
  CreateCoinFiatResponse,
  CoinFiat,
  GetCoinFiatsRequest,
  GetCoinFiatsResponse,
  DeleteCoinFiatRequest,
  DeleteCoinFiatResponse
} from './types'
import { doActionWithError } from '../../../request'

export const useCoinFiatStore = defineStore('coin-fiats', {
  state: () => ({
    CoinFiats: [] as Array<CoinFiat>
  }),
  getters: {
    addCoinFiats (): (fiats: Array<CoinFiat>) => void {
      return (fiats: Array<CoinFiat>) => {
        fiats.forEach((fiat) => {
          const index = this.CoinFiats.findIndex((el) => el.ID === fiat.ID)
          this.CoinFiats.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, fiat)
        })
      }
    },
    delCoinFiat (): (id: number) => void {
      return (id: number) => {
        const index = this.CoinFiats.findIndex((el) => el.ID === id)
        this.CoinFiats.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      }
    }
  },
  actions: {
    getCoinFiats (req: GetCoinFiatsRequest, done: (error: boolean, rows?: Array<CoinFiat>) => void) {
      doActionWithError<GetCoinFiatsRequest, GetCoinFiatsResponse>(
        API.GET_COIN_FIATS,
        req,
        req.Message,
        (resp: GetCoinFiatsResponse): void => {
          this.addCoinFiats(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    createCoinFiat (req: CreateCoinFiatRequest, done: (error: boolean, row?: CoinFiat) => void) {
      doActionWithError<CreateCoinFiatRequest, CreateCoinFiatResponse>(
        API.CREATE_COIN_FIAT,
        req,
        req.Message,
        (resp: CreateCoinFiatResponse): void => {
          this.addCoinFiats([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deleteCoinFiat (req: DeleteCoinFiatRequest, done: (error: boolean, row?: CoinFiat) => void) {
      doActionWithError<DeleteCoinFiatRequest, DeleteCoinFiatResponse>(
        API.DELETE_COIN_FIAT,
        req,
        req.Message,
        (resp: DeleteCoinFiatResponse): void => {
          this.delCoinFiat(req.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'

import { defineStore } from 'pinia'
import { API } from './const'
import { GetTxsRequest, GetTxsResponse, Tx } from './types'
import { doActionWithError } from '../../request'

export const useTxStore = defineStore('transactions', {
  state: () => ({
    Txs: [] as Array<Tx>
  }),
  getters: {
    tx () {
      return (id: string) => {
        return this.Txs.find((el) => el.ID === id)
      }
    },
    txs () {
      return (appID: string) => this.Txs.filter((el) => el.AppID === appID)
    },
    addTxs (): (txs: Array<Tx>) => void {
      return (txs: Array<Tx>) => {
        txs.forEach((tx) => {
          const index = this.Txs.findIndex((el) => el.ID === tx.ID)
          this.Txs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, tx)
        })
      }
    }
  },
  actions: {
    getTxs (req: GetTxsRequest, done: (error: boolean, txs: Array<Tx>) => void) {
      doActionWithError<GetTxsRequest, GetTxsResponse>(
        API.GET_TXS,
        req,
        req.Message,
        (resp: GetTxsResponse): void => {
          this.addTxs(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    }
  }
})

export * from './const'
export * from './types'

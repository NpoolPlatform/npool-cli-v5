import { defineStore } from 'pinia'
import {
  Transfer,
  CreateTransferRequest,
  CreateTransferResponse
} from './types'
import { doActionWithError } from '../../request'
import { API } from './const'
import { formalizeAppID } from '../../appuser/app/local'

export const useTransferStore = defineStore('ledger-transfers', {
  state: () => ({
    Transfers: new Map<string, Array<Transfer>>()
  }),
  getters: {
    addTransfers (): (appID: string | undefined, transfers: Array<Transfer>) => void {
      return (appID: string | undefined, transfers: Array<Transfer>) => {
        appID = formalizeAppID(appID)
        let _transfers = this.Transfers.get(appID) as Array<Transfer>
        if (!_transfers) {
          _transfers = []
        }
        transfers.forEach((transfer) => {
          const index = _transfers.findIndex((el) => el.ID === transfer.ID)
          _transfers.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, transfer)
        })
        this.Transfers.set(appID, _transfers)
      }
    }
  },
  actions: {
    createTransfer (req: CreateTransferRequest, done: (error: boolean, tran?: Transfer) => void) {
      doActionWithError<CreateTransferRequest, CreateTransferResponse>(
        API.CREATE_TRANSFER,
        req,
        req.Message,
        (resp: CreateTransferResponse): void => {
          this.addTransfers(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

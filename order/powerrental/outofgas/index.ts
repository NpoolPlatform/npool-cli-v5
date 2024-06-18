import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../request'
import {
  AdminDeleteOutOfGasRequest,
  AdminDeleteOutOfGasResponse
} from './types'
import { OutOfGas, useOutOfGasStore } from '../../outofgas'

export const usePowerRentalOutOfGasStore = defineStore('powerrental-compensates', {
  state: () => ({}),
  getters: {},
  actions: {
    addOutOfGases (_compensate: OutOfGas) {
      const outOfGas = useOutOfGasStore()
      outOfGas.addOutOfGases([_compensate])
    },
    delOutOfGas (appID: string, id: number) {
      const compensate = useOutOfGasStore()
      compensate.delOutOfGas(appID, id)
    },
    adminDeleteOutOfGas (req: AdminDeleteOutOfGasRequest, done: (error: boolean, row?: OutOfGas) => void) {
      doActionWithError<AdminDeleteOutOfGasRequest, AdminDeleteOutOfGasResponse>(
        API.ADMIN_DELETE_OUTOFGAS,
        req,
        req.Message,
        (resp: AdminDeleteOutOfGasResponse): void => {
          this.delOutOfGas(req.TargetAppID, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

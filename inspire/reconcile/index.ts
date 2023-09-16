import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  ReconcileRequest,
  ReconcileResponse
} from './types'

export const useReconcileStore = defineStore('reconcile', {
  state: () => ({}),
  getters: {
  },
  actions: {
    reconcile (req: ReconcileRequest, done: (error: boolean) => void) {
      doActionWithError<ReconcileRequest, ReconcileResponse>(
        API.RECONCILE,
        req,
        req.Message,
        (): void => {
          done(false)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

import { doActionWithError } from '../../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  GenerateRecoveryCodesRequest,
  GenerateRecoveryCodesResponse,
  GetRecoveryCodesRequest,
  GetRecoveryCodesResponse,
  RecoveryCode
} from './types'

export const useRecoveryCodeStore = defineStore('recoverycode', {
  state: () => ({
    RecoveryCodes: [] as Array<RecoveryCode>,
    Total: 0
  }),
  getters: {},
  actions: {
    getRecoveryCodes (req: GetRecoveryCodesRequest, done: (error: boolean, codes?: RecoveryCode[]) => void) {
      doActionWithError<GetRecoveryCodesRequest, GetRecoveryCodesResponse>(
        API.GET_RECOVERY_CODES,
        req,
        req.Message,
        (resp: GetRecoveryCodesResponse): void => {
          if (resp.Infos?.length === 0) {
            done(false, resp.Infos)
            return
          }
          this.RecoveryCodes = resp.Infos
          this.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    generateRecoveryCodes (req: GenerateRecoveryCodesRequest, done: (error: boolean, codes?: Array<RecoveryCode>) => void) {
      doActionWithError<GenerateRecoveryCodesRequest, GenerateRecoveryCodesResponse>(
        API.GENERATE_RECOVERY_CODES,
        req,
        req.Message,
        (resp: GenerateRecoveryCodesResponse): void => {
          this.RecoveryCodes = resp.Infos
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

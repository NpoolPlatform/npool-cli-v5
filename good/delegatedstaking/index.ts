import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  DelegatedStaking,
  AdminCreateDelegatedStakingRequest,
  AdminCreateDelegatedStakingResponse,
  GetDelegatedStakingsRequest,
  GetDelegatedStakingsResponse,
  GetDelegatedStakingRequest,
  GetDelegatedStakingResponse,
  AdminUpdateDelegatedStakingRequest,
  AdminUpdateDelegatedStakingResponse,
  AdminDeleteDelegatedStakingRequest,
  AdminDeleteDelegatedStakingResponse
} from './types'

export const useDelegatedStakingStore = defineStore('delegatedStakings', {
  state: () => ({
    DelegatedStakings: [] as Array<DelegatedStaking>
  }),
  getters: {
    delegatedStaking (): (id: string) => DelegatedStaking | undefined {
      return (id: string) => {
        return this.DelegatedStakings.find((el: DelegatedStaking) => el.EntID === id)
      }
    },
    delegatedStakings (): Array<DelegatedStaking> {
      return this.DelegatedStakings
    }
  },
  actions: {
    addDelegatedStakings (delegatedStakings: Array<DelegatedStaking>) {
      delegatedStakings.forEach((delegatedStaking) => {
        const index = this.DelegatedStakings.findIndex((el: DelegatedStaking) => el.EntID === delegatedStaking.EntID)
        this.DelegatedStakings.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, delegatedStaking)
      })
    },
    deleteDelegatedStakings (delegatedStakings: Array<DelegatedStaking>) {
      delegatedStakings.forEach((delegatedStaking) => {
        const index = this.DelegatedStakings.findIndex((el: DelegatedStaking) => el.EntID === delegatedStaking.EntID)
        this.DelegatedStakings.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getDelegatedStaking (req: GetDelegatedStakingRequest, done?: (error: boolean, row?: DelegatedStaking) => void) {
      doActionWithError<GetDelegatedStakingRequest, GetDelegatedStakingResponse>(
        API.GET_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: GetDelegatedStakingResponse): void => {
          this.addDelegatedStakings([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getDelegatedStakings (req: GetDelegatedStakingsRequest, done?: (error: boolean, rows?: Array<DelegatedStaking>) => void) {
      doActionWithError<GetDelegatedStakingsRequest, GetDelegatedStakingsResponse>(
        API.GET_DELEGATEDSTAKINGS,
        req,
        req.Message,
        (resp: GetDelegatedStakingsResponse): void => {
          this.addDelegatedStakings(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateDelegatedStaking (req: AdminUpdateDelegatedStakingRequest, done?: (error: boolean, row?: DelegatedStaking) => void) {
      doActionWithError<AdminUpdateDelegatedStakingRequest, AdminUpdateDelegatedStakingResponse>(
        API.ADMIN_UPDATE_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminUpdateDelegatedStakingResponse): void => {
          this.addDelegatedStakings([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreateDelegatedStaking (req: AdminCreateDelegatedStakingRequest, done?: (error: boolean, row?: DelegatedStaking) => void) {
      doActionWithError<AdminCreateDelegatedStakingRequest, AdminCreateDelegatedStakingResponse>(
        API.ADMIN_CREATE_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminCreateDelegatedStakingResponse): void => {
          this.addDelegatedStakings([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteDelegatedStaking (req: AdminDeleteDelegatedStakingRequest, done?: (error: boolean, row?: DelegatedStaking) => void) {
      doActionWithError<AdminDeleteDelegatedStakingRequest, AdminDeleteDelegatedStakingResponse>(
        API.ADMIN_DELETE_DELEGATEDSTAKING,
        req,
        req.Message,
        (resp: AdminDeleteDelegatedStakingResponse): void => {
          this.deleteDelegatedStakings([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

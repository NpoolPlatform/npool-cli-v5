import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  Pledge,
  AdminCreatePledgeRequest,
  AdminCreatePledgeResponse,
  GetPledgesRequest,
  GetPledgesResponse,
  GetPledgeRequest,
  GetPledgeResponse,
  AdminUpdatePledgeRequest,
  AdminUpdatePledgeResponse,
  AdminDeletePledgeRequest,
  AdminDeletePledgeResponse
} from './types'

export const usePledgeStore = defineStore('pledges', {
  state: () => ({
    Pledges: [] as Array<Pledge>
  }),
  getters: {
    pledge (): (id: string) => Pledge | undefined {
      return (id: string) => {
        return this.Pledges.find((el: Pledge) => el.EntID === id)
      }
    },
    pledges (): Array<Pledge> {
      return this.Pledges
    }
  },
  actions: {
    addPledges (pledges: Array<Pledge>) {
      pledges.forEach((pledge) => {
        const index = this.Pledges.findIndex((el: Pledge) => el.EntID === pledge.EntID)
        this.Pledges.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, pledge)
      })
    },
    deletePledges (pledges: Array<Pledge>) {
      pledges.forEach((pledge) => {
        const index = this.Pledges.findIndex((el: Pledge) => el.EntID === pledge.EntID)
        this.Pledges.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getPledge (req: GetPledgeRequest, done?: (error: boolean, row?: Pledge) => void) {
      doActionWithError<GetPledgeRequest, GetPledgeResponse>(
        API.GET_PLEDGE,
        req,
        req.Message,
        (resp: GetPledgeResponse): void => {
          this.addPledges([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getPledges (req: GetPledgesRequest, done?: (error: boolean, rows?: Array<Pledge>) => void) {
      doActionWithError<GetPledgesRequest, GetPledgesResponse>(
        API.GET_PLEDGES,
        req,
        req.Message,
        (resp: GetPledgesResponse): void => {
          this.addPledges(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdatePledge (req: AdminUpdatePledgeRequest, done?: (error: boolean, row?: Pledge) => void) {
      doActionWithError<AdminUpdatePledgeRequest, AdminUpdatePledgeResponse>(
        API.ADMIN_UPDATE_PLEDGE,
        req,
        req.Message,
        (resp: AdminUpdatePledgeResponse): void => {
          this.addPledges([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreatePledge (req: AdminCreatePledgeRequest, done?: (error: boolean, row?: Pledge) => void) {
      doActionWithError<AdminCreatePledgeRequest, AdminCreatePledgeResponse>(
        API.ADMIN_CREATE_PLEDGE,
        req,
        req.Message,
        (resp: AdminCreatePledgeResponse): void => {
          this.addPledges([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeletePledge (req: AdminDeletePledgeRequest, done?: (error: boolean, row?: Pledge) => void) {
      doActionWithError<AdminDeletePledgeRequest, AdminDeletePledgeResponse>(
        API.ADMIN_DELETE_PLEDGE,
        req,
        req.Message,
        (resp: AdminDeletePledgeResponse): void => {
          this.deletePledges([resp.Info])
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

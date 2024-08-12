import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  Malfunction,
  GetMalfunctionsRequest,
  GetMalfunctionsResponse,
  AdminCreateMalfunctionRequest,
  AdminCreateMalfunctionResponse,
  AdminDeleteMalfunctionRequest,
  AdminDeleteMalfunctionResponse,
  AdminUpdateMalfunctionRequest,
  AdminUpdateMalfunctionResponse
} from './types'

export const useMalfunctionStore = defineStore('good-malfunctions', {
  state: () => ({
    Malfunctions: [] as Array<Malfunction>
  }),
  getters: {
    malfunction (): (id: string) => Malfunction | undefined {
      return (id: string) => {
        return this.Malfunctions.find((el: Malfunction) => el.EntID === id)
      }
    },
    malfunctions (): Array<Malfunction> {
      return this.Malfunctions
    }
  },
  actions: {
    addMalfunctions (malfunctions: Array<Malfunction>) {
      malfunctions.forEach((malfunction) => {
        if (!malfunction) return
        const index = this.Malfunctions.findIndex((el) => el.EntID === malfunction.EntID)
        this.Malfunctions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, malfunction)
      })
    },
    delMalfunction (malfunction: Malfunction) {
      const index = this.Malfunctions.findIndex((el: Malfunction) => el.EntID === malfunction.EntID)
      this.Malfunctions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
    },
    adminCreateMalfunction (req: AdminCreateMalfunctionRequest, done?: (error: boolean, row?: Malfunction) => void) {
      doActionWithError<AdminCreateMalfunctionRequest, AdminCreateMalfunctionResponse>(
        API.ADMIN_CREATE_GOOD_MALFUNCTION,
        req,
        req.NotifyMessage,
        (resp: AdminCreateMalfunctionResponse): void => {
          this.addMalfunctions([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getMalfunctions (req: GetMalfunctionsRequest, done?: (error: boolean, rows?: Array<Malfunction>, total?: number) => void) {
      doActionWithError<GetMalfunctionsRequest, GetMalfunctionsResponse>(
        API.GET_GOOD_MALFUNCTIONS,
        req,
        req.Message,
        (resp: GetMalfunctionsResponse): void => {
          this.addMalfunctions(resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeleteMalfunction (req: AdminDeleteMalfunctionRequest, done?: (error: boolean, row?: Malfunction) => void) {
      doActionWithError<AdminDeleteMalfunctionRequest, AdminDeleteMalfunctionResponse>(
        API.ADMIN_DELETE_GOOD_MALFUNCTION,
        req,
        req.Message,
        (resp: AdminDeleteMalfunctionResponse): void => {
          this.delMalfunction(resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdateMalfunction (req: AdminUpdateMalfunctionRequest, done?: (error: boolean, row?: Malfunction) => void) {
      doActionWithError<AdminUpdateMalfunctionRequest, AdminUpdateMalfunctionResponse>(
        API.ADMIN_UPDATE_GOOD_MALFUNCTION,
        req,
        req.NotifyMessage,
        (resp: AdminUpdateMalfunctionResponse): void => {
          this.addMalfunctions([resp.Info])
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

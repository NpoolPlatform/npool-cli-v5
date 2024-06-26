import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  PowerRental,
  AdminCreatePowerRentalRequest,
  AdminCreatePowerRentalResponse,
  GetPowerRentalsRequest,
  GetPowerRentalsResponse,
  GetPowerRentalRequest,
  GetPowerRentalResponse,
  AdminUpdatePowerRentalRequest,
  AdminUpdatePowerRentalResponse,
  AdminDeletePowerRentalRequest,
  AdminDeletePowerRentalResponse
} from './types'

export const usePowerRentalStore = defineStore('powerRentals', {
  state: () => ({
    PowerRentals: [] as Array<PowerRental>
  }),
  getters: {
    powerRental (): (id: string) => PowerRental | undefined {
      return (id: string) => {
        return this.PowerRentals.find((el: PowerRental) => el.EntID === id)
      }
    },
    powerRentals (): Array<PowerRental> {
      return this.PowerRentals
    }
  },
  actions: {
    addPowerRentals (powerRentals: Array<PowerRental>) {
      powerRentals.forEach((powerRental) => {
        const index = this.PowerRentals.findIndex((el: PowerRental) => el.EntID === powerRental.EntID)
        this.PowerRentals.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, powerRental)
      })
    },
    deletePowerRentals (powerRentals: Array<PowerRental>) {
      powerRentals.forEach((powerRental) => {
        const index = this.PowerRentals.findIndex((el: PowerRental) => el.EntID === powerRental.EntID)
        this.PowerRentals.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getPowerRental (req: GetPowerRentalRequest, done?: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<GetPowerRentalRequest, GetPowerRentalResponse>(
        API.GET_POWERRENTAL,
        req,
        req.Message,
        (resp: GetPowerRentalResponse): void => {
          this.addPowerRentals([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    getPowerRentals (req: GetPowerRentalsRequest, done?: (error: boolean, rows?: Array<PowerRental>) => void) {
      doActionWithError<GetPowerRentalsRequest, GetPowerRentalsResponse>(
        API.GET_POWERRENTALS,
        req,
        req.Message,
        (resp: GetPowerRentalsResponse): void => {
          this.addPowerRentals(resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        }
      )
    },
    adminUpdatePowerRental (req: AdminUpdatePowerRentalRequest, done?: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminUpdatePowerRentalRequest, AdminUpdatePowerRentalResponse>(
        API.ADMIN_UPDATE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminUpdatePowerRentalResponse): void => {
          this.addPowerRentals([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminCreatePowerRental (req: AdminCreatePowerRentalRequest, done?: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminCreatePowerRentalRequest, AdminCreatePowerRentalResponse>(
        API.ADMIN_CREATE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminCreatePowerRentalResponse): void => {
          this.addPowerRentals([resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        }
      )
    },
    adminDeletePowerRental (req: AdminDeletePowerRentalRequest, done?: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminDeletePowerRentalRequest, AdminDeletePowerRentalResponse>(
        API.ADMIN_DELETE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminDeletePowerRentalResponse): void => {
          this.deletePowerRentals([resp.Info])
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

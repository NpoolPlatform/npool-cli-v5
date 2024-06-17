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

export const usePowerRentalStore = defineStore('powerrentals', {
  state: () => ({
    PowerRentals: [] as Array<PowerRental>
  }),
  getters: {
    PowerRental (): (id: string) => PowerRental | undefined {
      return (id: string) => {
        return this.PowerRentals.find((el: PowerRental) => el.EntID === id)
      }
    },
    PowerRentals () {
      return () => this.PowerRentals
    }
  },
  actions: {
    addBrands (brands: Array<PowerRental>) {
      brands.forEach((brand) => {
        const index = this.PowerRentals.findIndex((el: PowerRental) => el.EntID === brand.EntID)
        this.PowerRentals.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, brand)
      })
    },
    deleteBrands (brands: Array<PowerRental>) {
      brands.forEach((brand) => {
        const index = this.PowerRentals.findIndex((el: PowerRental) => el.EntID === brand.EntID)
        this.PowerRentals.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      })
    },
    getPowerRental (req: GetPowerRentalRequest, done: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<GetPowerRentalRequest, GetPowerRentalResponse>(
        API.GET_POWERRENTAL,
        req,
        req.Message,
        (resp: GetPowerRentalResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getPowerRentals (req: GetPowerRentalsRequest, done: (error: boolean, rows?: Array<PowerRental>) => void) {
      doActionWithError<GetPowerRentalsRequest, GetPowerRentalsResponse>(
        API.GET_POWERRENTALS,
        req,
        req.Message,
        (resp: GetPowerRentalsResponse): void => {
          this.addBrands(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updatePowerRental (req: AdminUpdatePowerRentalRequest, done: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminUpdatePowerRentalRequest, AdminUpdatePowerRentalResponse>(
        API.ADMIN_UPDATE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminUpdatePowerRentalResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createPowerRental (req: AdminCreatePowerRentalRequest, done: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminCreatePowerRentalRequest, AdminCreatePowerRentalResponse>(
        API.ADMIN_CREATE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminCreatePowerRentalResponse): void => {
          this.addBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    deletePowerRental (req: AdminDeletePowerRentalRequest, done: (error: boolean, row?: PowerRental) => void) {
      doActionWithError<AdminDeletePowerRentalRequest, AdminDeletePowerRentalResponse>(
        API.ADMIN_DELETE_POWERRENTAL,
        req,
        req.Message,
        (resp: AdminDeletePowerRentalResponse): void => {
          this.deleteBrands([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

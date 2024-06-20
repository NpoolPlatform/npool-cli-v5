import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  PowerRentalOrder,
  GetPowerRentalOrdersRequest,
  GetPowerRentalOrdersResponse,
  GetMyPowerRentalOrdersRequest,
  GetMyPowerRentalOrdersResponse,
  AdminGetPowerRentalOrdersRequest,
  AdminGetPowerRentalOrdersResponse,
  CreatePowerRentalOrderRequest,
  CreatePowerRentalOrderResponse,
  CreateUserPowerRentalOrderRequest,
  CreateUserPowerRentalOrderResponse,
  UpdatePowerRentalOrderRequest,
  UpdatePowerRentalOrderResponse,
  UpdateUserPowerRentalOrderRequest,
  UpdateUserPowerRentalOrderResponse,
  AdminCreatePowerRentalOrderRequest,
  AdminCreatePowerRentalOrderResponse,
  AdminUpdatePowerRentalOrderRequest,
  AdminUpdatePowerRentalOrderResponse,
  AdminDeletePowerRentalOrderRequest,
  AdminDeletePowerRentalOrderResponse
} from './types'

import { formalizeAppID } from '../../appuser/app/local'

export const usePowerRentalOrderStore = defineStore('power-rental-orders', {
  state: () => ({
    PowerRentalOrders: new Map<string, Array<PowerRentalOrder>>()
  }),
  getters: {
    powerRentalOrder (): (appID: string | undefined, id: string) => PowerRentalOrder | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.PowerRentalOrders.get(appID)?.find((el) => el.EntID === id)
      }
    },
    powerRentalOrders (): (appID?: string) => Array<PowerRentalOrder> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.PowerRentalOrders.get(appID) || []
      }
    }
  },
  actions: {
    addPowerRentalOrders (appID: string | undefined, powerRentalOrders: Array<PowerRentalOrder>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.PowerRentalOrders.get(appID) as Array<PowerRentalOrder>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      powerRentalOrders.forEach((powerRentalOrder) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === powerRentalOrder.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, powerRentalOrder)
      })
      this.PowerRentalOrders.set(appID, _simulateConfigs)
    },
    delPowerRentalOrder (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.PowerRentalOrders.get(appID) as Array<PowerRentalOrder>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.PowerRentalOrders.set(appID, _coins)
    },
    createPowerRentalOrder (req: CreatePowerRentalOrderRequest, done?: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<CreatePowerRentalOrderRequest, CreatePowerRentalOrderResponse>(
        API.CREATE_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: CreatePowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    createUserPowerRentalOrder (req: CreateUserPowerRentalOrderRequest, done?: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<CreateUserPowerRentalOrderRequest, CreateUserPowerRentalOrderResponse>(
        API.CREATE_USER_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: CreateUserPowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    updatePowerRentalOrder (req: UpdatePowerRentalOrderRequest, done: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<UpdatePowerRentalOrderRequest, UpdatePowerRentalOrderResponse>(
        API.UPDATE_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: UpdatePowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateUserPowerRentalOrder (req: UpdateUserPowerRentalOrderRequest, done: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<UpdateUserPowerRentalOrderRequest, UpdateUserPowerRentalOrderResponse>(
        API.UPDATE_USER_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: UpdateUserPowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminGetPowerRentalOrders (req: AdminGetPowerRentalOrdersRequest, done: (error: boolean, rows?: Array<PowerRentalOrder>, total?: number) => void) {
      doActionWithError<AdminGetPowerRentalOrdersRequest, AdminGetPowerRentalOrdersResponse>(
        API.ADMIN_GET_POWERRENTAL_ORDERS,
        req,
        req.Message,
        (resp: AdminGetPowerRentalOrdersResponse): void => {
          this.addPowerRentalOrders(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getPowerRentalOrders (req: GetPowerRentalOrdersRequest, done: (error: boolean, rows?: Array<PowerRentalOrder>, total?: number) => void) {
      doActionWithError<GetPowerRentalOrdersRequest, GetPowerRentalOrdersResponse>(
        API.GET_POWERRENTAL_ORDERS,
        req,
        req.Message,
        (resp: GetPowerRentalOrdersResponse): void => {
          this.addPowerRentalOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getMyPowerRentalOrders (req: GetMyPowerRentalOrdersRequest, done: (error: boolean, rows?: Array<PowerRentalOrder>, total?: number) => void) {
      doActionWithError<GetMyPowerRentalOrdersRequest, GetMyPowerRentalOrdersResponse>(
        API.GET_MY_POWERRENTAL_ORDERS,
        req,
        req.Message,
        (resp: GetMyPowerRentalOrdersResponse): void => {
          this.addPowerRentalOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminCreatePowerRentalOrder (req: AdminCreatePowerRentalOrderRequest, done?: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<AdminCreatePowerRentalOrderRequest, AdminCreatePowerRentalOrderResponse>(
        API.ADMIN_CREATE_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: AdminCreatePowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminUpdatePowerRentalOrder (req: AdminUpdatePowerRentalOrderRequest, done: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<AdminUpdatePowerRentalOrderRequest, AdminUpdatePowerRentalOrderResponse>(
        API.ADMIN_UPDATE_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: AdminUpdatePowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeletePowerRentalOrder (req: AdminDeletePowerRentalOrderRequest, done: (error: boolean, row?: PowerRentalOrder) => void) {
      doActionWithError<AdminDeletePowerRentalOrderRequest, AdminDeletePowerRentalOrderResponse>(
        API.ADMIN_DELETE_POWERRENTAL_ORDER,
        req,
        req.Message,
        (resp: AdminDeletePowerRentalOrderResponse): void => {
          this.addPowerRentalOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

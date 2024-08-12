import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../request'
import {
  FeeOrder,
  GetFeeOrdersRequest,
  GetFeeOrdersResponse,
  GetMyFeeOrdersRequest,
  GetMyFeeOrdersResponse,
  AdminGetFeeOrdersRequest,
  AdminGetFeeOrdersResponse,
  CreateFeeOrderRequest,
  CreateFeeOrderResponse,
  CreateUserFeeOrderRequest,
  CreateUserFeeOrderResponse,
  CreateFeeOrdersRequest,
  CreateFeeOrdersResponse,
  CreateUserFeeOrdersRequest,
  CreateUserFeeOrdersResponse,
  UpdateFeeOrderRequest,
  UpdateFeeOrderResponse,
  UpdateUserFeeOrderRequest,
  UpdateUserFeeOrderResponse,
  AdminCreateFeeOrderRequest,
  AdminCreateFeeOrderResponse,
  AdminCreateFeeOrdersRequest,
  AdminCreateFeeOrdersResponse,
  AdminUpdateFeeOrderRequest,
  AdminUpdateFeeOrderResponse,
  AdminDeleteFeeOrderRequest,
  AdminDeleteFeeOrderResponse
} from './types'

import { formalizeAppID } from '../../appuser/app/local'

export const useFeeOrderStore = defineStore('fee-orders', {
  state: () => ({
    FeeOrders: new Map<string, Array<FeeOrder>>()
  }),
  getters: {
    feeOrder (): (appID: string | undefined, id: string) => FeeOrder | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.FeeOrders.get(appID)?.find((el) => el.EntID === id)
      }
    },
    feeOrders (): (appID?: string) => Array<FeeOrder> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.FeeOrders.get(appID) || []
      }
    }
  },
  actions: {
    addFeeOrders (appID: string | undefined, feeOrders: Array<FeeOrder>) {
      appID = formalizeAppID(appID)
      let _simulateConfigs = this.FeeOrders.get(appID) as Array<FeeOrder>
      if (!_simulateConfigs) {
        _simulateConfigs = []
      }
      feeOrders.forEach((feeOrder) => {
        const index = _simulateConfigs.findIndex((el) => el.ID === feeOrder.ID)
        _simulateConfigs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, feeOrder)
      })
      this.FeeOrders.set(appID, _simulateConfigs)
    },
    delFeeOrder (appID: string | undefined, id: number) {
      appID = formalizeAppID(appID)
      let _coins = this.FeeOrders.get(appID) as Array<FeeOrder>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.FeeOrders.set(appID, _coins)
    },
    createFeeOrder (req: CreateFeeOrderRequest, done?: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<CreateFeeOrderRequest, CreateFeeOrderResponse>(
        API.CREATE_FEE_ORDER,
        req,
        req.Message,
        (resp: CreateFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    createUserFeeOrder (req: CreateUserFeeOrderRequest, done?: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<CreateUserFeeOrderRequest, CreateUserFeeOrderResponse>(
        API.CREATE_USER_FEE_ORDER,
        req,
        req.Message,
        (resp: CreateUserFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    createFeeOrders (req: CreateFeeOrdersRequest, done: (error: boolean, rows?: Array<FeeOrder>) => void) {
      doActionWithError<CreateFeeOrdersRequest, CreateFeeOrdersResponse>(
        API.CREATE_FEE_ORDERS,
        req,
        req.Message,
        (resp: CreateFeeOrdersResponse): void => {
          this.addFeeOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createUserFeeOrders (req: CreateUserFeeOrdersRequest, done: (error: boolean, rows?: Array<FeeOrder>) => void) {
      doActionWithError<CreateUserFeeOrdersRequest, CreateUserFeeOrdersResponse>(
        API.CREATE_USER_FEE_ORDERS,
        req,
        req.Message,
        (resp: CreateUserFeeOrdersResponse): void => {
          this.addFeeOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateFeeOrder (req: UpdateFeeOrderRequest, done: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<UpdateFeeOrderRequest, UpdateFeeOrderResponse>(
        API.UPDATE_FEE_ORDER,
        req,
        req.Message,
        (resp: UpdateFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateUserFeeOrder (req: UpdateUserFeeOrderRequest, done: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<UpdateUserFeeOrderRequest, UpdateUserFeeOrderResponse>(
        API.UPDATE_USER_FEE_ORDER,
        req,
        req.Message,
        (resp: UpdateUserFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminGetFeeOrders (req: AdminGetFeeOrdersRequest, done: (error: boolean, rows?: Array<FeeOrder>, total?: number) => void) {
      doActionWithError<AdminGetFeeOrdersRequest, AdminGetFeeOrdersResponse>(
        API.ADMIN_GET_FEE_ORDERS,
        req,
        req.Message,
        (resp: AdminGetFeeOrdersResponse): void => {
          this.addFeeOrders(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    getFeeOrders (req: GetFeeOrdersRequest, done: (error: boolean, rows?: Array<FeeOrder>, total?: number) => void) {
      doActionWithError<GetFeeOrdersRequest, GetFeeOrdersResponse>(
        API.GET_FEE_ORDERS,
        req,
        req.Message,
        (resp: GetFeeOrdersResponse): void => {
          this.addFeeOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getMyFeeOrders (req: GetMyFeeOrdersRequest, done?: (error: boolean, rows?: Array<FeeOrder>, total?: number) => void) {
      doActionWithError<GetMyFeeOrdersRequest, GetMyFeeOrdersResponse>(
        API.GET_MY_FEE_ORDERS,
        req,
        req.Message,
        (resp: GetMyFeeOrdersResponse): void => {
          this.addFeeOrders(undefined, resp.Infos)
          done?.(false, resp.Infos)
        }, () => {
          done?.(true)
        })
    },
    adminCreateFeeOrder (req: AdminCreateFeeOrderRequest, done?: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<AdminCreateFeeOrderRequest, AdminCreateFeeOrderResponse>(
        API.ADMIN_CREATE_FEE_ORDER,
        req,
        req.Message,
        (resp: AdminCreateFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreateFeeOrders (req: AdminCreateFeeOrdersRequest, done: (error: boolean, rows?: Array<FeeOrder>) => void) {
      doActionWithError<AdminCreateFeeOrdersRequest, AdminCreateFeeOrdersResponse>(
        API.ADMIN_CREATE_FEE_ORDERS,
        req,
        req.Message,
        (resp: AdminCreateFeeOrdersResponse): void => {
          this.addFeeOrders(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    adminUpdateFeeOrder (req: AdminUpdateFeeOrderRequest, done: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<AdminUpdateFeeOrderRequest, AdminUpdateFeeOrderResponse>(
        API.ADMIN_UPDATE_FEE_ORDER,
        req,
        req.Message,
        (resp: AdminUpdateFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    adminDeleteFeeOrder (req: AdminDeleteFeeOrderRequest, done: (error: boolean, row?: FeeOrder) => void) {
      doActionWithError<AdminDeleteFeeOrderRequest, AdminDeleteFeeOrderResponse>(
        API.ADMIN_DELETE_FEE_ORDER,
        req,
        req.Message,
        (resp: AdminDeleteFeeOrderResponse): void => {
          this.addFeeOrders(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

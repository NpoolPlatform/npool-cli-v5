import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminCreateEventCouponRequest,
  AdminCreateEventCouponResponse,
  AdminGetEventCouponsRequest,
  AdminGetEventCouponsResponse,
  AdminDeleteEventCouponRequest,
  AdminDeleteEventCouponResponse,
  EventCoupon
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useEventCouponStore = defineStore('event-coupons', {
  state: () => ({
    EventCoupons: new Map<string, Array<EventCoupon>>()
  }),
  getters: {
    eventcoupons (): (appID?: string) => Array<EventCoupon> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.EventCoupons.get(appID) || []
      }
    },
    addEventCoupons (): (appID: string | undefined, events: Array<EventCoupon>) => void {
      return (appID: string | undefined, events: Array<EventCoupon>) => {
        appID = formalizeAppID(appID)
        let _events = this.EventCoupons.get(appID) as Array<EventCoupon>
        if (!_events) {
          _events = []
        }
        events.forEach((event) => {
          const index = _events.findIndex((el) => el.ID === event.ID)
          _events.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, event)
        })
        this.EventCoupons.set(appID, _events)
      }
    },
    delEventCoupon (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _eventCoupons = this.EventCoupons.get(appID) as Array<EventCoupon>
        if (!_eventCoupons) {
          _eventCoupons = []
        }
        const index = _eventCoupons.findIndex((el) => el.ID === id)
        _eventCoupons.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.EventCoupons.set(appID, _eventCoupons)
      }
    }
  },
  actions: {
    adminGetEventCoupons (req: AdminGetEventCouponsRequest, done: (error: boolean, rows?: Array<EventCoupon>) => void) {
      doActionWithError<AdminGetEventCouponsRequest, AdminGetEventCouponsResponse>(
        API.ADMIN_GET_EVENTCOUPONINSPIRES,
        req,
        req.Message,
        (resp: AdminGetEventCouponsResponse): void => {
          this.addEventCoupons(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateEventCoupon (req: AdminCreateEventCouponRequest, done: (error: boolean, row?: EventCoupon) => void) {
      doActionWithError<AdminCreateEventCouponRequest, AdminCreateEventCouponResponse>(
        API.ADMIN_CREATE_EVENTCOUPONINSPIRE,
        req,
        req.Message,
        (resp: AdminCreateEventCouponResponse): void => {
          this.addEventCoupons(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteEventCoupon (req: AdminDeleteEventCouponRequest, done: (error: boolean, row?: EventCoupon) => void) {
      doActionWithError<AdminDeleteEventCouponRequest, AdminDeleteEventCouponResponse>(
        API.ADMIN_DELETE_EVENTCOUPONINSPIRE,
        req,
        req.Message,
        (resp: AdminDeleteEventCouponResponse): void => {
          this.delEventCoupon(undefined, req.ID)
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

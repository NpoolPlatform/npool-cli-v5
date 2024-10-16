import { defineStore } from 'pinia'
import { API } from './const'
import {
  AdminUpdateEventCoinRequest,
  AdminUpdateEventCoinResponse,
  AdminCreateEventCoinRequest,
  AdminCreateEventCoinResponse,
  AdminGetEventCoinsRequest,
  AdminGetEventCoinsResponse,
  AdminDeleteEventCoinRequest,
  AdminDeleteEventCoinResponse,
  EventCoin
} from './types'
import { doActionWithError } from '../../../request/action'
import { formalizeAppID } from '../../../appuser/app/local'

export const useEventCoinStore = defineStore('event-coins', {
  state: () => ({
    EventCoins: new Map<string, Array<EventCoin>>()
  }),
  getters: {
    eventcoins (): (appID?: string) => Array<EventCoin> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.EventCoins.get(appID) || []
      }
    },
    addEventCoins (): (appID: string | undefined, events: Array<EventCoin>) => void {
      return (appID: string | undefined, events: Array<EventCoin>) => {
        appID = formalizeAppID(appID)
        let _events = this.EventCoins.get(appID) as Array<EventCoin>
        if (!_events) {
          _events = []
        }
        events.forEach((event) => {
          const index = _events.findIndex((el) => el.ID === event.ID)
          _events.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, event)
        })
        this.EventCoins.set(appID, _events)
      }
    },
    delEventCoin (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _eventCoins = this.EventCoins.get(appID) as Array<EventCoin>
        if (!_eventCoins) {
          _eventCoins = []
        }
        const index = _eventCoins.findIndex((el) => el.ID === id)
        _eventCoins.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.EventCoins.set(appID, _eventCoins)
      }
    }
  },
  actions: {
    adminGetEventCoins (req: AdminGetEventCoinsRequest, done: (error: boolean, rows?: Array<EventCoin>) => void) {
      doActionWithError<AdminGetEventCoinsRequest, AdminGetEventCoinsResponse>(
        API.ADMIN_GET_EVENTCOININSPIRES,
        req,
        req.Message,
        (resp: AdminGetEventCoinsResponse): void => {
          this.addEventCoins(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateEventCoin (req: AdminUpdateEventCoinRequest, done: (error: boolean, row?: EventCoin) => void) {
      doActionWithError<AdminUpdateEventCoinRequest, AdminUpdateEventCoinResponse>(
        API.ADMIN_UPDATE_EVENTCOININSPIRE,
        req,
        req.Message,
        (resp: AdminUpdateEventCoinResponse): void => {
          this.addEventCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateEventCoin (req: AdminCreateEventCoinRequest, done: (error: boolean, row?: EventCoin) => void) {
      doActionWithError<AdminCreateEventCoinRequest, AdminCreateEventCoinResponse>(
        API.ADMIN_CREATE_EVENTCOININSPIRE,
        req,
        req.Message,
        (resp: AdminCreateEventCoinResponse): void => {
          this.addEventCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteEventCoin (req: AdminDeleteEventCoinRequest, done: (error: boolean, row?: EventCoin) => void) {
      doActionWithError<AdminDeleteEventCoinRequest, AdminDeleteEventCoinResponse>(
        API.ADMIN_DELETE_EVENTCOININSPIRE,
        req,
        req.Message,
        (resp: AdminDeleteEventCoinResponse): void => {
          this.delEventCoin(undefined, req.ID)
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

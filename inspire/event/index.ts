import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateEventRequest,
  UpdateEventResponse,
  CreateEventRequest,
  CreateEventResponse,
  GetEventsRequest,
  GetEventsResponse,
  AdminUpdateEventRequest,
  AdminUpdateEventResponse,
  AdminCreateEventRequest,
  AdminCreateEventResponse,
  AdminGetEventsRequest,
  AdminGetEventsResponse,
  AdminDeleteEventRequest,
  AdminDeleteEventResponse,
  Event
} from './types'
import { doActionWithError } from '../../request/action'
import { formalizeAppID } from '../../appuser/app/local'

export const useEventStore = defineStore('event', {
  state: () => ({
    Events: new Map<string, Array<Event>>()
  }),
  getters: {
    events (): (appID?: string) => Array<Event> {
      return (appID?: string) => {
        appID = formalizeAppID()
        return this.Events.get(appID)?.sort((a, b) => a.EventType.localeCompare(b.EventType, 'zh-CN')) || []
      }
    },
    addEvents (): (appID: string | undefined, events: Array<Event>) => void {
      return (appID: string | undefined, events: Array<Event>) => {
        appID = formalizeAppID(appID)
        let _events = this.Events.get(appID) as Array<Event>
        if (!_events) {
          _events = []
        }
        events.forEach((event) => {
          const index = _events.findIndex((el) => el.ID === event.ID)
          _events.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, event)
        })
        this.Events.set(appID, _events)
      }
    },
    delEvent (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _events = this.Events.get(appID) as Array<Event>
        if (!_events) {
          _events = []
        }
        const index = _events.findIndex((el) => el.ID === id)
        _events.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.Events.set(appID, _events)
      }
    }
  },
  actions: {
    getEvents (req: GetEventsRequest, done: (error: boolean, rows?: Array<Event>) => void) {
      doActionWithError<GetEventsRequest, GetEventsResponse>(
        API.GET_EVENTINSPIRES,
        req,
        req.Message,
        (resp: GetEventsResponse): void => {
          this.addEvents(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateEvent (req: UpdateEventRequest, done: (error: boolean, row?: Event) => void) {
      doActionWithError<UpdateEventRequest, UpdateEventResponse>(
        API.UPDATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: UpdateEventResponse): void => {
          this.addEvents(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createEvent (req: CreateEventRequest, done: (error: boolean, row?: Event) => void) {
      doActionWithError<CreateEventRequest, CreateEventResponse>(
        API.CREATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: CreateEventResponse): void => {
          this.addEvents(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminGetEvents (req: AdminGetEventsRequest, done: (error: boolean, rows?: Array<Event>) => void) {
      doActionWithError<AdminGetEventsRequest, AdminGetEventsResponse>(
        API.ADMIN_GET_EVENTINSPIRES,
        req,
        req.Message,
        (resp: AdminGetEventsResponse): void => {
          this.addEvents(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    adminUpdateEvent (req: AdminUpdateEventRequest, done: (error: boolean, row?: Event) => void) {
      doActionWithError<AdminUpdateEventRequest, AdminUpdateEventResponse>(
        API.ADMIN_UPDATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: AdminUpdateEventResponse): void => {
          this.addEvents(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminCreateEvent (req: AdminCreateEventRequest, done: (error: boolean, row?: Event) => void) {
      doActionWithError<AdminCreateEventRequest, AdminCreateEventResponse>(
        API.ADMIN_CREATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: AdminCreateEventResponse): void => {
          this.addEvents(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    adminDeleteEvent (req: AdminDeleteEventRequest, done: (error: boolean, row?: Event) => void) {
      doActionWithError<AdminDeleteEventRequest, AdminDeleteEventResponse>(
        API.ADMIN_DELETE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: AdminDeleteEventResponse): void => {
          this.delEvent(undefined, req.ID)
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

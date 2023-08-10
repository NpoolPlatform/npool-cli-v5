import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateEventRequest,
  UpdateEventResponse,
  CreateEventRequest,
  CreateEventResponse,
  GetEventsRequest,
  GetEventsResponse,
  Event
} from './types'
import { doActionWithError } from 'npool-cli-v4'

export const useEventStore = defineStore('event', {
  state: () => ({
    Events: [] as Array<Event>
  }),
  getters: {
    events: (state) : Array<Event> => {
      return state.Events.sort((a, b) => a.EventType.localeCompare(b.EventType, 'zh-CN'))
    }
  },
  actions: {
    getEvents (req: GetEventsRequest, done: (error: boolean, rows: Array<Event>) => void) {
      doActionWithError<GetEventsRequest, GetEventsResponse>(
        API.GET_EVENTINSPIRES,
        req,
        req.Message,
        (resp: GetEventsResponse): void => {
          this.Events.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Event>)
        }
      )
    },
    updateEvent (req: UpdateEventRequest, done: (error: boolean, row: Event) => void) {
      doActionWithError<UpdateEventRequest, UpdateEventResponse>(
        API.UPDATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: UpdateEventResponse): void => {
          const index = this.Events.findIndex((el) => el.ID === resp.Info.ID)
          this.Events.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Event)
        }
      )
    },
    createEvent (req: CreateEventRequest, done: (error: boolean, row: Event) => void) {
      doActionWithError<CreateEventRequest, CreateEventResponse>(
        API.CREATE_EVENTINSPIRE,
        req,
        req.Message,
        (resp: CreateEventResponse): void => {
          this.Events.push(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Event)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

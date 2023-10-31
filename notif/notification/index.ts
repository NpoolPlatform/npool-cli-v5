import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  GetNotifRequest,
  GetNotifResponse,
  GetNotifsRequest,
  GetNotifsResponse,
  Notif,
  UpdateNotifsRequest,
  UpdateNotifsResponse,
  GetAppNotifsRequest,
  GetAppNotifsResponse
} from './types'
import { formalizeAppID } from '../../appuser/app/local'

export const useNotifStore = defineStore('notifs', {
  state: () => ({
    Notifs: new Map<string, Array<Notif>>()
  }),
  getters: {
    notif (): (appID: string | undefined, id: number) => Notif | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.find((el) => el.ID === id)
      }
    },
    unreads (): (appID: string | undefined, userID: string | undefined) => Array<Notif> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.filter((el) => {
          let ok = !el.Notified
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0) || []
      }
    },
    notifs () : (appID: string | undefined, userID: string | undefined) => Array<Notif> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0) || []
      }
    },
    addNotifs (): (appID: string | undefined, notifs: Array<Notif>) => void {
      return (appID: string | undefined, notifs: Array<Notif>) => {
        appID = formalizeAppID(appID)
        let _notifs = this.Notifs.get(appID) as Array<Notif>
        if (!_notifs) {
          _notifs = []
        }
        notifs.forEach((notif) => {
          const index = _notifs.findIndex((el) => el.ID === notif.ID)
          _notifs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, notif)
        })
        this.Notifs.set(appID, _notifs)
      }
    }
  },
  actions: {
    getNotifs (req: GetNotifsRequest, done: (error: boolean, rows: Array<Notif>) => void) {
      doActionWithError<GetNotifsRequest, GetNotifsResponse>(
        API.GET_NOTIFS,
        req,
        req.Message,
        (resp: GetNotifsResponse): void => {
          this.addNotifs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    },
    getNotif (req: GetNotifRequest, done: (error: boolean, row: Notif) => void) {
      doActionWithError<GetNotifRequest, GetNotifResponse>(
        API.GET_NOTIF,
        req,
        req.Message,
        (resp: GetNotifResponse): void => {
          this.addNotifs(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Notif)
        })
    },
    updateNotifs (req: UpdateNotifsRequest, done: (error: boolean, rows: Notif[]) => void) {
      doActionWithError<UpdateNotifsRequest, UpdateNotifsResponse>(
        API.UPDATE_NOTIFS,
        req,
        req.Message,
        (resp: UpdateNotifsResponse): void => {
          this.addNotifs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Notif[])
        })
    },

    getAppNotifs (req: GetAppNotifsRequest, done: (error: boolean, rows: Array<Notif>) => void) {
      doActionWithError<GetAppNotifsRequest, GetAppNotifsResponse>(
        API.GET_APP_NOTIFS,
        req,
        req.Message,
        (resp: GetAppNotifsResponse): void => {
          this.addNotifs(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    }
  }
})

export * from './types'
export * from './const'

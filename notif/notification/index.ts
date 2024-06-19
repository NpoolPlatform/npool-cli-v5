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
import { AppNotifs } from './state'

export const useNotifStore = defineStore('notifs', {
  state: () => ({
    Notifs: new Map<string, AppNotifs>()
  }),
  getters: {
    notif (): (appID: string | undefined, id: number) => Notif | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.Notifs.find((el) => el.ID === id)
      }
    },
    unreads (): (appID: string | undefined, userID: string | undefined) => Array<Notif> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.Notifs.filter((el) => {
          let ok = !el.Notified
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0) || []
      }
    },
    notifs () : (appID: string | undefined, userID: string | undefined) => Array<Notif> {
      return (appID: string | undefined, userID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.Notifs?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0) || []
      }
    },
    pageStart (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.PageStart || 0
      }
    },
    pageLimit (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.PageLimit || 10
      }
    },
    pageLoaded (): (appID: string | undefined, page: number) => boolean {
      return (appID: string | undefined, page: number) => {
        appID = formalizeAppID(appID)
        const appNotifs = this.Notifs.get(appID) || {} as AppNotifs
        return appNotifs.LoadedPages?.includes(page)
      }
    },
    pageLoading (): (appID: string | undefined, page: number) => boolean {
      return (appID: string | undefined, page: number) => {
        appID = formalizeAppID(appID)
        const appNotifs = this.Notifs.get(appID) || {} as AppNotifs
        return appNotifs.LoadingPages?.includes(page)
      }
    },
    totalRows (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.TotalRows || 0
      }
    },
    totalPages (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Notifs.get(appID)?.TotalPages || 0
      }
    }
  },
  actions: {
    addNotifs (appID: string | undefined, notifs: Array<Notif>) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) || {
        PageStart: 0,
        PageLimit: 10,
        LoadedPages: [] as number[],
        LoadingPages: [] as number[]
      } as AppNotifs
      const _notifs = appNotifs.Notifs || []
      notifs.forEach((notif) => {
        const index = _notifs.findIndex((el) => el.ID === notif.ID)
        _notifs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, notif)
      })
      appNotifs.Notifs = _notifs
      this.Notifs.set(appID, appNotifs)
    },
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

    getAppNotifs (req: GetAppNotifsRequest, done: (error: boolean, rows?: Array<Notif>, total?: number) => void) {
      doActionWithError<GetAppNotifsRequest, GetAppNotifsResponse>(
        API.GET_APP_NOTIFS,
        req,
        req.Message,
        (resp: GetAppNotifsResponse): void => {
          this.addNotifs(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },

    setPageStart (appID: string | undefined, pageStart: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) || {
        PageStart: pageStart,
        PageLimit: 10,
        LoadedPages: [] as number[],
        LoadingPages: [] as number[]
      } as AppNotifs
      appNotifs.PageStart = pageStart
      this.Notifs.set(appID, appNotifs)
    },

    setPageLimit (appID: string | undefined, pageLimit: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) || {
        PageStart: 0,
        PageLimit: pageLimit,
        LoadedPages: [] as number[],
        LoadingPages: [] as number[]
      } as AppNotifs
      appNotifs.PageStart = pageLimit
      this.Notifs.set(appID, appNotifs)
    },

    loadPage (appID: string | undefined, page: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) || {
        PageStart: 0,
        PageLimit: 10,
        LoadedPages: [] as number[],
        LoadingPages: [] as number[]
      } as AppNotifs
      appNotifs.LoadedPages.push(page)
      this.Notifs.set(appID, appNotifs)
    },

    loadingPage (appID: string | undefined, page: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) || {
        PageStart: 0,
        PageLimit: 10,
        LoadedPages: [] as number[],
        LoadingPages: [] as number[]
      } as AppNotifs
      appNotifs.LoadingPages.push(page)
      this.Notifs.set(appID, appNotifs)
    },

    setTotalPages (appID: string | undefined, pages: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) as AppNotifs
      appNotifs.TotalPages = pages
      this.Notifs.set(appID, appNotifs)
    },

    setTotalRows (appID: string | undefined, rows: number) {
      appID = formalizeAppID(appID)
      const appNotifs = this.Notifs.get(appID) as AppNotifs
      appNotifs.TotalRows = rows
      this.Notifs.set(appID, appNotifs)
    }
  }
})

export * from './types'
export * from './const'

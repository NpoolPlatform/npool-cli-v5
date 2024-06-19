import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  GetAppAnnouncementsRequest,
  GetAppAnnouncementsResponse,
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  DeleteAnnouncementRequest,
  DeleteAnnouncementResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
  Announcement,
  GetNAppAnnouncementsRequest,
  GetNAppAnnouncementsResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useAnnouncementStore = defineStore('announcements', {
  state: () => ({
    Announcements: new Map<string, Array<Announcement>>(),
    PageStarts: new Map<string, number>()
  }),
  getters: {
    announcement (): (appID: string | undefined, id: number) => Announcement | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Announcements.get(appID)?.find((el) => el.ID === id)
      }
    },
    getAnnouncementByEntID (): (appID: string | undefined, entID: string) => Announcement | undefined {
      return (appID: string | undefined, entID: string) => {
        appID = formalizeAppID(appID)
        return this.Announcements.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    announcements (): (appID: string | undefined) => Array<Announcement> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Announcements.get(appID) || []
      }
    },
    addAnnouncements (): (appID: string | undefined, announcements: Array<Announcement>) => void {
      return (appID: string | undefined, announcements: Array<Announcement>) => {
        appID = formalizeAppID(appID)
        let _announcements = this.Announcements.get(appID) as Array<Announcement>
        if (!_announcements) {
          _announcements = []
        }
        announcements.forEach((announcement) => {
          const index = _announcements.findIndex((el) => el.ID === announcement.ID)
          _announcements.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, announcement)
        })
        this.Announcements.set(appID, _announcements)
      }
    },
    delAnnouncement (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _announcements = this.Announcements.get(appID) as Array<Announcement>
        if (!_announcements) {
          _announcements = []
        }
        const index = _announcements.findIndex((el) => el.ID === id)
        _announcements.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.Announcements.set(appID, _announcements)
      }
    },
    pageStart (): (appID: string | undefined) => number {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.PageStarts.get(appID) || 0
      }
    }
  },
  actions: {
    getAnnouncements (req: GetAnnouncementsRequest, done: (error: boolean, rows: Array<Announcement>) => void) {
      doActionWithError<GetAnnouncementsRequest, GetAnnouncementsResponse>(
        API.GET_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAnnouncementsResponse): void => {
          this.addAnnouncements(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Announcement>)
        }
      )
    },
    getAppAnnouncements (req: GetAppAnnouncementsRequest, done: (error: boolean, rows: Array<Announcement>) => void) {
      doActionWithError<GetAppAnnouncementsRequest, GetAppAnnouncementsResponse>(
        API.GET_APP_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAppAnnouncementsResponse): void => {
          this.addAnnouncements(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Announcement>)
        }
      )
    },
    deleteAnnouncement (req: DeleteAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<DeleteAnnouncementRequest, DeleteAnnouncementResponse>(
        API.DELETE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: DeleteAnnouncementResponse): void => {
          this.delAnnouncement(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    },
    createAnnouncement (req: CreateAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<CreateAnnouncementRequest, CreateAnnouncementResponse>(
        API.CREATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: CreateAnnouncementResponse): void => {
          this.addAnnouncements(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    },
    updateAnnouncement (req: UpdateAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<UpdateAnnouncementRequest, UpdateAnnouncementResponse>(
        API.UPDATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: UpdateAnnouncementResponse): void => {
          this.addAnnouncements(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    },

    getNAppAnnouncements (req: GetNAppAnnouncementsRequest, done: (error: boolean, rows: Array<Announcement>) => void) {
      doActionWithError<GetNAppAnnouncementsRequest, GetNAppAnnouncementsResponse>(
        API.GET_N_APP_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetNAppAnnouncementsResponse): void => {
          this.addAnnouncements(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Announcement>)
        }
      )
    },

    setPageStart (appID: string | undefined, pageStart: number) {
      appID = formalizeAppID(appID)
      this.PageStarts.set(appID, pageStart)
    }
  }
})

export * from './const'
export * from './types'

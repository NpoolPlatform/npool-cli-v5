import { defineStore } from 'pinia'
import { API } from './const'
import {
  Media,
  GetMediasRequest,
  GetMediasResponse,
  UploadMediaRequest,
  UploadMediaResponse,
  DeleteMediaRequest,
  DeleteMediaResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useMediaStore = defineStore('medias', {
  state: () => ({
    Medias: new Map<string, Array<Media>>()
  }),
  getters: {
    media (): (appID: string | undefined, id: number) => Media | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Medias.get(appID)?.find((el) => el.ID === id)
      }
    },
    getMediaByEntID (): (appID: string | undefined, entID: string) => Media | undefined {
      return (appID: string | undefined, entID: string) => {
        appID = formalizeAppID(appID)
        return this.Medias.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    medias (): (appID: string | undefined) => Array<Media> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Medias.get(appID) || []
      }
    },
    addMedias (): (appID: string | undefined, medias: Array<Media>) => void {
      return (appID: string | undefined, medias: Array<Media>) => {
        appID = formalizeAppID(appID)
        let _medias = this.Medias.get(appID) as Array<Media>
        if (!_medias) {
          _medias = []
        }
        medias.forEach((media) => {
          const index = _medias.findIndex((el) => el.ID === media.ID)
          _medias.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, media)
        })
        this.Medias.set(appID, _medias)
      }
    },
    delMedia (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _medias = this.Medias.get(appID) as Array<Media>
        if (!_medias) {
          _medias = []
        }
        const index = _medias.findIndex((el) => el.ID === id)
        _medias.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.Medias.set(appID, _medias)
      }
    }
  },
  actions: {
    getMedias (req: GetMediasRequest, done: (error: boolean, rows: Array<Media>) => void) {
      doActionWithError<GetMediasRequest, GetMediasResponse>(
        API.GET_MEDIAS,
        req,
        req.Message,
        (resp: GetMediasResponse): void => {
          this.addMedias(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Media>)
        }
      )
    },
    uploadMedia (req: UploadMediaRequest, done: (error: boolean, row: Media) => void) {
      doActionWithError<UploadMediaRequest, UploadMediaResponse>(
        API.UPLOAD_MEDIA,
        req,
        req.Message,
        (resp: UploadMediaResponse): void => {
          this.addMedias(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Media)
        }
      )
    },
    deleteMedia (req: DeleteMediaRequest, done: (error: boolean, row: Media) => void) {
      doActionWithError<DeleteMediaRequest, DeleteMediaResponse>(
        API.DELETE_MEDIA,
        req,
        req.Message,
        (resp: DeleteMediaResponse): void => {
          this.delMedia(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Media)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

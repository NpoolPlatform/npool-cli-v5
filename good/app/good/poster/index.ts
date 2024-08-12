import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Poster,
  GetPostersRequest,
  GetPostersResponse,
  AdminGetPostersRequest,
  AdminGetPostersResponse,
  UpdatePosterRequest,
  UpdatePosterResponse,
  AdminCreatePosterRequest,
  AdminCreatePosterResponse,
  AdminUpdatePosterRequest,
  AdminUpdatePosterResponse,
  AdminDeletePosterRequest,
  AdminDeletePosterResponse,
  CreatePosterRequest,
  CreatePosterResponse,
  DeletePosterRequest,
  DeletePosterResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const usePosterStore = defineStore('appGoodPosters', {
  state: () => ({
    Posters: new Map<string, Array<Poster>>()
  }),
  getters: {
    poster (): (appID: string | undefined, id: string) => Poster | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Posters.get(appID)?.find((el: Poster) => el.EntID === id)
      }
    },
    posters (): (appID?: string) => Array<Poster> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Posters.get(appID) || []
      }
    }
  },
  actions: {
    addPosters (appID: string | undefined, posters: Array<Poster>) {
      appID = formalizeAppID(appID)
      let _posters = this.Posters.get(appID) as Array<Poster>
      if (!_posters) {
        _posters = []
      }
      posters.forEach((poster) => {
        if (!poster) return
        const index = _posters.findIndex((el) => el.EntID === poster.EntID)
        _posters.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, poster)
      })
      this.Posters.set(appID, _posters)
    },
    _deletePoster (appID: string | undefined, poster: Poster) {
      appID = formalizeAppID(appID)
      let _posters = this.Posters.get(appID) as Array<Poster>
      if (!_posters) {
        _posters = []
      }
      const index = _posters.findIndex((el) => el.EntID === poster.EntID)
      _posters.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Posters.set(appID, _posters)
    },
    getPosters (req: GetPostersRequest, done?: (error: boolean, rows?: Array<Poster>, total?: number) => void) {
      doActionWithError<GetPostersRequest, GetPostersResponse>(
        API.GET_GOOD_POSTERS,
        req,
        req.Message,
        (resp: GetPostersResponse): void => {
          this.addPosters(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    createPoster (req: CreatePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<CreatePosterRequest, CreatePosterResponse>(
        API.CREATE_GOOD_POSTER,
        req,
        req.Message,
        (resp: CreatePosterResponse): void => {
          this.addPosters(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    updatePoster (req: UpdatePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<UpdatePosterRequest, UpdatePosterResponse>(
        API.UPDATE_GOOD_POSTER,
        req,
        req.Message,
        (resp: UpdatePosterResponse): void => {
          this.addPosters(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    deletePoster (req: DeletePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<DeletePosterRequest, DeletePosterResponse>(
        API.DELETE_GOOD_POSTER,
        req,
        req.Message,
        (resp: DeletePosterResponse): void => {
          this._deletePoster(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminCreatePoster (req: AdminCreatePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<AdminCreatePosterRequest, AdminCreatePosterResponse>(
        API.ADMIN_CREATE_GOOD_POSTER,
        req,
        req.Message,
        (resp: AdminCreatePosterResponse): void => {
          this.addPosters(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminGetPosters (req: AdminGetPostersRequest, done?: (error: boolean, rows?: Array<Poster>, total?: number) => void) {
      doActionWithError<AdminGetPostersRequest, AdminGetPostersResponse>(
        API.ADMIN_GET_GOOD_POSTERS,
        req,
        req.Message,
        (resp: AdminGetPostersResponse): void => {
          this.addPosters(undefined, resp.Infos)
          done?.(false, resp.Infos, resp.Total)
        }, () => {
          done?.(true)
        })
    },
    adminUpdatePoster (req: AdminUpdatePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<AdminUpdatePosterRequest, AdminUpdatePosterResponse>(
        API.ADMIN_UPDATE_GOOD_POSTER,
        req,
        req.Message,
        (resp: AdminUpdatePosterResponse): void => {
          this.addPosters(undefined, [resp.Info])
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    },
    adminDeletePoster (req: AdminDeletePosterRequest, done?: (error: boolean, row?: Poster) => void) {
      doActionWithError<AdminDeletePosterRequest, AdminDeletePosterResponse>(
        API.ADMIN_DELETE_GOOD_POSTER,
        req,
        req.Message,
        (resp: AdminDeletePosterResponse): void => {
          this._deletePoster(undefined, resp.Info)
          done?.(false, resp.Info)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './const'
export * from './types'

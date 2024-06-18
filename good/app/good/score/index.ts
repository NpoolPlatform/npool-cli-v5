import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  Score,
  GetScoresRequest,
  GetScoresResponse,
  GetMyScoresRequest,
  GetMyScoresResponse,
  CreateScoreRequest,
  CreateScoreResponse,
  DeleteScoreRequest,
  DeleteScoreResponse,
  AdminGetScoresRequest,
  AdminGetScoresResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useScoreStore = defineStore('app-good-likes', {
  state: () => ({
    Scores: new Map<string, Array<Score>>()
  }),
  getters: {
    like (): (appID: string | undefined, id: string) => Score | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.Scores.get(appID)?.find((el: Score) => el.EntID === id)
      }
    },
    likes (): (appID?: string) => Array<Score> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Scores.get(appID) || []
      }
    }
  },
  actions: {
    addScores (goods: Array<Score>) {
      goods.forEach((like) => {
        if (!like) return
        const _goods = this.Scores.get(like.AppID) as Array<Score> || []
        const index = _goods.findIndex((el) => el.EntID === like.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, like)
        this.Scores.set(like.AppID, _goods)
      })
    },
    _deleteScore (like: Score) {
      const _likes = this.likes(like.AppID) || []
      const index = _likes.findIndex((el: Score) => el.EntID === like.EntID)
      _likes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.Scores.set(like.AppID, _likes)
    },
    createScore (req: CreateScoreRequest, done: (error: boolean, row?: Score) => void) {
      doActionWithError<CreateScoreRequest, CreateScoreResponse>(
        API.CREATE_GOOD_SCORE,
        req,
        req.Message,
        (resp: CreateScoreResponse): void => {
          this.addScores([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getScores (req: GetScoresRequest, done: (error: boolean, rows?: Array<Score>, total?: number) => void) {
      doActionWithError<GetScoresRequest, GetScoresResponse>(
        API.GET_GOOD_SCORES,
        req,
        req.Message,
        (resp: GetScoresResponse): void => {
          this.addScores(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    deleteScore (req: DeleteScoreRequest, done: (error: boolean, row?: Score) => void) {
      doActionWithError<DeleteScoreRequest, DeleteScoreResponse>(
        API.DELETE_GOOD_SCORE,
        req,
        req.Message,
        (resp: DeleteScoreResponse): void => {
          this._deleteScore(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    getMyScores (req: GetMyScoresRequest, done: (error: boolean, rows?: Array<Score>, total?: number) => void) {
      doActionWithError<GetMyScoresRequest, GetMyScoresResponse>(
        API.GET_MY_GOOD_SCORES,
        req,
        req.Message,
        (resp: GetMyScoresResponse): void => {
          this.addScores(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    },
    adminGetScores (req: AdminGetScoresRequest, done: (error: boolean, rows?: Array<Score>, total?: number) => void) {
      doActionWithError<AdminGetScoresRequest, AdminGetScoresResponse>(
        API.ADMIN_GET_GOOD_SCORES,
        req,
        req.Message,
        (resp: AdminGetScoresResponse): void => {
          this.addScores(resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './const'
export * from './types'

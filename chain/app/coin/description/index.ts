import { defineStore } from 'pinia'
import { API, CoinDescriptionUsedFor } from './const'
import {
  CoinDescription,
  CreateCoinDescriptionRequest,
  CreateCoinDescriptionResponse,
  GetCoinDescriptionsRequest,
  GetCoinDescriptionsResponse,
  UpdateCoinDescriptionRequest,
  UpdateCoinDescriptionResponse,
  CreateAppCoinDescriptionRequest,
  CreateAppCoinDescriptionResponse,
  GetAppCoinDescriptionsRequest,
  GetAppCoinDescriptionsResponse,
  UpdateAppCoinDescriptionRequest,
  UpdateAppCoinDescriptionResponse
} from './types'
import { doActionWithError } from '../../../../request'
import { formalizeAppID } from '../../../../appuser/app'

export const useCoinDescriptionStore = defineStore('coin-descriptions', {
  state: () => ({
    CoinDescriptions: new Map<string, Array<CoinDescription>>()
  }),
  getters: {
    description (): (appID: string | undefined, id: string) => CoinDescription | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.CoinDescriptions.get(appID)?.find((el) => el.ID === id)
      }
    },
    coinDescriptions (): (appID: string | undefined, coinTypeID: string) => Array<CoinDescription> | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        appID = formalizeAppID(appID)
        return this.CoinDescriptions.get(appID)?.filter((el) => el.CoinTypeID === coinTypeID)
      }
    },
    coinUsedForDescription (): (appID: string | undefined, coinTypeID: string, usedFor: CoinDescriptionUsedFor) => CoinDescription | undefined {
      return (appID: string | undefined, coinTypeID: string, usedFor: CoinDescriptionUsedFor) => {
        appID = formalizeAppID(appID)
        return this.CoinDescriptions.get(appID)?.find((el) => el.CoinTypeID === coinTypeID && el.UsedFor === usedFor)
      }
    },
    addDescriptions (): (appID: string | undefined, descriptions: Array<CoinDescription>) => void {
      return (appID: string | undefined, descriptions: Array<CoinDescription>) => {
        appID = formalizeAppID(appID)
        let _descriptions = this.CoinDescriptions.get(appID) as Array<CoinDescription>
        if (!_descriptions) {
          _descriptions = []
        }
        descriptions.forEach((description) => {
          const index = _descriptions.findIndex((el) => el.ID === description.ID)
          _descriptions.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, description)
        })
        this.CoinDescriptions.set(appID, _descriptions)
      }
    }
  },
  actions: {
    getCoinDescriptions (req: GetCoinDescriptionsRequest, done: (error: boolean, descriptions?: Array<CoinDescription>) => void) {
      doActionWithError<GetCoinDescriptionsRequest, GetCoinDescriptionsResponse>(
        API.GET_COINDESCRIPTIONS,
        req,
        req.Message,
        (resp: GetCoinDescriptionsResponse): void => {
          this.addDescriptions(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateCoinDescription (req: UpdateCoinDescriptionRequest, done: (error: boolean, description?: CoinDescription) => void) {
      doActionWithError<UpdateCoinDescriptionRequest, UpdateCoinDescriptionResponse>(
        API.UPDATE_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: UpdateCoinDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createCoinDescription (req: CreateCoinDescriptionRequest, done: (error: boolean, description?: CoinDescription) => void) {
      doActionWithError<CreateCoinDescriptionRequest, CreateCoinDescriptionResponse>(
        API.CREATE_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: CreateCoinDescriptionResponse): void => {
          this.addDescriptions(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    getAppCoinDescriptions (req: GetAppCoinDescriptionsRequest, done: (error: boolean, descriptions?: Array<CoinDescription>) => void) {
      doActionWithError<GetAppCoinDescriptionsRequest, GetAppCoinDescriptionsResponse>(
        API.GET_APP_COINDESCRIPTIONS,
        req,
        req.Message,
        (resp: GetAppCoinDescriptionsResponse): void => {
          this.addDescriptions(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppCoinDescription (req: UpdateAppCoinDescriptionRequest, done: (error: boolean, description?: CoinDescription) => void) {
      doActionWithError<UpdateAppCoinDescriptionRequest, UpdateAppCoinDescriptionResponse>(
        API.UPDATE_APP_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: UpdateAppCoinDescriptionResponse): void => {
          this.addDescriptions(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createAppCoinDescription (req: CreateAppCoinDescriptionRequest, done: (error: boolean, description?: CoinDescription) => void) {
      doActionWithError<CreateAppCoinDescriptionRequest, CreateAppCoinDescriptionResponse>(
        API.CREATE_APP_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: CreateAppCoinDescriptionResponse): void => {
          this.addDescriptions(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

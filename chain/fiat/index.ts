import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetFiatsRequest,
  GetFiatsResponse,
  UpdateFiatRequest,
  UpdateFiatResponse,
  Fiat,
  CreateFiatRequest,
  CreateFiatResponse
} from './types'
import { doActionWithError } from '../../request'

export const useFiatStore = defineStore('fiats', {
  state: () => ({
    Fiats: [] as Array<Fiat>
  }),
  getters: {
    fiats () {
      return () => this.Fiats
    },
    fiat (): (name: string) => Fiat | undefined {
      return (name: string) => {
        return this.Fiats.find((el) => el.Name === name)
      }
    },
    addCurrencyTypes (): (types: Array<Fiat>) => void {
      return (types: Array<Fiat>) => {
        types.forEach((_type) => {
          const index = this.Fiats.findIndex((el) => el.ID === _type.ID)
          this.Fiats.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, _type)
        })
      }
    }
  },
  actions: {
    getFiats (req: GetFiatsRequest, done: (error: boolean, rows?: Array<Fiat>) => void) {
      doActionWithError<GetFiatsRequest, GetFiatsResponse>(
        API.GET_FIATS,
        req,
        req.Message,
        (resp: GetFiatsResponse): void => {
          this.addCurrencyTypes(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateFiat (req: UpdateFiatRequest, done: (error: boolean, row?: Fiat) => void) {
      doActionWithError<UpdateFiatRequest, UpdateFiatResponse>(
        API.UPDATE_FIAT,
        req,
        req.Message,
        (resp: UpdateFiatResponse): void => {
          this.addCurrencyTypes([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createFiat (req: CreateFiatRequest, done: (error: boolean, row?: Fiat) => void) {
      doActionWithError<CreateFiatRequest, CreateFiatResponse>(
        API.CREATE_FIAT,
        req,
        req.Message,
        (resp: CreateFiatResponse): void => {
          this.addCurrencyTypes([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

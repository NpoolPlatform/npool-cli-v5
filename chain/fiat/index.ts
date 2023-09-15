import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetFiatCurrencyTypesRequest,
  GetFiatCurrencyTypesResponse,
  UpdateFiatCurrencyTypeRequest,
  UpdateFiatCurrencyTypeResponse,
  FiatCurrencyType,
  CreateFiatCurrencyTypeRequest,
  CreateFiatCurrencyTypeResponse
} from './types'
import { doActionWithError } from '../../request'

export const useFiatCurrencyStore = defineStore('fiat-currencies', {
  state: () => ({
    FiatCurrencyTypes: [] as Array<FiatCurrencyType>
  }),
  getters: {
    fiatCurrencyType (): (name: string) => FiatCurrencyType | undefined {
      return (name: string) => {
        return this.FiatCurrencyTypes.find((el) => el.Name === name)
      }
    },
    addCurrencyTypes (): (types: Array<FiatCurrencyType>) => void {
      return (types: Array<FiatCurrencyType>) => {
        types.forEach((_type) => {
          const index = this.FiatCurrencyTypes.findIndex((el) => el.ID === _type.ID)
          this.FiatCurrencyTypes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, _type)
        })
      }
    }
  },
  actions: {
    getFiatCurrencyTypes (req: GetFiatCurrencyTypesRequest, done: (error: boolean, rows?: Array<FiatCurrencyType>) => void) {
      doActionWithError<GetFiatCurrencyTypesRequest, GetFiatCurrencyTypesResponse>(
        API.GET_FIATCURRENCYTYPES,
        req,
        req.Message,
        (resp: GetFiatCurrencyTypesResponse): void => {
          this.addCurrencyTypes(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        }
      )
    },
    updateFiatCurrencyType (req: UpdateFiatCurrencyTypeRequest, done: (error: boolean, row?: FiatCurrencyType) => void) {
      doActionWithError<UpdateFiatCurrencyTypeRequest, UpdateFiatCurrencyTypeResponse>(
        API.UPDATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: UpdateFiatCurrencyTypeResponse): void => {
          this.addCurrencyTypes([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },
    createFiatCurrencyType (req: CreateFiatCurrencyTypeRequest, done: (error: boolean, row?: FiatCurrencyType) => void) {
      doActionWithError<CreateFiatCurrencyTypeRequest, CreateFiatCurrencyTypeResponse>(
        API.CREATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: CreateFiatCurrencyTypeResponse): void => {
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

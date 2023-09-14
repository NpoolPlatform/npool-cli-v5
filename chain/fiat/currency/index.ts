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
import { doActionWithError } from '../../../request'

export const useFiatCurrencyStore = defineStore('fiat-currency', {
  state: () => ({
    FiatCurrencyTypes: [] as Array<FiatCurrencyType>
  }),
  getters: {
    getFiatCurrencyTypeByName () {
      return (name: string) => {
        return this.FiatCurrencyTypes.find((el) => el.Name === name)
      }
    }
  },
  actions: {
    getFiatCurrencyTypes (req: GetFiatCurrencyTypesRequest, done: (error: boolean, rows: Array<FiatCurrencyType>) => void) {
      doActionWithError<GetFiatCurrencyTypesRequest, GetFiatCurrencyTypesResponse>(
        API.GET_FIATCURRENCYTYPES,
        req,
        req.Message,
        (resp: GetFiatCurrencyTypesResponse): void => {
          this.FiatCurrencyTypes.push(...resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatCurrencyType>)
        }
      )
    },
    updateFiatCurrencyType (req: UpdateFiatCurrencyTypeRequest, done: (error: boolean, row: FiatCurrencyType) => void) {
      doActionWithError<UpdateFiatCurrencyTypeRequest, UpdateFiatCurrencyTypeResponse>(
        API.UPDATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: UpdateFiatCurrencyTypeResponse): void => {
          const index = this.FiatCurrencyTypes.findIndex((el) => el.ID === resp.Info.ID)
          this.FiatCurrencyTypes.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatCurrencyType)
        }
      )
    },
    createFiatCurrencyType (req: CreateFiatCurrencyTypeRequest, done: (error: boolean, row: FiatCurrencyType) => void) {
      doActionWithError<CreateFiatCurrencyTypeRequest, CreateFiatCurrencyTypeResponse>(
        API.CREATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: CreateFiatCurrencyTypeResponse): void => {
          this.FiatCurrencyTypes.push(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatCurrencyType)
        }
      )
    }
  }
})

export * from './types'
export * from './const'

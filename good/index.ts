import { defineStore } from 'pinia'
import { doActionWithError } from '../request'
import { API } from './const'
import {
  Good,
  CreateGoodRequest,
  CreateGoodResponse,
  GetGoodRequest,
  GetGoodResponse,
  GetGoodsRequest,
  GetGoodsResponse,
  UpdateGoodRequest,
  UpdateGoodResponse
} from './types'

export const useGoodStore = defineStore('goods', {
  state: () => ({
    Goods: [] as Array<Good>
  }),
  getters: {
    good (): (id: string) => Good | undefined {
      return (id: string) => {
        return this.Goods.find((el) => el.ID === id)
      }
    },
    goods () {
      return () => this.Goods
    },
    addGoods (): (devices: Array<Good>) => void {
      return (devices: Array<Good>) => {
        devices.forEach((device) => {
          const index = this.Goods.findIndex((el) => el.ID === device.ID)
          this.Goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, device)
        })
      }
    }
  },
  actions: {
    getGoods (req: GetGoodsRequest, done: (error: boolean, row?: Array<Good>) => void) {
      doActionWithError<GetGoodsRequest, GetGoodsResponse>(
        API.GET_GOODS,
        req,
        req.Message,
        (resp: GetGoodsResponse): void => {
          this.addGoods(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    getGood (req: GetGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<GetGoodRequest, GetGoodResponse>(
        API.GET_GOOD,
        req,
        req.Message,
        (resp: GetGoodResponse): void => {
          this.addGoods([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    updateGood (req: UpdateGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<UpdateGoodRequest, UpdateGoodResponse>(
        API.UPDATE_GOOD,
        req,
        req.Message,
        (resp: UpdateGoodResponse): void => {
          this.addGoods([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createGood (req: CreateGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<CreateGoodRequest, CreateGoodResponse>(
        API.CREATE_GOOD,
        req,
        req.Message,
        (resp: CreateGoodResponse): void => {
          this.addGoods([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

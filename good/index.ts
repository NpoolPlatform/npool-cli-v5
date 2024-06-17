import { defineStore } from 'pinia'
import { doActionWithError } from '../request'
import { API } from './const'
import {
  Good,
  GetGoodsRequest,
  GetGoodsResponse
} from './types'

export const useGoodStore = defineStore('goods', {
  state: () => ({
    Goods: [] as Array<Good>
  }),
  getters: {
    good (): (id: string) => Good | undefined {
      return (id: string) => {
        return this.Goods.find((el: Good) => el.EntID === id)
      }
    },
    goods () {
      return () => this.Goods
    }
  },
  actions: {
    addGoods (goods: Array<Good>) {
      goods.forEach((good) => {
        const index = this.Goods.findIndex((el: Good) => el.EntID === good.EntID)
        this.Goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
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
    }
  }
})

export * from './const'
export * from './types'

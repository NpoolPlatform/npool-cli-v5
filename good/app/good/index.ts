import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { API } from './const'
import {
  Good,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  AdminGetAppGoodsRequest,
  AdminGetAppGoodsResponse
} from './types'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppGoodStore = defineStore('app-goods', {
  state: () => ({
    AppGoods: new Map<string, Array<Good>>()
  }),
  getters: {
    good (): (appID: string | undefined, id: string) => Good | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppGoods.get(appID)?.find((el: Good) => el.EntID === id)
      }
    },
    goods (): (appID?: string) => Array<Good> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppGoods.get(appID)?.sort((a, b) => a.DisplayIndex - b.DisplayIndex) || []
      }
    },
    online (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.AppGoodOnline
      }
    },
    visible (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.Visible
      }
    },
    testOnly (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.TestOnly
      }
    }
  },
  actions: {
    addGoods (appID: string | undefined, goods: Array<Good>) {
      appID = formalizeAppID(appID)
      let _goods = this.AppGoods.get(appID) as Array<Good>
      if (!_goods) {
        _goods = []
      }
      goods.forEach((good) => {
        if (!good) return
        const index = _goods.findIndex((el) => el.EntID === good.EntID)
        _goods.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
      this.AppGoods.set(appID, _goods)
    },
    getAppGoods (req: GetAppGoodsRequest, done: (error: boolean, rows?: Array<Good>, total?: number) => void) {
      doActionWithError<GetAppGoodsRequest, GetAppGoodsResponse>(
        API.GET_APPGOODS,
        req,
        req.Message,
        (resp: GetAppGoodsResponse): void => {
          this.addGoods(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    adminGetAppGoods (req: AdminGetAppGoodsRequest, done: (error: boolean, rows?: Array<Good>, total?: number) => void) {
      doActionWithError<AdminGetAppGoodsRequest, AdminGetAppGoodsResponse>(
        API.ADMIN_GET_APPGOODS,
        req,
        req.Message,
        (resp: AdminGetAppGoodsResponse): void => {
          this.addGoods(undefined, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

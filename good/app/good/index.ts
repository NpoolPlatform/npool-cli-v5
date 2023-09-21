import { defineStore } from 'pinia'
import { doActionWithError } from '../../../request'
import { useI18n } from 'vue-i18n'
import { API, CancelMode } from './const'
import {
  Good,
  GetAppGoodRequest,
  GetAppGoodResponse,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  UpdateAppGoodRequest,
  UpdateAppGoodResponse,
  CreateAppGoodRequest,
  CreateAppGoodResponse,
  GetNAppGoodsRequest,
  GetNAppGoodsResponse,
  UpdateNAppGoodRequest,
  UpdateNAppGoodResponse
} from './types'
import { date } from 'quasar'
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppGoodStore = defineStore('app-goods', {
  state: () => ({
    AppGoods: new Map<string, Array<Good>>(),
    i18n: useI18n()
  }),
  getters: {
    good (): (appID: string | undefined, id: string) => Good | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.AppGoods.get(appID)?.find((el) => el.ID === id)
      }
    },
    goods (): (appID?: string) => Array<Good> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppGoods.get(appID) || []
      }
    },
    online (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.Online
      }
    },
    visible (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.Visible
      }
    },
    canBuy (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        if (!good) {
          return false
        }
        const now = Math.floor(Date.now() / 1000)
        if (good?.SaleEndAt === 0 || good?.SaleStartAt === 0 || now > good?.SaleEndAt) {
          return false
        }
        if (!this.spotQuantity(appID, id)) {
          return false
        }
        return good?.Online && good?.Visible
      }
    },
    priceString (): (appID: string | undefined, id: string) => string {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        return Number(good?.Price).toFixed(4)
      }
    },
    priceFloat (): (appID: string | undefined, id: string) => number {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return Number(this.priceString(appID, id))
      }
    },
    effectiveDate (): (appID: string | undefined, id: string) => string | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        if (!good) {
          return this.i18n.t('MSG_TBA')
        }
        if (good.CoinPreSale) {
          return this.i18n.t('MSG_TBA')
        }
        const now = new Date().getTime() / 1000
        if (now < good.StartAt) {
          return new Date(good.StartAt * 1000).toLocaleDateString(this.i18n.locale)
        }
        return this.i18n.t('MSG_EFFECTIVE_NEXT_DAY')
      }
    },
    purchaseLimit (): (appID: string | undefined, id: string) => number {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        const min = Math.min(good?.PurchaseLimit || 0, Number(good?.GoodSpotQuantity))
        return Math.floor(min)
      }
    },
    spotQuantity (): (appID: string | undefined, id: string) => number {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return Number(this.good(appID, id)?.GoodSpotQuantity)
      }
    },
    techniqueFeeTatio (): (appID: string | undefined, id: string) => number {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return Number(this.good(appID, id)?.TechnicalFeeRatio)
      }
    },
    goodPurchaseBtnMsg (): (appID: string | undefined, id: string) => string {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        if (!good) {
          return 'MSG_SOLD_OUT'
        }
        const now = Math.floor(Date.now() / 1000)
        if (now > good?.SaleEndAt || Number(good?.GoodSpotQuantity) <= 0) {
          return 'MSG_SOLD_OUT'
        }
        if (now < good?.SaleStartAt) {
          return 'MSG_NOT_YET_AVAILABLE'
        }

        return 'MSG_PURCHASE'
      }
    },
    startDate (): (appID: string | undefined, id: string, format?: string) => string | undefined {
      return (appID: string | undefined, id: string, format?: string) => {
        appID = formalizeAppID(appID)
        return date.formatDate(this.good(appID, id)?.StartAt as number * 1000, format || 'YYYY/MM/DD')
      }
    },
    saleEndDate (): (appID: string | undefined, id: string, format?: string) => string | undefined {
      return (appID: string | undefined, id: string, format?: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        if (!good?.SaleEndAt) {
          return '*'
        }
        return date.formatDate(good?.SaleEndAt * 1000, format || 'YYYY/MM/DD')
      }
    },
    saleEndTime (): (appID: string | undefined, id: string, format?: string) => string | undefined {
      return (appID: string | undefined, id: string, format?: string) => {
        appID = formalizeAppID(appID)
        const good = this.good(appID, id)
        if (!good?.SaleEndAt) {
          return '*'
        }
        return date.formatDate((good?.SaleEndAt + 60 * new Date().getTimezoneOffset() + 9 * 60 * 60) * 1000, format || 'HH:mm')
      }
    },
    enableSetCommission (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.EnableSetCommission
      }
    },
    cancelable (): (appID: string | undefined, id: string) => boolean | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.CancelMode !== CancelMode.UnCancellable
      }
    },
    displayNames (): (appID: string | undefined, id: string) => Array<string> {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.DisplayNames || []
      }
    },
    displayColors (): (appID: string | undefined, id: string) => Array<string> {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.good(appID, id)?.DisplayColors || []
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
        const index = _goods.findIndex((el) => el.ID === good.ID)
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
    updateAppGood (req: UpdateAppGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<UpdateAppGoodRequest, UpdateAppGoodResponse>(
        API.UPDATE_APPGOOD,
        req,
        req.Message,
        (resp: UpdateAppGoodResponse): void => {
          this.addGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppGood (req: GetAppGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<GetAppGoodRequest, GetAppGoodResponse>(
        API.GET_APPGOOD,
        req,
        req.Message,
        (resp: GetAppGoodResponse): void => {
          this.addGoods(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    getNAppGoods (req: GetNAppGoodsRequest, done: (error: boolean, rows?: Array<Good>, total?: number) => void) {
      doActionWithError<GetNAppGoodsRequest, GetNAppGoodsResponse>(
        API.GET_N_APPGOODS,
        req,
        req.Message,
        (resp: GetNAppGoodsResponse): void => {
          this.addGoods(req.TargetAppID, resp.Infos)
          done(false, resp.Infos, resp.Total)
        }, () => {
          done(true)
        })
    },
    updateNAppGood (req: UpdateNAppGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<UpdateNAppGoodRequest, UpdateNAppGoodResponse>(
        API.UPDATE_N_APPGOOD,
        req,
        req.Message,
        (resp: UpdateNAppGoodResponse): void => {
          this.addGoods(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createAppGood (req: CreateAppGoodRequest, done: (error: boolean, row?: Good) => void) {
      doActionWithError<CreateAppGoodRequest, CreateAppGoodResponse>(
        API.CREATE_APPGOOD,
        req,
        req.Message,
        (resp: CreateAppGoodResponse): void => {
          this.addGoods(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

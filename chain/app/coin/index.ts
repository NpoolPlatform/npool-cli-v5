import { defineStore } from 'pinia'
import { API } from './const'
import {
  AppCoin,
  GetAppCoinsRequest,
  GetAppCoinsResponse,
  UpdateAppCoinRequest,
  UpdateAppCoinResponse,
  CreateAppCoinRequest,
  CreateAppCoinResponse,
  DeleteAppCoinRequest,
  DeleteAppCoinResponse,
  GetNAppCoinsRequest,
  GetNAppCoinsResponse
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app'
import { NIL as NIL_UUID } from 'uuid'

export const useAppCoinStore = defineStore('app-coins', {
  state: () => ({
    AppCoins: new Map<string, Array<AppCoin>>()
  }),
  getters: {
    coin (): (appID: string | undefined, coinTypeID: string) => AppCoin | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        appID = formalizeAppID(appID)
        return this.AppCoins.get(appID)?.find((el) => el.CoinTypeID === coinTypeID)
      }
    },
    productPage (): (appID: string | undefined, coinTypeID: string) => string | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.ProductPage
      }
    },
    preSale (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.Presale
      }
    },
    forPay (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.ForPay
      }
    },
    withrawFee (): (appID: string | undefined, coinTypeID: string) => string | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.WithdrawFeeAmount
      }
    },
    paymentCoins (): (appID: string | undefined) => Array<AppCoin> | undefined {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.AppCoins.get(appID)?.filter((el) => {
          return !el.Disabled && !el.CoinDisabled && el.ForPay && el.CoinForPay && !el.Presale
        })
      }
    },
    getCurrency (): (appID: string | undefined, coinTypeID: string) => number | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return Number(this.coin(appID, coinTypeID)?.SettleValue)
      }
    },
    haveCurrency (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return !(this.getCurrency(appID, coinTypeID) === 0 || this.getCurrency(appID, coinTypeID)?.toString()?.length === 0)
      }
    },
    stableUSD (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.StableUSD
      }
    },
    disabled (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.Disabled || this.coin(appID, coinTypeID)?.CoinDisabled
      }
    },
    displayed (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.Display
      }
    },
    defaultGood (): (appID: string | undefined, coinUnit: string) => string | undefined {
      return (appID: string | undefined, coinUnit: string) => {
        appID = formalizeAppID(appID)
        const coin = this.AppCoins.get(appID)?.find((el) => el.Unit === coinUnit)
        return coin ? coin.DefaultGoodID : NIL_UUID
      }
    },
    needMemo (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.NeedMemo
      }
    },
    addCoins (): (appID: string | undefined, coins: Array<AppCoin>) => void {
      return (appID: string | undefined, coins: Array<AppCoin>) => {
        appID = formalizeAppID(appID)
        let _coins = this.AppCoins.get(appID) as Array<AppCoin>
        if (!_coins) {
          _coins = []
        }
        coins.forEach((coin) => {
          const index = _coins.findIndex((el) => el.ID === coin.ID)
          _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, coin)
        })
        this.AppCoins.set(appID, _coins)
      }
    }
  },
  actions: {
    getAppCoins (req: GetAppCoinsRequest, done: (error: boolean, appCoins?: Array<AppCoin>) => void) {
      doActionWithError<GetAppCoinsRequest, GetAppCoinsResponse>(
        API.GET_APPCOINS,
        req,
        req.Message,
        (resp: GetAppCoinsResponse): void => {
          this.addCoins(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppCoin (req: UpdateAppCoinRequest, done: (error: boolean, appCoin?: AppCoin) => void) {
      doActionWithError<UpdateAppCoinRequest, UpdateAppCoinResponse>(
        API.UPDATE_APPCOIN,
        req,
        req.Message,
        (resp: UpdateAppCoinResponse): void => {
          this.addCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    getNAppCoins (req: GetNAppCoinsRequest, done: (error: boolean, appCoins?: Array<AppCoin>) => void) {
      doActionWithError<GetNAppCoinsRequest, GetNAppCoinsResponse>(
        API.GET_APPCOINS,
        req,
        req.Message,
        (resp: GetNAppCoinsResponse): void => {
          this.addCoins(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createAppCoin (req: CreateAppCoinRequest, done: (error: boolean, appCoin?: AppCoin) => void) {
      doActionWithError<CreateAppCoinRequest, CreateAppCoinResponse>(
        API.CREATE_APPCOIN,
        req,
        req.Message,
        (resp: CreateAppCoinResponse): void => {
          this.addCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    deleteAppCoin (req: DeleteAppCoinRequest, done: (error: boolean, appCoin?: AppCoin) => void) {
      doActionWithError<DeleteAppCoinRequest, DeleteAppCoinResponse>(
        API.DELETE_APPCOIN,
        req,
        req.Message,
        (resp: DeleteAppCoinResponse): void => {
          this.addCoins(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

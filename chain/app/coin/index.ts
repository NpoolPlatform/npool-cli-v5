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
import { formalizeAppID } from '../../../appuser/app/local'

export const useAppCoinStore = defineStore('app-coins', {
  state: () => ({
    AppCoins: new Map<string, Array<AppCoin>>()
  }),
  getters: {
    coin (): (appID: string | undefined, coinTypeID: string | undefined) => AppCoin | undefined {
      return (appID: string | undefined, coinTypeID: string | undefined) => {
        if (!coinTypeID) return undefined
        appID = formalizeAppID(appID)
        return this.AppCoins.get(appID)?.find((el) => el.CoinTypeID === coinTypeID)
      }
    },
    coins (): (appID?: string) => Array<AppCoin> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppCoins.get(appID) || []
      }
    },
    payableCoins (): (appID?: string) => Array<AppCoin> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.AppCoins.get(appID)?.filter((el) => !el.Disabled && !el.CoinDisabled && el.ForPay && el.CoinForPay && !el.Presale) || []
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
    withdrawFee (): (appID: string | undefined, coinTypeID: string) => string | undefined {
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
    getCurrency (): (appID: string | undefined, coinTypeID: string) => number {
      return (appID: string | undefined, coinTypeID: string) => {
        return Number(this.coin(appID, coinTypeID)?.SettleValue)
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
    defaultGoodID (): (appID: string | undefined, coinUnit: string) => string | undefined {
      return (appID: string | undefined, coinUnit: string) => {
        appID = formalizeAppID(appID)
        const coin = this.AppCoins.get(appID)?.find((el) => el.Unit === coinUnit)
        return coin?.DefaultGoodID
      }
    },
    needMemo (): (appID: string | undefined, coinTypeID: string) => boolean | undefined {
      return (appID: string | undefined, coinTypeID: string) => {
        return this.coin(appID, coinTypeID)?.NeedMemo
      }
    },
    displayName (): (appID: string | undefined, coinTypeID: string, index: number) => string {
      return (appID: string | undefined, coinTypeID: string, index: number) => {
        const coin = this.coin(appID, coinTypeID)
        return ((coin?.DisplayNames.length && coin?.DisplayNames.length > index) ? coin?.DisplayNames[index] : coin?.Name) || ''
      }
    },
    settleTip (): (appID: string | undefined, coinTypeID: string, index: number) => string {
      return (appID: string | undefined, coinTypeID: string, index: number) => {
        const coin = this.coin(appID, coinTypeID)
        return (coin?.SettleTips.length && coin?.SettleTips.length > index) ? coin?.SettleTips[index] : ''
      }
    }
  },
  actions: {
    addCoins (appID: string | undefined, coins: Array<AppCoin>) {
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
    },
    delAppCoin (appID: string | undefined, id: string) {
      appID = formalizeAppID(appID)
      let _coins = this.AppCoins.get(appID) as Array<AppCoin>
      if (!_coins) {
        _coins = []
      }
      const index = _coins.findIndex((el) => el.ID === id)
      _coins.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
      this.AppCoins.set(appID, _coins)
    },
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
        API.GET_N_APPCOINS,
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
          this.addCoins(req.TargetAppID, [resp.Info])
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
          this.delAppCoin(req.TargetAppID, resp.Info.ID)
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'

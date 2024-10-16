import { computed } from 'vue'
import { coin, constant, notify } from '..'

const _coin = coin.useCoinStore()

const getPageCoins = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _coin.getCoins({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COINS',
        Message: 'MSG_GET_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<coin.Coin>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoins(++pageIndex, pageEnd, done)
  })
}

export const getCoins = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoins(pageStart, pages ? pageStart + pages : pages, done)
}

export const coins = computed(() => _coin.coins())

export const adminCreateCoin = (coin: coin.Coin, done?: (error: boolean, coin?: coin.Coin) => void) => {
  _coin.createCoin({
    ...coin,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COIN',
        Message: 'MSG_CREATE_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateCoin = (coin: coin.Coin, done?: (error: boolean, coin?: coin.Coin) => void) => {
  _coin.updateCoin({
    ...coin,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_COIN',
        Message: 'MSG_UPDATE_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

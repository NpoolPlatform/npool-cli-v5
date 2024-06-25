import { computed } from 'vue'
import { goodcoin, constant, notify } from '..'

const _goodCoin = goodcoin.useGoodCoinStore()

const getPageGoodCoins = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _goodCoin.getGoodCoins({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOD_COINS',
        Message: 'MSG_GET_GOOD_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<goodcoin.GoodCoin>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageGoodCoins(++pageIndex, pageEnd, done)
  })
}

export const getGoodCoins = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageGoodCoins(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodCoins = computed(() => _goodCoin.goodCoins)

export const adminCreateGoodCoin = (target: goodcoin.GoodCoin, done?: (error: boolean) => void) => {
  _goodCoin.adminCreateGoodCoin({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_GOOD_COIN',
        Message: 'MSG_CREATE_GOOD_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_GOOD_COIN',
        Message: 'MSG_CREATE_GOOD_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodCoin = (target: goodcoin.GoodCoin, done?: (error: boolean) => void) => {
  _goodCoin.adminUpdateGoodCoin({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_GOOD_COIN',
        Message: 'MSG_UPDATE_GOOD_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_GOOD_COIN',
        Message: 'MSG_UPDATE_GOOD_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodCoin = (target: goodcoin.GoodCoin, done?: (error: boolean) => void) => {
  _goodCoin.adminDeleteGoodCoin({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_GOOD_COIN',
        Message: 'MSG_DELETE_GOOD_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_GOOD_COIN',
        Message: 'MSG_DELETE_GOOD_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

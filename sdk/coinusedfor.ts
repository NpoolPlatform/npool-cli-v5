import { coinusedfor, constant, notify } from '..'

const _coinusedfor = coinusedfor.useCoinUsedForStore()

const getPageCoinUsedFors = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _coinusedfor.getCoinUsedFors({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COIN_USED_FORS',
        Message: 'MSG_GET_COIN_USED_FORS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<coinusedfor.CoinUsedFor>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoinUsedFors(++pageIndex, pageEnd, done)
  })
}

export const getCoinUsedFors = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoinUsedFors(pageStart, pages ? pageStart + pages : pages, done)
}

export const createCoinUsedFor = (target: coinusedfor.CoinUsedFor, finish: (error: boolean) => void) => {
  _coinusedfor.createCoinUsedFor({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COIN_USED_FOR',
        Message: 'MSG_CREATE_COIN_USED_FOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COIN_USED_FOR',
        Message: 'MSG_CREATE_COIN_USED_FOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteCoinUsedFor = (target: coinusedfor.CoinUsedFor, finish: (error: boolean) => void) => {
  _coinusedfor.deleteCoinUsedFor({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COIN_USED_FOR',
        Message: 'MSG_DELETE_COIN_USED_FOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COIN_USED_FOR',
        Message: 'MSG_DELETE_COIN_USED_FOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

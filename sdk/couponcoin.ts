import { couponcoin, constant, notify } from '..'

const _couponcoin = couponcoin.useCouponCoinStore()

const getPageCouponCoins = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _couponcoin.getCouponCoins({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPON_COINS',
        Message: 'MSG_GET_COUPON_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<couponcoin.CouponCoin>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCouponCoins(++pageIndex, pageEnd, done)
  })
}

export const getCouponCoins = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCouponCoins(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageAppCouponCoins = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _couponcoin.getAppCouponCoins({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPON_COINS',
        Message: 'MSG_GET_COUPON_COINS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<couponcoin.CouponCoin>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCouponCoins(++pageIndex, pageEnd, done)
  })
}

export const getAppCouponCoins = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCouponCoins(pageStart, pages ? pageStart + pages : pages, done)
}

export const createCouponCoin = (target: couponcoin.CouponCoin, finish: (error: boolean) => void) => {
  _couponcoin.createCouponCoin({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COUPON_COIN',
        Message: 'MSG_CREATE_COUPON_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COUPON_COIN',
        Message: 'MSG_CREATE_COUPON_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteCouponCoin = (target: couponcoin.CouponCoin, finish: (error: boolean) => void) => {
  _couponcoin.deleteCouponCoin({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COUPON_COIN',
        Message: 'MSG_DELETE_COUPON_COIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COUPON_COIN',
        Message: 'MSG_DELETE_COUPON_COIN_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

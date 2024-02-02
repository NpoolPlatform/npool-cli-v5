import { coupon, constant, notify } from '..'
import { AppID } from './localapp'

const _coupon = coupon.useCouponStore()

const getPageCoupons = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _coupon.getCoupons({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPONS',
        Message: 'MSG_GET_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<coupon.Coupon>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageCoupons(offset, limit, ++pageIndex, done)
  })
}

export const getCoupons = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageCoupons(offset, limit, 0, done)
}

const getPageAppCoupons = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _coupon.getAppCoupons({
    TargetAppID: AppID.value,
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPONS',
        Message: 'MSG_GET_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<coupon.Coupon>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageAppCoupons(offset, limit, ++pageIndex, done)
  })
}

export const getAppCoupons = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageAppCoupons(offset, limit, 0, done)
}

export const createCoupon = (target: coupon.Coupon, finish: (error: boolean) => void) => {
  _coupon.createCoupon({
    ...target,
    TargetAppID: AppID.value,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_COUPON',
        Message: 'MSG_CREATE_COUPON_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COUPON',
        Message: 'MSG_CREATE_COUPON_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateCoupon = (target: coupon.Coupon, finish: (error: boolean) => void) => {
  _coupon.updateCoupon({
    ...target,
    TargetAppID: target.AppID,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_COUPON',
        Message: 'MSG_UPDATE_COUPON_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_COUPON',
        Message: 'MSG_UPDATE_COUPON_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const _coupons = (couponType?: coupon.CouponType) => _coupon.coupons(undefined, couponType)

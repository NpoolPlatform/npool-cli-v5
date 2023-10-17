import { computed } from 'vue'
import { coupon, constant, notify } from '..'
import { AppID } from './localapp'

const _coupon = coupon.useCouponStore()

const getPageCoupons = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _coupon.getCoupons({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COUPONS',
        Message: 'MSG_GET_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<coupon.Coupon>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoupons(++pageIndex, pageEnd, done)
  })
}

export const getCoupons = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoupons(pageStart, pages ? pageStart + pages : pages, done)
}

const getPageAppCoupons = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _coupon.getAppCoupons({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_DEFAULT_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<coupon.Coupon>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCoupons(++pageIndex, pageEnd, done)
  })
}

export const getAppCoupons = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCoupons(pageStart, pages ? pageStart + pages : pages, done)
}

export const _coupons = computed(() => _coupon.coupons(AppID.value))

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

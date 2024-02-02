import { allocatedcoupon, constant, coupon, notify } from '..'
import { AppID } from './localapp'

const _allocatedcoupon = allocatedcoupon.useAllocatedCouponStore()

export const getPageAllocatedCoupons = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _allocatedcoupon.getCoupons({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_ALLOCATED_COUPONS',
        Message: 'MSG_GET_ALLOCATED_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<allocatedcoupon.Coupon>, totalRows?: number) => {
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
    getPageAllocatedCoupons(offset, limit, ++pageIndex, done)
  })
}

export const getAllocatedCoupons = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageAllocatedCoupons(offset, limit, 0, done)
}

export const _allocatedCoupons = (userID?: string, couponType?: coupon.CouponType) => _allocatedcoupon.coupons(AppID.value, userID, couponType)

export const createAllocatedCoupon = (target: allocatedcoupon.Coupon, finish: (error: boolean) => void) => {
  _allocatedcoupon.createCoupon({
    ...target,
    TargetUserID: target.UserID,
    UserID: undefined as unknown as string,
    Message: {
      Error: {
        Title: 'MSG_CREATE_ALLOCATED_COUPON',
        Message: 'MSG_CREATE_ALLOCATED_COUPON_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_ALLOCATED_COUPON',
        Message: 'MSG_CREATE_ALLOCATED_COUPON_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

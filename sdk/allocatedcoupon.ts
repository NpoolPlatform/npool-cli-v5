import { NIL as NIL_UUID } from 'uuid'
import { allocatedcoupon, constant, coupon, notify, utils } from '..'
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

export const _allocatedCoupons = (userID?: string, couponType?: coupon.CouponType) => _allocatedcoupon.coupons(AppID.value, userID, couponType)
export const _allocatedCoupon = (allocatedCouponID: string) => _allocatedcoupon.couponByEntID(undefined, allocatedCouponID)
export const allocatedCouponStartAt = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.StartAt
export const allocatedCouponEndAt = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.EndAt
export const allocatedCouponDate = (allocatedCouponID: string) => utils.formatTime(allocatedCouponStartAt(allocatedCouponID) as number, 'YYYY/MM/DD HH:mm') + ' ~ ' + utils.formatTime(allocatedCouponEndAt(allocatedCouponID) as number, 'YYYY/MM/DD HH:mm')
export const allocatedCouponNumber = (couponType?: coupon.CouponType) => _allocatedCoupons(undefined, couponType).length
export const usedAllocatedCouponNumber = () => _allocatedCoupons().filter((el) => el.Used).length
export const expiredAllocatedCouponNumber = () => _allocatedCoupons().filter((el) => el.Expired).length
export const allocatedCouponCashable = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.Cashable
export const allocatedCouponThreshold = (allocatedCouponID: string) => Number(_allocatedCoupon(allocatedCouponID)?.Threshold)
export const allocatedCouponUsedAtDateTime = (allocatedCouponID: string) => utils.formatTime(_allocatedCoupon(allocatedCouponID)?.UsedAt || 0, 'YYYY/MM/DD HH:mm:ss')
export const allocatedCouponUsed = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.Used
export const allocatedCouponConstraint = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.CouponConstraint
export const allocatedCouponScope = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.CouponScope
export const allocatedCouponUsedByOrderID = (allocatedCouponID: string) => _allocatedCoupon(allocatedCouponID)?.UsedByOrderID === NIL_UUID ? undefined : _allocatedCoupon(allocatedCouponID)?.UsedByOrderID
export const allocatedCouponValid = (allocatedCouponID: string) => !_allocatedCoupon(allocatedCouponID)?.Used && !_allocatedCoupon(allocatedCouponID)?.Expired

export const allocatedCouponConstraintStr = (allocatedCouponID: string) => {
  const allocatedCoupon = _allocatedCoupon(allocatedCouponID)
  if (!allocatedCoupon) {
    return 'MSG_INVALID'
  }
  switch (allocatedCoupon.CouponConstraint) {
    case coupon.CouponConstraint.Normal:
      return 'MSG_NO_CONSTRAINT'
    case coupon.CouponConstraint.PaymentThreshold:
      return 'MSG_PAYMENT_THRESHOLD'
  }
  return 'MSG_NO_CONSTRAINT'
}

export const allocatedCouponScopeStr = (allocatedCouponID: string) => {
  const allocatedCoupon = _allocatedCoupon(allocatedCouponID)
  if (!allocatedCoupon) {
    return 'MSG_INVALID'
  }
  switch (allocatedCoupon.CouponScope) {
    case coupon.CouponScope.AllGood:
      return 'MSG_ALL_GOOD'
    case coupon.CouponScope.Blacklist:
      return 'MSG_NOT_AVAILABLE_SOME_GOOD'
    case coupon.CouponScope.Whitelist:
      return 'MSG_AVAILABLE_SOME_GOOD'
  }
  return 'MSG_ALL_GOOD'
}

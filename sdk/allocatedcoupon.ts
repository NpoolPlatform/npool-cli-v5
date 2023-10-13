import { computed } from 'vue'
import { allocatedcoupon, constant, notify } from '..'
import { AppID } from './localapp'

const _allocatedcoupon = allocatedcoupon.useAllocatedCouponStore()

export const getPageAllocatedCoupons = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _allocatedcoupon.getCoupons({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_ALLOCATED_COUPONS',
        Message: 'MSG_GET_ALLOCATED_COUPONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<allocatedcoupon.Coupon>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAllocatedCoupons(++pageIndex, pageEnd, done)
  })
}

export const getAllocatedCoupons = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAllocatedCoupons(pageStart, pages ? pageStart + pages : pages, done)
}

export const _allocatedcoupons = computed(() => _allocatedcoupon.coupons(AppID.value))

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

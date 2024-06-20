import { computed } from 'vue'
import { appfee, constant, notify } from '..'
import { AppID } from './localapp'

const _appFee = appfee.useAppFeeStore()

const getPageAppFees = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appFee.getAppFees({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_FEES',
        Message: 'MSG_GET_APP_FEES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appfee.AppFee>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppFees(++pageIndex, pageEnd, done)
  })
}

export const getAppFees = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppFees(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppFees = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appFee.adminGetAppFees({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_FEES',
        Message: 'MSG_GET_APP_FEES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appfee.AppFee>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppFees(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppFees = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppFees(pageStart, pages ? pageStart + pages : pages, done)
}

export const appFees = computed(() => _appFee.goods(AppID.value))
export const appFee = (appGoodID: string) => appFees.value.find((el) => el.AppGoodID === appGoodID)
export const onlineAppFees = computed(() => appFees.value.filter((el) => el.GoodOnline && el.AppGoodOnline))
export const purchasableAppFees = computed(() => onlineAppFees.value.filter((el) => el.GoodPurchasable && el.AppGoodPurchasable))

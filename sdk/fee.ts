import { computed } from 'vue'
import { fee, constant, notify } from '..'

const _fee = fee.useFeeStore()

const getPageFees = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _fee.getFees({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_FEES',
        Message: 'MSG_GET_FEES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<fee.Fee>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageFees(++pageIndex, pageEnd, done)
  })
}

export const getFees = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageFees(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageFees = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _fee.getFees({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_FEES',
        Message: 'MSG_GET_FEES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<fee.Fee>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageFees(++pageIndex, pageEnd, done)
  })
}

export const adminGetFees = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageFees(pageStart, pages ? pageStart + pages : pages, done)
}

export const fees = computed(() => _fee.fees)
export const __fee = (goodId: string) => fees.value.find((el) => el.GoodID === goodId)

export const adminCreateFee = (target: fee.Fee, done?: (error: boolean, powerRental?: fee.Fee) => void) => {
  _fee.adminCreateFee({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_FEE',
        Message: 'MSG_CREATE_FEE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateFee = (target: fee.Fee, done?: (error: boolean, powerRental?: fee.Fee) => void) => {
  _fee.adminUpdateFee({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_FEE',
        Message: 'MSG_UPDATE_FEE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

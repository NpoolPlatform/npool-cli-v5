import { computed } from 'vue'
import { pledge, constant, notify } from '..'

const _pledge = pledge.usePledgeStore()

const getPagePledges = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _pledge.getPledges({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POWER_RENTALS',
        Message: 'MSG_GET_POWER_RENTALS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<pledge.Pledge>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPagePledges(++pageIndex, pageEnd, done)
  })
}

export const getPledges = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPagePledges(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPagePledges = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _pledge.getPledges({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POWER_RENTALS',
        Message: 'MSG_GET_POWER_RENTALS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<pledge.Pledge>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePledges(++pageIndex, pageEnd, done)
  })
}

export const adminGetPledges = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePledges(pageStart, pages ? pageStart + pages : pages, done)
}

export const pledges = computed(() => _pledge.pledges)
export const __pledge = (goodId: string) => pledges.value.find((el) => el.GoodID === goodId)

export const adminCreatePledge = (target: pledge.Pledge, done?: (error: boolean, pledge?: pledge.Pledge) => void) => {
  _pledge.adminCreatePledge({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_POWER_RENTAL',
        Message: 'MSG_CREATE_POWER_RENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdatePledge = (target: pledge.Pledge, done?: (error: boolean, pledge?: pledge.Pledge) => void) => {
  _pledge.adminUpdatePledge({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_POWER_RENTAL',
        Message: 'MSG_UPDATE_POWER_RENTAL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

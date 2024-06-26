import { computed } from 'vue'
import { powerrental, constant, notify } from '..'

const _powerRental = powerrental.usePowerRentalStore()

const getPagePowerRentals = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _powerRental.getPowerRentals({
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
  }, (error: boolean, orders?: Array<powerrental.PowerRental>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPagePowerRentals(++pageIndex, pageEnd, done)
  })
}

export const getPowerRentals = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPagePowerRentals(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPagePowerRentals = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _powerRental.getPowerRentals({
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
  }, (error: boolean, orders?: Array<powerrental.PowerRental>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePowerRentals(++pageIndex, pageEnd, done)
  })
}

export const adminGetPowerRentals = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePowerRentals(pageStart, pages ? pageStart + pages : pages, done)
}

export const powerRentals = computed(() => _powerRental.powerRentals)
export const __powerRental = (goodId: string) => powerRentals.value.find((el) => el.GoodID === goodId)

export const adminCreatePowerRental = (target: powerrental.PowerRental, done?: (error: boolean, powerRental?: powerrental.PowerRental) => void) => {
  _powerRental.adminCreatePowerRental({
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

export const adminUpdatePowerRental = (target: powerrental.PowerRental, done?: (error: boolean, powerRental?: powerrental.PowerRental) => void) => {
  _powerRental.adminUpdatePowerRental({
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

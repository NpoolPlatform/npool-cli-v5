import { computed } from 'vue'
import { delegatedstaking, constant, notify } from '..'

const _delegatedstaking = delegatedstaking.useDelegatedStakingStore()

const getPageDelegatedStakings = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _delegatedstaking.getDelegatedStakings({
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
  }, (error: boolean, orders?: Array<delegatedstaking.DelegatedStaking>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDelegatedStakings(++pageIndex, pageEnd, done)
  })
}

export const getDelegatedStakings = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDelegatedStakings(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageDelegatedStakings = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _delegatedstaking.getDelegatedStakings({
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
  }, (error: boolean, orders?: Array<delegatedstaking.DelegatedStaking>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageDelegatedStakings(++pageIndex, pageEnd, done)
  })
}

export const adminGetDelegatedStakings = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageDelegatedStakings(pageStart, pages ? pageStart + pages : pages, done)
}

export const delegatedstakings = computed(() => _delegatedstaking.delegatedStakings)
export const __delegatedstaking = (goodId: string) => delegatedstakings.value.find((el) => el.GoodID === goodId)

export const adminCreateDelegatedStaking = (target: delegatedstaking.DelegatedStaking, done?: (error: boolean, delegatedstaking?: delegatedstaking.DelegatedStaking) => void) => {
  _delegatedstaking.adminCreateDelegatedStaking({
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

export const adminUpdateDelegatedStaking = (target: delegatedstaking.DelegatedStaking, done?: (error: boolean, delegatedstaking?: delegatedstaking.DelegatedStaking) => void) => {
  _delegatedstaking.adminUpdateDelegatedStaking({
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

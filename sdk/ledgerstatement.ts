import { computed } from 'vue'
import { ledgerstatement, constant, notify } from '..'

const statement = ledgerstatement.useStatementStore()

const getPageMiningRewards = (startAt: number, endAt: number, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  statement.getMiningRewards({
    StartAt: startAt,
    EndAt: endAt,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOD_PROFITS',
        Message: 'MSG_GET_GOOD_PROFITS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<ledgerstatement.MiningReward>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageMiningRewards(startAt, endAt, ++pageIndex, pageEnd, done)
  })
}

export const getMiningRewards = (startAt: number, endAt: number, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageMiningRewards(startAt, endAt, pageStart, pages ? pageStart + pages : pages, done)
}

export const miningRewards = computed(() => statement.miningRewards(undefined, undefined, undefined))

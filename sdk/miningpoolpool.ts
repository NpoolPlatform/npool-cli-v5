import { computed } from 'vue'
import { miningpoolpool, constant, notify } from '..'

const _miningPool = miningpoolpool.useMiningpoolPoolStore()

const getPageMiningPools = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _miningPool.getPools({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POOLS',
        Message: 'MSG_GET_POOLS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<miningpoolpool.Pool>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageMiningPools(++pageIndex, pageEnd, done)
  })
}

export const getMiningPools = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageMiningPools(pageStart, pages ? pageStart + pages : pages, done)
}

export const miningPools = computed(() => _miningPool.pools)

export const adminUpdateMiningPool = (pool: miningpoolpool.Pool, done?: (error: boolean, pool?: miningpoolpool.Pool) => void) => {
  _miningPool.adminUpdatePool({
    ...pool,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_POOL',
        Message: 'MSG_UPDATE_POOL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminCreateMiningPool = (pool: miningpoolpool.Pool, done?: (error: boolean, pool?: miningpoolpool.Pool) => void) => {
  _miningPool.adminCreatePool({
    ...pool,
    Message: {
      Error: {
        Title: 'MSG_CREATE_POOL',
        Message: 'MSG_CREATE_POOL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

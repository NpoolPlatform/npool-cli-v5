import { computed } from 'vue'
import { inspirecoinconfig, constant, notify } from '..'

const _coinconfig = inspirecoinconfig.useCoinConfigStore()

const getPageCoinConfigs = (targetAppID: string, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _coinconfig.adminGetCoinConfigs({
    TargetAppID: targetAppID,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COIN_CONFIGS',
        Message: 'MSG_GET_COIN_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<inspirecoinconfig.CoinConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageCoinConfigs(targetAppID, ++pageIndex, pageEnd, done)
  })
}

export const getCoinConfigs = (targetAppID: string, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageCoinConfigs(targetAppID, pageStart, pages ? pageStart + pages : pages, done)
}

export const coinConfigs = computed(() => _coinconfig.coinConfigs())

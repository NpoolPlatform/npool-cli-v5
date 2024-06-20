import { computed } from 'vue'
import { npoolapi, constant, notify } from '..'

const _npoolApi = npoolapi.useNpoolAPIStore()

const getPageApis = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _npoolApi.getAPIs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APIS',
        Message: 'MSG_GET_APIS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<npoolapi.API>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageApis(++pageIndex, pageEnd, done)
  })
}

export const getApis = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageApis(pageStart, pages ? pageStart + pages : pages, done)
}

export const apis = computed(() => _npoolApi.apis)

export const updateApi = (api: npoolapi.API, done?: (error: boolean, api?: npoolapi.API) => void) => {
  _npoolApi.updateAPI({
    ...api,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_API',
        Message: 'MSG_UPDATE_API_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

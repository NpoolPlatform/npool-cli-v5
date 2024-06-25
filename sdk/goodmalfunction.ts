import { computed } from 'vue'
import { goodmalfunction, constant, notify } from '..'

const _goodMalfunction = goodmalfunction.useMalfunctionStore()

const getPageMalfunctions = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _goodMalfunction.getMalfunctions({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOOD_MALFUNCTIONS',
        Message: 'MSG_GET_GOOD_MALFUNCTIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<goodmalfunction.Malfunction>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageMalfunctions(++pageIndex, pageEnd, done)
  })
}

export const getMalfunctions = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageMalfunctions(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodMalfunctions = computed(() => _goodMalfunction.malfunctions)

export const adminCreateMalfunction = (target: goodmalfunction.Malfunction, done?: (error: boolean) => void) => {
  _goodMalfunction.adminCreateMalfunction({
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_GOOD_MALFUNCTION',
        Message: 'MSG_CREATE_GOOD_MALFUNCTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_GOOD_MALFUNCTION',
        Message: 'MSG_CREATE_GOOD_MALFUNCTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDpdateMalfunction = (target: goodmalfunction.Malfunction, done?: (error: boolean) => void) => {
  _goodMalfunction.adminUpdateMalfunction({
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_GOOD_MALFUNCTION',
        Message: 'MSG_UPDATE_GOOD_MALFUNCTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_GOOD_MALFUNCTION',
        Message: 'MSG_UPDATE_GOOD_MALFUNCTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteMalfunction = (target: goodmalfunction.Malfunction, done?: (error: boolean) => void) => {
  _goodMalfunction.adminDeleteMalfunction({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_GOOD_MALFUNCTION',
        Message: 'MSG_DELETE_GOOD_MALFUNCTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_GOOD_MALFUNCTION',
        Message: 'MSG_DELETE_GOOD_MALFUNCTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

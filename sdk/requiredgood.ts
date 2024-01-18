import { computed } from 'vue'
import { requiredgood, constant, notify } from '..'

const required = requiredgood.useRequiredStore()

const getPageRequiredGoods = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  required.getRequireds({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_REQUIRED_GOODS',
        Message: 'MSG_GET_REQUIRED_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<requiredgood.Required>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    getPageRequiredGoods(offset, limit, ++pageIndex, done)
  })
}

export const getRequiredGoods = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageRequiredGoods(offset, limit, 0, done)
}

export const requiredGoods = computed(() => required.requireds())

export const createRequiredGood = (target: requiredgood.Required, finish: (error: boolean) => void) => {
  required.createRequired({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_REQUIRED_GOOD',
        Message: 'MSG_CREATE_REQUIRED_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_REQUIRED_GOOD',
        Message: 'MSG_CREATE_REQUIRED_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateRequiredGood = (target: requiredgood.Required, finish: (error: boolean) => void) => {
  required.updateRequired({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_REQUIRED_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_REQUIRED_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteRequiredGood = (target: requiredgood.Required, finish: (error: boolean) => void) => {
  required.deleteRequired({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_REQUIRED_GOOD',
        Message: 'MSG_DELETE_REQUIRED_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_REQUIRED_GOOD',
        Message: 'MSG_DELETE_REQUIRED_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

import { computed } from 'vue'
import { requiredgood, constant, notify } from '..'

const required = requiredgood.useRequiredStore()

const getPageRequiredGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  required.getRequireds({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_REQUIRED_GOODS',
        Message: 'MSG_GET_REQUIRED_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<requiredgood.Required>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageRequiredGoods(++pageIndex, pageEnd, done)
  })
}

export const getRequiredGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageRequiredGoods(pageStart, pages ? pageStart + pages : pages, done)
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

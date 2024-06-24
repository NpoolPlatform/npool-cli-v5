import { computed } from 'vue'
import { requiredgood, constant, notify } from '..'

const _requiredGood = requiredgood.useRequiredStore()

const getPageRequiredGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _requiredGood.getRequireds({
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

export const getGoodRequiredGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageRequiredGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodRequiredGoods = computed(() => _requiredGood.requireds)

export const adminCreateGoodRequiredGood = (target: requiredgood.Required, done?: (error: boolean) => void) => {
  _requiredGood.adminCreateRequired({
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
  }, done)
}

export const adminUpdateGoodRequiredGood = (target: requiredgood.Required, done?: (error: boolean) => void) => {
  _requiredGood.adminUpdateRequired({
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
  }, done)
}

export const adminDeleteGoodRequiredGood = (target: requiredgood.Required, done?: (error: boolean) => void) => {
  _requiredGood.adminDeleteRequired({
    ID: target.ID,
    EntID: target.EntID,
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
  }, done)
}

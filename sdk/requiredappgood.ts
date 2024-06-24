import { computed } from 'vue'
import { requiredappgood, constant, notify } from '..'
import { AppID } from './localapp'

const _requiredAppGood = requiredappgood.useRequiredStore()

const getPageRequiredAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _requiredAppGood.getRequireds({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_REQUIRED_APP_GOODS',
        Message: 'MSG_GET_REQUIRED_APP_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<requiredappgood.Required>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageRequiredAppGoods(++pageIndex, pageEnd, done)
  })
}

export const getRequiredAppGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageRequiredAppGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageRequiredAppGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _requiredAppGood.adminGetRequireds({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_REQUIRED_APP_GOODS',
        Message: 'MSG_GET_REQUIRED_APP_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<requiredappgood.Required>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageRequiredAppGoods(++pageIndex, pageEnd, done)
  })
}

export const adminGetRequiredAppGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageRequiredAppGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const requiredAppGoods = computed(() => _requiredAppGood.requireds(AppID.value))

export const createRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.createRequired({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_REQUIRED_APP_GOOD',
        Message: 'MSG_CREATE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_REQUIRED_APP_GOOD',
        Message: 'MSG_CREATE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.adminCreateRequired({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_CREATE_REQUIRED_APP_GOOD',
        Message: 'MSG_CREATE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_REQUIRED_APP_GOOD',
        Message: 'MSG_CREATE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.updateRequired({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_REQUIRED_APP_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_REQUIRED_APP_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.adminUpdateRequired({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_REQUIRED_APP_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_REQUIRED_APP_GOOD',
        Message: 'MSG_UPDATE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.deleteRequired({
    ID: target.ID,
    EntID: target.EntID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_REQUIRED_APP_GOOD',
        Message: 'MSG_DELETE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_REQUIRED_APP_GOOD',
        Message: 'MSG_DELETE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteRequiredAppGood = (target: requiredappgood.Required, done?: (error: boolean) => void) => {
  _requiredAppGood.adminDeleteRequired({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_REQUIRED_APP_GOOD',
        Message: 'MSG_DELETE_REQUIRED_APP_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_REQUIRED_APP_GOOD',
        Message: 'MSG_DELETE_REQUIRED_APP_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

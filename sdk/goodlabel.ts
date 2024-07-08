import { computed } from 'vue'
import { appgoodlabel, constant, notify } from '..'
import { AppID } from './localapp'

const _label = appgoodlabel.useLabelStore()

const getPageLabels = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _label.getLabels({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_LABELS',
        Message: 'MSG_GET_LABELS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodlabel.Label>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageLabels(++pageIndex, pageEnd, done)
  })
}

export const getGoodLabels = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageLabels(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageLabels = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _label.adminGetLabels({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_LABELS',
        Message: 'MSG_GET_LABELS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodlabel.Label>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageLabels(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodLabels = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageLabels(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodLabels = computed(() => _label.labels(AppID.value))

export const createGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.createLabel({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_LABEL',
        Message: 'MSG_CREATE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_LABEL',
        Message: 'MSG_CREATE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.adminCreateLabel({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_LABEL',
        Message: 'MSG_CREATE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_LABEL',
        Message: 'MSG_CREATE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.updateLabel({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_LABEL',
        Message: 'MSG_UPDATE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_LABEL',
        Message: 'MSG_UPDATE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.adminUpdateLabel({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_LABEL',
        Message: 'MSG_UPDATE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_LABEL',
        Message: 'MSG_UPDATE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.deleteLabel({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_LABEL',
        Message: 'MSG_DELETE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_LABEL',
        Message: 'MSG_DELETE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodLabel = (target: appgoodlabel.Label, done?: (error: boolean) => void) => {
  _label.adminDeleteLabel({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_LABEL',
        Message: 'MSG_DELETE_LABEL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_LABEL',
        Message: 'MSG_DELETE_LABEL_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

import { computed } from 'vue'
import { topmostconstraint, constant, notify } from '..'
import { AppID } from './localapp'

const _topMostConstraint = topmostconstraint.useTopMostConstraintStore()

const getPageTopMostConstraints = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostConstraint.getTopMostConstraints({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOSTS',
        Message: 'MSG_GET_TOPMOSTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostconstraint.TopMostConstraint>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMostConstraints(++pageIndex, pageEnd, done)
  })
}

export const getTopMostConstraints = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMostConstraints(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageTopMostConstraints = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostConstraint.adminGetTopMostConstraints({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_CONSTRAINTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostconstraint.TopMostConstraint>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageTopMostConstraints(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMostConstraints = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMostConstraints(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostConstraints = computed(() => _topMostConstraint.topMostConstraints(AppID.value))

export const createTopMostConstraint = (target: topmostconstraint.TopMostConstraint, done?: (error: boolean) => void) => {
  _topMostConstraint.createTopMostConstraint({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateTopMostConstraint = (target: topmostconstraint.TopMostConstraint, done?: (error: boolean) => void) => {
  _topMostConstraint.adminCreateTopMostConstraint({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateTopMostConstraint = (target: topmostconstraint.TopMostConstraint, done?: (error: boolean) => void) => {
  _topMostConstraint.updateTopMostConstraint({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateTopMostConstraint = (target: topmostconstraint.TopMostConstraint, done?: (error: boolean) => void) => {
  _topMostConstraint.adminUpdateTopMostConstraint({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

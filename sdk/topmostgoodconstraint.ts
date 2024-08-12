import { computed } from 'vue'
import { topmostgoodconstraint, constant, notify } from '..'
import { AppID } from './localapp'

const _topMostGoodConstraint = topmostgoodconstraint.useTopMostGoodConstraintStore()

const getPageTopMostGoodConstraints = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostGoodConstraint.getTopMostGoodConstraints({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_GOOD_CONSTRAINTS',
        Message: 'MSG_GET_TOPMOST_GOOD_CONSTRAINTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgoodconstraint.TopMostGoodConstraint>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMostGoodConstraints(++pageIndex, pageEnd, done)
  })
}

export const getTopMostGoodConstraints = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMostGoodConstraints(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageTopMostGoodConstraints = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostGoodConstraint.adminGetTopMostGoodConstraints({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_GOOD_CONSTRAINTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgoodconstraint.TopMostGoodConstraint>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageTopMostGoodConstraints(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMostGoodConstraints = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMostGoodConstraints(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostGoodConstraints = computed(() => _topMostGoodConstraint.topMostGoodConstraints(AppID.value))

export const createTopMostGoodConstraint = (target: topmostgoodconstraint.TopMostGoodConstraint, done?: (error: boolean) => void) => {
  _topMostGoodConstraint.createTopMostGoodConstraint({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateTopMostGoodConstraint = (target: topmostgoodconstraint.TopMostGoodConstraint, done?: (error: boolean) => void) => {
  _topMostGoodConstraint.adminCreateTopMostGoodConstraint({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteTopMostGoodConstraint = (target: topmostgoodconstraint.TopMostGoodConstraint, done?: (error: boolean) => void) => {
  _topMostGoodConstraint.adminDeleteTopMostGoodConstraint({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_ADMIN_DELETE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_ADMIN_DELETE_TOPMOST_GOOD_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_ADMIN_DELETE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_ADMIN_DELETE_TOPMOST_GOOD_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateTopMostGoodConstraint = (target: topmostgoodconstraint.TopMostGoodConstraint, done?: (error: boolean) => void) => {
  _topMostGoodConstraint.updateTopMostGoodConstraint({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateTopMostGoodConstraint = (target: topmostgoodconstraint.TopMostGoodConstraint, done?: (error: boolean) => void) => {
  _topMostGoodConstraint.adminUpdateTopMostGoodConstraint({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

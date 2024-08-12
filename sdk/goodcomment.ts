import { computed } from 'vue'
import { appgoodcomment, constant, notify } from '..'
import { AppID } from './localapp'

const comment = appgoodcomment.useCommentStore()

const getPageComments = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  comment.getComments({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_COMMENTS',
        Message: 'MSG_GET_COMMENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodcomment.Comment>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageComments(++pageIndex, pageEnd, done)
  })
}

export const getGoodComments = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageComments(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageComments = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  comment.adminGetComments({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_COMMENTS',
        Message: 'MSG_GET_COMMENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodcomment.Comment>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageComments(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodComments = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageComments(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodComments = computed(() => comment.comments(AppID.value))

export const createGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.createComment({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_COMMENT',
        Message: 'MSG_CREATE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_COMMENT',
        Message: 'MSG_CREATE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.updateComment({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateUserGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.updateUserComment({
    ...target,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.adminUpdateComment({
    ...target,
    TargetAppID: target.AppID,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_COMMENT',
        Message: 'MSG_UPDATE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.deleteComment({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteUserGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.deleteUserComment({
    ID: target.ID,
    EntID: target.EntID,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodComment = (target: appgoodcomment.Comment, done?: (error: boolean) => void) => {
  comment.adminDeleteComment({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_COMMENT',
        Message: 'MSG_DELETE_COMMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

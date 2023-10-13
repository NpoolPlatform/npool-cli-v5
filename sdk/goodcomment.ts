import { computed } from 'vue'
import { goodcomment, constant, notify } from '..'
import { AppID } from './localapp'

const comment = goodcomment.useCommentStore()

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
  }, (error: boolean, rows?: Array<goodcomment.Comment>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageComments(++pageIndex, pageEnd, done)
  })
}

export const getComments = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageComments(pageStart, pages ? pageStart + pages : pages, done)
}

export const comments = computed(() => comment.comments(AppID.value))

export const createComment = (target: goodcomment.Comment, finish: (error: boolean) => void) => {
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateComment = (target: goodcomment.Comment, finish: (error: boolean) => void) => {
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteComment = (target: goodcomment.Comment, finish: (error: boolean) => void) => {
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteAppGoodComment = (target: goodcomment.Comment, finish: (error: boolean) => void) => {
  comment.deleteAppGoodComment({
    ID: target.ID,
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
  }, (error: boolean) => {
    finish(error)
  })
}

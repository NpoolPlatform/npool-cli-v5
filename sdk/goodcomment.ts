import { goodcomment, constant, notify } from '..'

const comment = goodcomment.useCommentStore()

const getPageComments = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  comment.getComments({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_COMMENTS',
        Message: 'MSG_GET_COMMENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<goodcomment.Comment>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageComments(offset, limit, ++pageIndex, done)
  })
}

export const getComments = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageComments(offset, limit, 0, done)
}

export const createComment = (target: goodcomment.Comment, finish?: (error: boolean) => void) => {
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
    finish?.(error)
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const goodComment = (commentID: string) => comment.comment(undefined, commentID)
export const goodComments = (goodID: string) => comment.comments(undefined, goodID)
export const goodCommentForOrder = (commentID: string) => comment.commentForOrder(undefined, commentID)
export const goodCommentsNumber = (goodID: string) => goodComments(goodID).length

export const goodCommentsUsersNumber = (goodID: string) => {
  const comments = goodComments(goodID)
  const users = new Map<string, boolean>()
  comments.forEach((el) => users.set(el.UserID, true))
  return users.size
}

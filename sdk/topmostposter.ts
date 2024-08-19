import { computed } from 'vue'
import { topmostposter, constant, notify } from '..'
import { AppID } from './localapp'

const _topMostPoster = topmostposter.usePosterStore()

const getPageTopMostPosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostPoster.getPosters({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_POSTERS',
        Message: 'MSG_GET_TOPMOST_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMostPosters(++pageIndex, pageEnd, done)
  })
}

export const getTopMostPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMostPosters(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageTopMostPosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostPoster.adminGetPosters({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageTopMostPosters(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMostPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMostPosters(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostPosters = computed(() => _topMostPoster.posters(AppID.value))

export const createTopMostPoster = (target: topmostposter.Poster, done?: (error: boolean) => void) => {
  _topMostPoster.createPoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateTopMostPoster = (target: topmostposter.Poster, done?: (error: boolean) => void) => {
  _topMostPoster.adminCreatePoster({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateTopMostPoster = (target: topmostposter.Poster, done?: (error: boolean) => void) => {
  _topMostPoster.updatePoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateTopMostPoster = (target: topmostposter.Poster, done?: (error: boolean) => void) => {
  _topMostPoster.adminUpdatePoster({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteTopMostPoster = (target: topmostposter.Poster, done?: (error: boolean) => void) => {
  _topMostPoster.adminDeletePoster({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_DELETE_TOPMOST_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_TOPMOST_POSTER_CONSTRAINT',
        Message: 'MSG_DELETE_TOPMOST_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

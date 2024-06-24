import { computed } from 'vue'
import { topmostgoodposter, constant, notify } from '..'
import { AppID } from './localapp'

const _topMostGoodPoster = topmostgoodposter.usePosterStore()

const getPageTopMostGoodPosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostGoodPoster.getPosters({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_GOOD_POSTERS',
        Message: 'MSG_GET_TOPMOST_GOOD_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgoodposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTopMostGoodPosters(++pageIndex, pageEnd, done)
  })
}

export const getTopMostGoodPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTopMostGoodPosters(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageTopMostGoodPosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _topMostGoodPoster.adminGetPosters({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TOPMOST_GOOD_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<topmostgoodposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageTopMostGoodPosters(++pageIndex, pageEnd, done)
  })
}

export const adminGetTopMostGoodPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageTopMostGoodPosters(pageStart, pages ? pageStart + pages : pages, done)
}

export const topMostGoodPosters = computed(() => _topMostGoodPoster.posters(AppID.value))

export const createTopMostGoodPoster = (target: topmostgoodposter.Poster, done?: (error: boolean) => void) => {
  _topMostGoodPoster.createPoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateTopMostGoodPoster = (target: topmostgoodposter.Poster, done?: (error: boolean) => void) => {
  _topMostGoodPoster.adminCreatePoster({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_CREATE_TOPMOST_GOOD_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateTopMostGoodPoster = (target: topmostgoodposter.Poster, done?: (error: boolean) => void) => {
  _topMostGoodPoster.updatePoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateTopMostGoodPoster = (target: topmostgoodposter.Poster, done?: (error: boolean) => void) => {
  _topMostGoodPoster.adminUpdatePoster({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT',
        Message: 'MSG_UPDATE_TOPMOST_GOOD_POSTER_CONSTRAINT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

import { computed } from 'vue'
import { appgoodposter, constant, notify } from '..'
import { AppID } from './localapp'

const poster = appgoodposter.usePosterStore()

const getPagePosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  poster.getPosters({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_POSTERS',
        Message: 'MSG_GET_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPagePosters(++pageIndex, pageEnd, done)
  })
}

export const getGoodPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPagePosters(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPagePosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  poster.adminGetPosters({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_POSTERS',
        Message: 'MSG_GET_POSTERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodposter.Poster>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPagePosters(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodPosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPagePosters(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodPosters = computed(() => poster.posters(AppID.value))

export const createGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.createPoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_POSTER',
        Message: 'MSG_CREATE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_POSTER',
        Message: 'MSG_CREATE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.adminCreatePoster({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_POSTER',
        Message: 'MSG_CREATE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_POSTER',
        Message: 'MSG_CREATE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.updatePoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_POSTER',
        Message: 'MSG_UPDATE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_POSTER',
        Message: 'MSG_UPDATE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.adminUpdatePoster({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_POSTER',
        Message: 'MSG_UPDATE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_POSTER',
        Message: 'MSG_UPDATE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.deletePoster({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_POSTER',
        Message: 'MSG_DELETE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_POSTER',
        Message: 'MSG_DELETE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodPoster = (target: appgoodposter.Poster, done?: (error: boolean) => void) => {
  poster.adminDeletePoster({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_POSTER',
        Message: 'MSG_DELETE_POSTER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_POSTER',
        Message: 'MSG_DELETE_POSTER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

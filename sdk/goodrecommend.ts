import { computed } from 'vue'
import { appgoodrecommend, constant, notify } from '..'
import { AppID } from './localapp'

const _recommend = appgoodrecommend.useRecommendStore()

const getPageGoodRecommends = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _recommend.getRecommends({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_RECOMMENDS',
        Message: 'MSG_GET_RECOMMENDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodrecommend.Recommend>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageGoodRecommends(++pageIndex, pageEnd, done)
  })
}

export const getGoodRecommends = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageGoodRecommends(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageGoodRecommends = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _recommend.adminGetRecommends({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_RECOMMENDS',
        Message: 'MSG_GET_RECOMMENDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgoodrecommend.Recommend>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageGoodRecommends(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodRecommends = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageGoodRecommends(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodRecommends = computed(() => _recommend.recommends(AppID.value))

export const createGoodRecommend = (target: appgoodrecommend.Recommend, done?: (error: boolean, recommend?: appgoodrecommend.Recommend) => void) => {
  _recommend.createRecommend({
    AppGoodID: target.AppGoodID,
    RecommendIndex: target.RecommendIndex,
    Message: target.Message,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_RECOMMEND',
        Message: 'MSG_CREATE_RECOMMEND_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_RECOMMEND',
        Message: 'MSG_CREATE_RECOMMEND_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodRecommend = (target: appgoodrecommend.Recommend, done?: (error: boolean, recommend?: appgoodrecommend.Recommend) => void) => {
  _recommend.updateRecommend({
    ...target,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateUserGoodRecommend = (target: appgoodrecommend.Recommend, done?: (error: boolean, recommend?: appgoodrecommend.Recommend) => void) => {
  _recommend.updateUserRecommend({
    ...target,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodRecommend = (target: appgoodrecommend.Recommend, done?: (error: boolean, recommend?: appgoodrecommend.Recommend) => void) => {
  _recommend.adminUpdateRecommend({
    ...target,
    TargetAppID: target.AppID,
    TargetUserID: target.UserID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_RECOMMEND',
        Message: 'MSG_UPDATE_RECOMMEND_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodRecommend = (target: appgoodrecommend.Recommend, done?: (error: boolean, recommend?: appgoodrecommend.Recommend) => void) => {
  _recommend.deleteRecommend({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_RECOMMEND',
        Message: 'MSG_DELETE_RECOMMEND_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_RECOMMEND',
        Message: 'MSG_DELETE_RECOMMEND_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

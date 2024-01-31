import { goodrecommend, constant, notify } from '..'

const recommend = goodrecommend.useRecommendStore()

const getPageRecommends = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  recommend.getRecommends({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_RECOMMENDS',
        Message: 'MSG_GET_RECOMMENDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<goodrecommend.Recommend>, totalRows?: number) => {
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
    getPageRecommends(offset, limit, ++pageIndex, done)
  })
}

export const getRecommends = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageRecommends(offset, limit, 0, done)
}

export const createRecommend = (target: goodrecommend.Recommend, finish: (error: boolean) => void) => {
  recommend.createRecommend({
    ...target,
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateRecommend = (target: goodrecommend.Recommend, finish: (error: boolean) => void) => {
  recommend.updateRecommend({
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteRecommend = (target: goodrecommend.Recommend, finish: (error: boolean) => void) => {
  recommend.deleteRecommend({
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const deleteAppGoodRecommend = (target: goodrecommend.Recommend, finish: (error: boolean) => void) => {
  recommend.deleteAppGoodRecommend({
    ID: target.ID,
    EntID: target.EntID,
    TargetUserID: target.RecommenderID,
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
  }, (error: boolean) => {
    finish(error)
  })
}

export const goodRecommend = (recommendID: string) => recommend.recommend(undefined, recommendID)
export const goodRecommends = (goodID: string) => recommend.recommends(undefined, goodID)

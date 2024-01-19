import { goodrewardhistory, constant, notify } from '..'

const _goodrewardhistory = goodrewardhistory.useRewardHistoryStore()

const getPageRewardHistories = (goodID: string | undefined, startAt: number, endAt: number, offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _goodrewardhistory.getRewardHistories({
    GoodID: goodID,
    StartAt: startAt,
    EndAt: endAt,
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_REWARD_HISTORIES',
        Message: 'MSG_GET_REWARD_HISTORIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<goodrewardhistory.RewardHistory>, totalRows?: number) => {
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
    getPageRewardHistories(goodID, startAt, endAt, offset, limit, ++pageIndex, done)
  })
}

export const getRewardHistories = (goodID: string | undefined, startAt: number, endAt: number, offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageRewardHistories(goodID, startAt, endAt, offset, limit, 0, done)
}

export const rewardHistories = (goodID?: string) => _goodrewardhistory.rewardHistories(goodID)

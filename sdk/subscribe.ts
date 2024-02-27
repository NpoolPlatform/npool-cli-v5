import { subscribe, constant, notify } from '..'

const _subscribe = subscribe.useSubscribeStore()

const getPageSubscriberes = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _subscribe.getSubscribes({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_SUBSCRIBERES',
        Message: 'MSG_GET_SUBSCRIBERES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<subscribe.Subscribe>, totalRows?: number) => {
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
    getPageSubscriberes(offset, limit, ++pageIndex, done)
  })
}

export const getSubscriberes = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageSubscriberes(offset, limit, 0, done)
}

export const createSubscribe = (emailAddress: string, done?: (error: boolean, row?: subscribe.Subscribe) => void) => {
  _subscribe.createSubscribe({
    EmailAddress: emailAddress,
    Message: {
      Error: {
        Title: 'MSG_CREATE_SUBSCRIBE',
        Message: 'MSG_CREATE_SUBSCRIBE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_SUBSCRIBE',
        Message: 'MSG_CREATE_SUBSCRIBE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Info
      }
    }
  }, done)
}

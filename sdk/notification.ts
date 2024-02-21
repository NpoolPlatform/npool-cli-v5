import { notif, constant, notify } from '..'
import { AppID } from './localapp'

const notification = notif.useNotifStore()

const getPageNotifications = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  const reqLimit = Math.min(limit - pageIndex * constant.DefaultPageSize, constant.DefaultPageSize)
  notification.getNotifs({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_NOTIFICATIONS',
        Message: 'MSG_GET_NOTIFICATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<notif.Notif>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.min(limit, totalRows as number - offset)
        limit = Math.max(limit, 0)
        limit = Math.min(limit, (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= (pageIndex + 1) * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageNotifications(offset, limit, ++pageIndex, done)
  })
}

export const getNotifications = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageNotifications(offset, limit, 0, done)
}

export const updateNotifications = (targets: notif.Notif[], finish: (error: boolean) => void) => {
  notification.updateNotifs({
    Infos: targets,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_NOTIFICATION',
        Message: 'MSG_UPDATE_NOTIFICATION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_NOTIFICATION',
        Message: 'MSG_UPDATE_NOTIFICATION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const notifications = (userID?: string) => notification.notifs(AppID.value, userID)

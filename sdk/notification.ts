import { computed } from 'vue'
import { notif, constant, notify } from '..'
import { AppID } from './localapp'

const notification = notif.useNotifStore()

const getPageNotifications = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  const reqLimit = Math.min(limit - pageIndex * constant.DefaultPageSize, constant.DefaultPageSize)
  if (reqLimit === 0) {
    done?.(false, limit)
    return
  }
  notification.getNotifs({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_ANNOUNCEMENTS',
        Message: 'MSG_GET_ANNOUNCEMENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<notif.Notif>) => {
    if (error || !rows?.length) {
      done?.(error, limit - Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize, 0))
      return
    }
    limit -= reqLimit
    getPageNotifications(offset, limit, ++pageIndex, done)
  })
}

export const getNotifications = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number) => void) => {
  getPageNotifications(offset, limit, 0, done)
}

export const notifications = computed(() => notification.notifs(AppID.value, undefined))

export const updateNotifications = (targets: notif.Notif[], finish: (error: boolean) => void) => {
  notification.updateNotifs({
    Infos: targets,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_ANNOUNCEMENT',
        Message: 'MSG_UPDATE_ANNOUNCEMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_ANNOUNCEMENT',
        Message: 'MSG_UPDATE_ANNOUNCEMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

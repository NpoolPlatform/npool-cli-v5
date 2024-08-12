import { computed } from 'vue'
import { notif, notify } from '..'
import { AppID } from './localapp'

const _notif = notif.useNotifStore()

const getPageNotifs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  if (pageEnd <= pageIndex) {
    return done?.(false, _notif.totalPages(undefined), _notif.totalRows(undefined))
  }
  if (_notif.pageLoaded(undefined, pageIndex) || _notif.pageLoading(undefined, pageIndex)) {
    _notif.setPageStart(undefined, ++pageIndex)
    getPageNotifs(pageIndex, pageEnd, done)
    return
  }
  _notif.loadingPage(undefined, pageIndex)
  _notif.getAppNotifs({
    Offset: pageIndex * _notif.pageLimit(undefined),
    Limit: _notif.pageLimit(undefined),
    Message: {
      Error: {
        Title: 'MSG_GET_NOTIFS',
        Message: 'MSG_GET_NOTIFS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, notifs?: Array<notif.Notif>, total?: number) => {
    if (error || !notifs?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / _notif.pageLimit(AppID.value))
      if (total) {
        _notif.setTotalPages(undefined, totalPages)
        _notif.setTotalRows(undefined, total || 0)
      }
      _notif.setPageStart(undefined, Math.max(--pageIndex, 0))
      done?.(error, totalPages, total as number)
      return
    }
    _notif.loadPage(undefined, pageIndex)
    _notif.setPageStart(undefined, ++pageIndex)
    getPageNotifs(pageIndex, pageEnd, done)
  })
}

export const getNotifs = (pageStart: number | undefined, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  pageStart = pageStart || _notif.pageStart(undefined)
  getPageNotifs(pageStart, pages ? pageStart + pages : pages, done)
}

export const notifications = computed(() => _notif.notifs(undefined, undefined))
export const totalNotifications = computed(() => _notif.totalRows(undefined))

export const setNotificationPageLimit = (pageLimit: number) => _notif.setPageLimit(undefined, pageLimit)

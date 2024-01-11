import { computed } from 'vue'
import { announcement, constant, notify } from '..'
import { AppID } from './localapp'

const _announcement = announcement.useAnnouncementStore()

const getPageAnnouncements = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  const reqLimit = Math.min(limit - pageIndex * constant.DefaultPageSize, constant.DefaultPageSize)
  if (reqLimit === 0) {
    done?.(false, limit)
    return
  }
  _announcement.getAnnouncements({
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
  }, (error: boolean, rows?: Array<announcement.Announcement>) => {
    if (error || !rows?.length) {
      done?.(error, limit - Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize, 0))
      return
    }
    limit -= reqLimit
    getPageAnnouncements(offset, limit, ++pageIndex, done)
  })
}

export const getAnnouncements = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number) => void) => {
  getPageAnnouncements(offset, limit, 0, done)
}

export const announcements = computed(() => _announcement.announcements(AppID.value))

export const createAnnouncement = (target: announcement.Announcement, finish: (error: boolean) => void) => {
  _announcement.createAnnouncement({
    TargetLangID: target.LangID,
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_ANNOUNCEMENT',
        Message: 'MSG_CREATE_ANNOUNCEMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_ANNOUNCEMENT',
        Message: 'MSG_CREATE_ANNOUNCEMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

export const updateAnnouncement = (target: announcement.Announcement, finish: (error: boolean) => void) => {
  _announcement.updateAnnouncement({
    ...target,
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

export const deleteAnnouncement = (target: announcement.Announcement, finish: (error: boolean) => void) => {
  _announcement.deleteAnnouncement({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_ANNOUNCEMENT',
        Message: 'MSG_DELETE_ANNOUNCEMENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_ANNOUNCEMENT',
        Message: 'MSG_DELETE_ANNOUNCEMENT_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error: boolean) => {
    finish(error)
  })
}

import { computed } from 'vue'
import { appgooddisplayname, constant, notify } from '..'
import { AppID } from './localapp'

const displayname = appgooddisplayname.useDisplayNameStore()

const getPageDisplayNames = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  displayname.getDisplayNames({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_DISPLAY_NAMES',
        Message: 'MSG_GET_DISPLAY_NAMES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddisplayname.DisplayName>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDisplayNames(++pageIndex, pageEnd, done)
  })
}

export const getGoodDisplayNames = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDisplayNames(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageDisplayNames = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  displayname.adminGetDisplayNames({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_DISPLAY_NAMES',
        Message: 'MSG_GET_DISPLAY_NAMES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddisplayname.DisplayName>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageDisplayNames(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodDisplayNames = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageDisplayNames(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodDisplayNames = computed(() => displayname.displayNames(AppID.value))

export const createGoodDisplayName = (target: appgooddisplayname.DisplayName, done?: (error: boolean) => void) => {
  displayname.createDisplayName({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DISPLAY_NAME',
        Message: 'MSG_CREATE_DISPLAY_NAME_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_DISPLAY_NAME',
        Message: 'MSG_CREATE_DISPLAY_NAME_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodDisplayName = (target: appgooddisplayname.DisplayName, done?: (error: boolean) => void) => {
  displayname.updateDisplayName({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DISPLAY_NAME',
        Message: 'MSG_UPDATE_DISPLAY_NAME_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DISPLAY_NAME',
        Message: 'MSG_UPDATE_DISPLAY_NAME_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodDisplayName = (target: appgooddisplayname.DisplayName, done?: (error: boolean) => void) => {
  displayname.adminUpdateDisplayName({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DISPLAY_NAME',
        Message: 'MSG_UPDATE_DISPLAY_NAME_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DISPLAY_NAME',
        Message: 'MSG_UPDATE_DISPLAY_NAME_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodDisplayName = (target: appgooddisplayname.DisplayName, done?: (error: boolean) => void) => {
  displayname.deleteDisplayName({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DISPLAY_NAME',
        Message: 'MSG_DELETE_DISPLAY_NAME_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DISPLAY_NAME',
        Message: 'MSG_DELETE_DISPLAY_NAME_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodDisplayName = (target: appgooddisplayname.DisplayName, done?: (error: boolean) => void) => {
  displayname.adminDeleteDisplayName({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DISPLAY_NAME',
        Message: 'MSG_DELETE_DISPLAY_NAME_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DISPLAY_NAME',
        Message: 'MSG_DELETE_DISPLAY_NAME_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

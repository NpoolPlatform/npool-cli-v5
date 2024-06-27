import { computed } from 'vue'
import { appgooddisplaycolor, constant, notify } from '..'
import { AppID } from './localapp'

const displaycolor = appgooddisplaycolor.useDisplayColorStore()

const getPageDisplayColors = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  displaycolor.getDisplayColors({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_DISPLAY_COLORS',
        Message: 'MSG_GET_DISPLAY_COLORS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddisplaycolor.DisplayColor>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDisplayColors(++pageIndex, pageEnd, done)
  })
}

export const getGoodDisplayColors = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDisplayColors(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageDisplayColors = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  displaycolor.adminGetDisplayColors({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_DISPLAY_COLORS',
        Message: 'MSG_GET_DISPLAY_COLORS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddisplaycolor.DisplayColor>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageDisplayColors(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodDisplayColors = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageDisplayColors(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodDisplayColors = computed(() => displaycolor.displayColors(AppID.value))

export const createGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.createDisplayColor({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DISPLAY_COLOR',
        Message: 'MSG_CREATE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_DISPLAY_COLOR',
        Message: 'MSG_CREATE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.adminCreateDisplayColor({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DISPLAY_COLOR',
        Message: 'MSG_CREATE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_DISPLAY_COLOR',
        Message: 'MSG_CREATE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.updateDisplayColor({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DISPLAY_COLOR',
        Message: 'MSG_UPDATE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DISPLAY_COLOR',
        Message: 'MSG_UPDATE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.adminUpdateDisplayColor({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DISPLAY_COLOR',
        Message: 'MSG_UPDATE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DISPLAY_COLOR',
        Message: 'MSG_UPDATE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.deleteDisplayColor({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DISPLAY_COLOR',
        Message: 'MSG_DELETE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DISPLAY_COLOR',
        Message: 'MSG_DELETE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodDisplayColor = (target: appgooddisplaycolor.DisplayColor, done?: (error: boolean) => void) => {
  displaycolor.adminDeleteDisplayColor({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DISPLAY_COLOR',
        Message: 'MSG_DELETE_DISPLAY_COLOR_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DISPLAY_COLOR',
        Message: 'MSG_DELETE_DISPLAY_COLOR_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

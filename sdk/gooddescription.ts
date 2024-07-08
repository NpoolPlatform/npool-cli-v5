import { computed } from 'vue'
import { appgooddescription, constant, notify } from '..'
import { AppID } from './localapp'

const description = appgooddescription.useDescriptionStore()

const getPageDescriptions = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  description.getDescriptions({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_DESCRIPTIONS',
        Message: 'MSG_GET_DESCRIPTIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddescription.Description>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDescriptions(++pageIndex, pageEnd, done)
  })
}

export const getGoodDescriptions = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDescriptions(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageDescriptions = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  description.adminGetDescriptions({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_GET_DESCRIPTIONS',
        Message: 'MSG_GET_DESCRIPTIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<appgooddescription.Description>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageDescriptions(++pageIndex, pageEnd, done)
  })
}

export const adminGetGoodDescriptions = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageDescriptions(pageStart, pages ? pageStart + pages : pages, done)
}

export const goodDescriptions = computed(() => description.descriptions(AppID.value))

export const createGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.createDescription({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DESCRIPTION',
        Message: 'MSG_CREATE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_DESCRIPTION',
        Message: 'MSG_CREATE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.adminCreateDescription({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DESCRIPTION',
        Message: 'MSG_CREATE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_DESCRIPTION',
        Message: 'MSG_CREATE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const updateGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.updateDescription({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DESCRIPTION',
        Message: 'MSG_UPDATE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DESCRIPTION',
        Message: 'MSG_UPDATE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.adminUpdateDescription({
    ...target,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DESCRIPTION',
        Message: 'MSG_UPDATE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_DESCRIPTION',
        Message: 'MSG_UPDATE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const deleteGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.deleteDescription({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DESCRIPTION',
        Message: 'MSG_DELETE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DESCRIPTION',
        Message: 'MSG_DELETE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteGoodDescription = (target: appgooddescription.Description, done?: (error: boolean) => void) => {
  description.adminDeleteDescription({
    ID: target.ID,
    EntID: target.EntID,
    TargetAppID: target.AppID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DESCRIPTION',
        Message: 'MSG_DELETE_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_DESCRIPTION',
        Message: 'MSG_DELETE_DESCRIPTION_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

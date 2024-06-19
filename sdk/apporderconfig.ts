import { computed } from 'vue'
import { apporderconfig, constant, notify } from '..'
import { AppID } from './localapp'

const _appOrderConfig = apporderconfig.useAppConfigStore()

export const getAppOrderConfig = (done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.getAppConfig({
    Message: {
      Error: {
        Title: 'MSG_GET_APP_CONFIG',
        Message: 'MSG_GET_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

const getPageAppOrderConfigs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appOrderConfig.adminGetAppConfigs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_CONFIGS',
        Message: 'MSG_GET_APP_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apporderconfig.AppConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppOrderConfigs(++pageIndex, pageEnd, done)
  })
}

export const getAppOrderConfigs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppOrderConfigs(pageStart, pages ? pageStart + pages : pages, done)
}

const adminGetPageAppOrderConfigs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appOrderConfig.adminGetAppConfigs({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apporderconfig.AppConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageAppOrderConfigs(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppConfigs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageAppOrderConfigs(pageStart, pages ? pageStart + pages : pages, done)
}

export const appOrderConfigs = computed(() => _appOrderConfig.appConfigs)
export const appOrderConfig = (appID: string | undefined) => _appOrderConfig.appConfig(appID)

export const updateAppOrderConfig = (target: apporderconfig.AppConfig, done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.updateAppConfig({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_CONFIG',
        Message: 'MSG_UPDATE_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_CONFIG',
        Message: 'MSG_UPDATE_APP_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const createAppOrderConfig = (target: apporderconfig.AppConfig, done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.createAppConfig({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_CONFIG',
        Message: 'MSG_CREATE_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_CONFIG',
        Message: 'MSG_CREATE_APP_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminUpdateAppOrderConfig = (target: apporderconfig.AppConfig, done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.adminUpdateAppConfig({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_CONFIG',
        Message: 'MSG_UPDATE_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_CONFIG',
        Message: 'MSG_UPDATE_APP_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminCreateAppOrderConfig = (target: apporderconfig.AppConfig, done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.adminCreateAppConfig({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_CONFIG',
        Message: 'MSG_CREATE_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_CONFIG',
        Message: 'MSG_CREATE_APP_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

export const adminDeleteAppOrderConfig = (target: apporderconfig.AppConfig, done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  _appOrderConfig.adminDeleteAppConfig({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_DELETE_APP_CONFIG',
        Message: 'MSG_DELETE_APP_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_APP_CONFIG',
        Message: 'MSG_DELETE_APP_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, done)
}

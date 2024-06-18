import { computed } from 'vue'
import { apporderconfig, constant, notify } from '..'
import { AppID } from './localapp'

const appOrderConfig = apporderconfig.useAppConfigStore()

export const getAppOrderConfig = (done?: (error: boolean, config?: apporderconfig.AppConfig) => void) => {
  appOrderConfig.getAppConfig({
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

const adminGetPageAppOrderConfigs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appOrderConfig.adminGetAppConfigs({
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

export const appOrderConfigs = computed(() => appOrderConfig.appConfigs(AppID.value))

export const updateAppOrderConfig = (target: apporderconfig.AppConfig) => {
  appOrderConfig.updateAppConfig({
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
  }, () => {
    // TODO
  })
}

export const createAppOrderConfig = (target: apporderconfig.AppConfig) => {
  appOrderConfig.createAppConfig({
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
  }, () => {
    // TODO
  })
}

export const adminUpdateAppOrderConfig = (target: apporderconfig.AppConfig) => {
  appOrderConfig.adminUpdateAppConfig({
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
  }, () => {
    // TODO
  })
}

export const adminCreateAppOrderConfig = (target: apporderconfig.AppConfig) => {
  appOrderConfig.adminCreateAppConfig({
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
  }, () => {
    // TODO
  })
}

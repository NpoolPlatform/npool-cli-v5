import { computed } from 'vue'
import { simulateconfig, constant, notify } from '..'
import { AppID } from './localapp'

const appsimulateconfig = simulateconfig.useSimulateConfigStore()

const getPageSimulateConfigs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appsimulateconfig.getSimulateConfigs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_SIMULATE_CONFIGS',
        Message: 'MSG_GET_SIMULATE_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<simulateconfig.SimulateConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageSimulateConfigs(++pageIndex, pageEnd, done)
  })
}

export const getSimulateConfigs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageSimulateConfigs(pageStart, pages ? pageStart + pages : pages, done)
}

const getAppPageSimulateConfigs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appsimulateconfig.getAppSimulateConfigs({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_SIMULATE_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<simulateconfig.SimulateConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getAppPageSimulateConfigs(++pageIndex, pageEnd, done)
  })
}

export const getAppSimulateConfigs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getAppPageSimulateConfigs(pageStart, pages ? pageStart + pages : pages, done)
}

export const simulateConfigs = computed(() => appsimulateconfig.simulateconfigs(AppID.value))

export const updateAppSimulateConfig = (target: simulateconfig.SimulateConfig) => {
  appsimulateconfig.updateAppSimulateConfig({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_SIMULATE_CONFIG',
        Message: 'MSG_UPDATE_APP_SIMULATE_CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_SIMULATE_CONFIG',
        Message: 'MSG_UPDATE_APP_SIMULATE_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

export const createAppSimulateConfig = (target: simulateconfig.SimulateConfig) => {
  appsimulateconfig.createAppSimulateConfig({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_SIMULATE_CONFIG',
        Message: 'MSG_CREATE_APP_SIMULATE__CONFIG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_SIMULATE_CONFIG',
        Message: 'MSG_CREATE_APP_SIMULATE_CONFIG_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

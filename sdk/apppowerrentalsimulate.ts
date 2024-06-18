import { computed } from 'vue'
import { apppowerrentalsimulate, constant, notify } from '..'
import { AppID } from './localapp'

const appPowerRentalSimulate = apppowerrentalsimulate.useSimulateStore()

const getPageAppPowerRentalSimulates = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appPowerRentalSimulate.getSimulates({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_POWERRENTAL_SIMULATES',
        Message: 'MSG_GET_APP_POWERRENTAL_SIMULATES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppowerrentalsimulate.Simulate>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppPowerRentalSimulates(++pageIndex, pageEnd, done)
  })
}

export const getAppPowerRentalSimulates = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppPowerRentalSimulates(pageStart, pages ? pageStart + pages : pages, done)
}

const gadminGetPageAppPowerRentalSimulates = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  appPowerRentalSimulate.adminGetSimulates({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_SIMULATE_APP_POWERRENTAL_SIMULATES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<apppowerrentalsimulate.Simulate>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    gadminGetPageAppPowerRentalSimulates(++pageIndex, pageEnd, done)
  })
}

export const adminGetAppPowerRentalSimulates = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  gadminGetPageAppPowerRentalSimulates(pageStart, pages ? pageStart + pages : pages, done)
}

export const appPowerRentalSimulates = computed(() => appPowerRentalSimulate.simulates(AppID.value))

export const adminUpdateAppPowerRentalSimulate = (target: apppowerrentalsimulate.Simulate) => {
  appPowerRentalSimulate.adminUpdateSimulate({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE',
        Message: 'MSG_UPDATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE',
        Message: 'MSG_UPDATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

export const adminCreateAppPowerRentalSimulate = (target: apppowerrentalsimulate.Simulate) => {
  appPowerRentalSimulate.adminCreateSimulate({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE',
        Message: 'MSG_CREATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE',
        Message: 'MSG_CREATE_APP_SIMULATE_APP_POWERRENTAL_SIMULATE_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

import { computed } from 'vue'
import { appsimulategood, constant, notify } from '..'
import { AppID } from './localapp'

const simulategood = appsimulategood.useAppSimulateGoodStore()

const getPageSimulateGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  simulategood.getAppSimulateGoods({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_GOODS',
        Message: 'MSG_GET_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appsimulategood.Simulate>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageSimulateGoods(++pageIndex, pageEnd, done)
  })
}

export const getSimulateGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageSimulateGoods(pageStart, pages ? pageStart + pages : pages, done)
}

const getNPageSimulateGoods = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  simulategood.getNAppSimulateGoods({
    TargetAppID: AppID.value,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_SIMULATE_GOODS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appsimulategood.Simulate>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getNPageSimulateGoods(++pageIndex, pageEnd, done)
  })
}

export const getNSimulateGoods = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getNPageSimulateGoods(pageStart, pages ? pageStart + pages : pages, done)
}

export const simulateGoods = computed(() => simulategood.simulates(AppID.value))

export const updateNSimulateGood = (target: appsimulategood.Simulate) => {
  simulategood.updateNAppSimulateGood({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_APP_SIMULATE_GOOD',
        Message: 'MSG_UPDATE_APP_SIMULATE_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_UPDATE_APP_SIMULATE_GOOD',
        Message: 'MSG_UPDATE_APP_SIMULATE_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

export const createNSimulateGood = (target: appsimulategood.Simulate) => {
  simulategood.createNAppSimulateGood({
    ...target,
    TargetAppID: AppID.value,
    Message: {
      Error: {
        Title: 'MSG_CREATE_APP_SIMULATE_GOOD',
        Message: 'MSG_CREATE_APP_SIMULATE_GOOD_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_APP_SIMULATE_GOOD',
        Message: 'MSG_CREATE_APP_SIMULATE_GOOD_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, () => {
    // TODO
  })
}

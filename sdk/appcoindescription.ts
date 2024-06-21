import { computed } from 'vue'
import { appcoindescription, constant, notify } from '..'
import { AppID } from './localapp'

const _appCoinDescription = appcoindescription.useCoinDescriptionStore()

const getPageAppCoinDescriptions = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _appCoinDescription.getCoinDescriptions({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_COIN_DESCRIPTIONS',
        Message: 'MSG_GET_APP_COIN_DESCRIPTIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<appcoindescription.CoinDescription>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageAppCoinDescriptions(++pageIndex, pageEnd, done)
  })
}

export const getAppCoinDescriptions = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageAppCoinDescriptions(pageStart, pages ? pageStart + pages : pages, done)
}

export const appCoinDescriptions = computed(() => _appCoinDescription.descriptions(AppID.value))

export const createAppCoinDescription = (description: appcoindescription.CoinDescription, done?: (error: boolean, description?: appcoindescription.CoinDescription) => void) => {
  _appCoinDescription.createCoinDescription({
    ...description,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_APP_COIN_DESCRIPTION',
        Message: 'MSG_CREATE_APP_COIN_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminCreateAppCoinDescription = (description: appcoindescription.CoinDescription, done?: (error: boolean, description?: appcoindescription.CoinDescription) => void) => {
  _appCoinDescription.createAppCoinDescription({
    ...description,
    TargetAppID: AppID.value,
    NotifyMessage: {
      Error: {
        Title: 'MSG_CREATE_APP_COIN_DESCRIPTION',
        Message: 'MSG_CREATE_APP_COIN_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const updateAppCoinDescription = (description: appcoindescription.CoinDescription, done?: (error: boolean, description?: appcoindescription.CoinDescription) => void) => {
  _appCoinDescription.updateCoinDescription({
    ...description,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_APP_COIN_DESCRIPTION',
        Message: 'MSG_UPDATE_APP_COIN_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateAppCoinDescription = (description: appcoindescription.CoinDescription, done?: (error: boolean, description?: appcoindescription.CoinDescription) => void) => {
  _appCoinDescription.updateAppCoinDescription({
    ...description,
    TargetAppID: AppID.value,
    NotifyMessage: {
      Error: {
        Title: 'MSG_UPDATE_APP_COIN_DESCRIPTION',
        Message: 'MSG_UPDATE_APP_COIN_DESCRIPTION_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

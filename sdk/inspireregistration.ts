import { registration, constant, notify } from '..'
import { AppID } from './localapp'

const _registration = registration.useRegistrationStore()

const getPageRegistrations = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _registration.getRegistrations({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_REGISTRATIONS',
        Message: 'MSG_GET_REGISTRATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<registration.Registration>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageRegistrations(offset, limit, ++pageIndex, done)
  })
}

export const getRegistrations = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageRegistrations(offset, limit, 0, done)
}

const getUserPageRegistrations = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _registration.getUserRegistrations({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_USER_REGISTRATIONS',
        Message: 'MSG_GET_USER_REGISTRATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<registration.Registration>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getUserPageRegistrations(offset, limit, ++pageIndex, done)
  })
}

export const getUserRegistrations = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getUserPageRegistrations(offset, limit, 0, done)
}

export const _registrations = (userID?: string) => _registration.registrations(AppID.value, userID)

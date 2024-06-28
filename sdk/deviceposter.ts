import { computed } from 'vue'
import { deviceposter, constant, notify } from '..'

const _devicePoster = deviceposter.useDevicePosterStore()

const getPageDevicePosters = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _devicePoster.getDevicePosters({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_DEVICE_MANUFACTURERS',
        Message: 'MSG_GET_DEVICE_MANUFACTURERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<deviceposter.DevicePoster>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDevicePosters(++pageIndex, pageEnd, done)
  })
}

export const getDevicePosters = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDevicePosters(pageStart, pages ? pageStart + pages : pages, done)
}

export const devicePosters = computed(() => _devicePoster.devicePosters)

export const adminCreateDevicePoster = (poster: deviceposter.DevicePoster, done?: (error: boolean, poster?: deviceposter.DevicePoster) => void) => {
  _devicePoster.adminCreateDevicePoster({
    ...poster,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DEVICE_MANUFACTURERS',
        Message: 'MSG_CREATE_DEVICE_MANUFACTURERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateDevicePoster = (poster: deviceposter.DevicePoster, done?: (error: boolean, poster?: deviceposter.DevicePoster) => void) => {
  _devicePoster.adminUpdateDevicePoster({
    ...poster,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_DEVICE_MANUFACTURERS',
        Message: 'MSG_UPDATE_DEVICE_MANUFACTURERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteDevicePoster = (poster: deviceposter.DevicePoster, done?: (error: boolean, poster?: deviceposter.DevicePoster) => void) => {
  _devicePoster.adminDeleteDevicePoster({
    ...poster,
    Message: {
      Error: {
        Title: 'MSG_DELETE_DEVICE_MANUFACTURERS',
        Message: 'MSG_DELETE_DEVICE_MANUFACTURERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

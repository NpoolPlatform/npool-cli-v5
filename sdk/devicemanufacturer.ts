import { computed } from 'vue'
import { devicemanufacturer, constant, notify } from '..'

const _deviceManufacturer = devicemanufacturer.useManufacturerStore()

const getPageDeviceManufacturers = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _deviceManufacturer.getManufacturers({
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
  }, (error: boolean, orders?: Array<devicemanufacturer.Manufacturer>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDeviceManufacturers(++pageIndex, pageEnd, done)
  })
}

export const getDeviceManufacturers = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDeviceManufacturers(pageStart, pages ? pageStart + pages : pages, done)
}

export const deviceManufactueres = computed(() => _deviceManufacturer.manufacturers)

export const adminCreateDeviceManufacturer = (manufacturer: devicemanufacturer.Manufacturer, done?: (error: boolean, manufacturer?: devicemanufacturer.Manufacturer) => void) => {
  _deviceManufacturer.adminCreateManufacturer({
    ...manufacturer,
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

export const adminUpdateDeviceManufacturer = (manufacturer: devicemanufacturer.Manufacturer, done?: (error: boolean, manufacturer?: devicemanufacturer.Manufacturer) => void) => {
  _deviceManufacturer.adminUpdateManufacturer({
    ...manufacturer,
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
